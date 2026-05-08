# ECR Repository
resource "aws_ecr_repository" "app" {
  name                 = var.app_name
  image_tag_mutability = "MUTABLE"
  force_delete         = true

  image_scanning_configuration {
    scan_on_push = true
  }
}

# ECR Lifecycle Policy - keep only last 5 untagged images
resource "aws_ecr_lifecycle_policy" "app" {
  repository = aws_ecr_repository.app.name
  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Remove untagged images older than 7 days"
      selection = {
        tagStatus   = "untagged"
        countType   = "sinceImagePushed"
        countUnit   = "days"
        countNumber = 7
      }
      action = { type = "expire" }
    }]
  })
}

# IAM Role for App Runner to access ECR
resource "aws_iam_role" "apprunner_ecr" {
  name = "AppRunnerECRAccessRole"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "build.apprunner.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "apprunner_ecr" {
  role       = aws_iam_role.apprunner_ecr.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSAppRunnerServicePolicyForECRAccess"
}

# App Runner Services (prod and dev)
resource "aws_apprunner_service" "app" {
  for_each     = toset(var.environments)
  service_name = each.value == "prod" ? var.app_name : "${var.app_name}-${each.value}"

  source_configuration {
    authentication_configuration {
      access_role_arn = aws_iam_role.apprunner_ecr.arn
    }
    auto_deployments_enabled = true
    image_repository {
      image_identifier      = "${aws_ecr_repository.app.repository_url}:${each.value}"
      image_repository_type = "ECR"
      image_configuration {
        port = "80"
      }
    }
  }

  instance_configuration {
    cpu    = "256"
    memory = "512"
  }

  tags = {
    Environment = each.value
    App         = var.app_name
  }
}
