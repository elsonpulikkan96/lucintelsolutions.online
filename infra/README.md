# Infrastructure

Terraform configuration for the Lucintel Solutions AWS infrastructure.

## Resources Created
- ECR repository with lifecycle policy (auto-cleanup untagged images after 7 days)
- IAM role for App Runner ECR access
- App Runner services (prod + dev) with auto-deploy enabled

## Usage

```bash
cd infra
terraform init
terraform plan
terraform apply
```

## Import Existing Resources

Since the infra was created manually, import existing resources before running apply:

```bash
terraform import aws_ecr_repository.app lucintelsolutions
terraform import aws_iam_role.apprunner_ecr AppRunnerECRAccessRole
terraform import 'aws_apprunner_service.app["prod"]' <prod-service-arn>
terraform import 'aws_apprunner_service.app["dev"]' <dev-service-arn>
```

Service ARNs:
- Prod: `arn:aws:apprunner:ap-south-1:739275449845:service/lucintelsolutions/6f9541de957f412f87c61d22646bbbd8`
- Dev: `arn:aws:apprunner:ap-south-1:739275449845:service/lucintelsolutions-dev/18a2bbd3ad6c441598fbb877354315d0`
