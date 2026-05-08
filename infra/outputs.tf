output "ecr_repository_url" {
  value = aws_ecr_repository.app.repository_url
}

output "apprunner_urls" {
  value = { for env, svc in aws_apprunner_service.app : env => svc.service_url }
}
