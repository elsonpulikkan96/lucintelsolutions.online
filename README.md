# Lucintel Solutions

Production-grade React application deployed on AWS App Runner with CI/CD.

**Live URLs:**
- Prod: https://npmn4xpnur.ap-south-1.awsapprunner.com
- Dev: https://fwtycbhtd3.ap-south-1.awsapprunner.com

---

## Architecture

```
GitHub (main/dev) → GitHub Actions → ECR → App Runner (auto-deploy)
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 |
| Web Server | Nginx 1.27 Alpine |
| Container | Docker (multi-stage, 75 MB) |
| Registry | AWS ECR |
| Hosting | AWS App Runner |
| CI/CD | GitHub Actions |
| IaC | Terraform |

---

## Prerequisites

- Node.js 20+
- Docker Desktop
- AWS CLI configured (`aws configure`)
- GitHub CLI (`gh auth login`)
- Terraform 1.5+

---

## Local Development

```bash
# Clone the repo
git clone https://github.com/elsonpulikkan96/lucintelsolutions.online.git
cd lucintelsolutions.online

# Install dependencies
npm install

# Start dev server
npm start
# App runs at http://localhost:3000
```

---

## Docker (Local)

```bash
# Build
docker build --platform linux/amd64 -t lucintelsolutions.online:prod .

# Run
docker run -d -p 80:80 lucintelsolutions.online:prod

# Verify
curl http://localhost
```

---

## Git Workflow

### Branch Strategy

| Branch | Environment | Trigger |
|--------|-------------|---------|
| `main` | Production | Push/merge → auto-deploy |
| `dev` | Development | Push/merge → auto-deploy |

### Making Changes

```bash
# 1. Create feature branch from dev
git checkout dev
git pull
git checkout -b feature/my-feature

# 2. Make changes and commit
git add .
git commit -m "feat: description"

# 3. Push and create PR to dev
git push -u origin feature/my-feature
gh pr create --base dev --title "feat: description"

# 4. After approval + CI pass → merge to dev (deploys to dev)

# 5. Promote to prod: create PR from dev to main
gh pr create --base main --head dev --title "Release: description"

# 6. After approval + CI pass → merge to main (deploys to prod)
```

### Branch Protection Rules (main & dev)

- No direct pushes — PRs required
- 1 approval required
- CI check (`validate`) must pass
- Branch must be up-to-date before merge
- Force pushes blocked

---

## CI/CD Pipeline

### PR Validation (`pr-validate.yml`)

Runs on every PR to `main` or `dev`:
1. Checkout code
2. Install dependencies (`npm ci`)
3. Build React app (`npm run build`)
4. Verify Docker build

### Deploy (`deploy.yml`)

Runs on push to `main` or `dev`:
1. Checkout code
2. Configure AWS credentials
3. Login to ECR
4. Build Docker image (linux/amd64)
5. Push to ECR with environment tag (`prod` or `dev`)
6. App Runner auto-deploys new image

---

## Infrastructure (Terraform)

### Setup from Scratch

```bash
cd infra

# Initialize Terraform
terraform init

# Preview changes
terraform plan

# Apply infrastructure
terraform apply
```

### AWS Resources Created

| Resource | Name | Purpose |
|----------|------|---------|
| ECR Repository | `lucintelsolutions` | Container image registry |
| IAM Role | `AppRunnerECRAccessRole` | App Runner → ECR access |
| App Runner | `lucintelsolutions` | Prod hosting |
| App Runner | `lucintelsolutions-dev` | Dev hosting |

### ECR Lifecycle Policy

- Untagged images auto-deleted after 7 days
- Image scanning enabled on push

---

## Docker Image Details

### Dockerfile (Multi-stage)

**Stage 1 — Build:**
- Base: `node:20-alpine`
- Installs deps with `npm ci --ignore-scripts`
- Builds production React bundle

**Stage 2 — Serve:**
- Base: `nginx:1.27-alpine`
- Custom Nginx config with security headers
- Serves static build output on port 80

### Security Headers

| Header | Value |
|--------|-------|
| X-Frame-Options | SAMEORIGIN |
| X-Content-Type-Options | nosniff |
| X-XSS-Protection | 1; mode=block |
| Referrer-Policy | strict-origin-when-cross-origin |
| Permissions-Policy | camera=(), microphone=(), geolocation=() |

### Performance

- Gzip compression enabled
- Static assets cached for 1 year (immutable)
- Final image size: 75 MB

---

## Custom Domain (Route53 + ACM)

### 1. Register/Configure Hosted Zone

```bash
# Create hosted zone (if not already registered in Route53)
aws route53 create-hosted-zone --name lucintelsolutions.online --caller-reference $(date +%s)

# Note the hosted zone ID and update your domain's nameservers at your registrar
```

### 2. Request SSL Certificate (ACM)

```bash
# Request certificate (must be in the same region as App Runner)
aws acm request-certificate \
  --domain-name lucintelsolutions.online \
  --subject-alternative-names "*.lucintelsolutions.online" \
  --validation-method DNS \
  --region ap-south-1

# Get the CNAME validation records
aws acm describe-certificate --certificate-arn <CERT_ARN> --region ap-south-1 \
  --query "Certificate.DomainValidationOptions[*].ResourceRecord"

# Add the CNAME records to Route53 for validation
aws route53 change-resource-record-sets --hosted-zone-id <ZONE_ID> --change-batch '{
  "Changes": [{
    "Action": "CREATE",
    "ResourceRecordSet": {
      "Name": "<CNAME_NAME>",
      "Type": "CNAME",
      "TTL": 300,
      "ResourceRecords": [{"Value": "<CNAME_VALUE>"}]
    }
  }]
}'
```

### 3. Link Custom Domain to App Runner

```bash
# Associate domain with App Runner service
aws apprunner associate-custom-domain \
  --service-arn <PROD_SERVICE_ARN> \
  --domain-name lucintelsolutions.online \
  --region ap-south-1

# Get the CNAME/alias targets provided by App Runner
aws apprunner describe-custom-domains --service-arn <PROD_SERVICE_ARN> --region ap-south-1
```

### 4. Add DNS Records

Add the CNAME records provided by App Runner to your Route53 hosted zone:

```bash
aws route53 change-resource-record-sets --hosted-zone-id <ZONE_ID> --change-batch '{
  "Changes": [{
    "Action": "CREATE",
    "ResourceRecordSet": {
      "Name": "lucintelsolutions.online",
      "Type": "CNAME",
      "TTL": 300,
      "ResourceRecords": [{"Value": "<APPRUNNER_CNAME_TARGET>"}]
    }
  }]
}'
```

### 5. Verify

```bash
# Check domain status
aws apprunner describe-custom-domains --service-arn <PROD_SERVICE_ARN> --region ap-south-1

# Test
curl -I https://lucintelsolutions.online
```

---

## Useful Commands

```bash
# Check App Runner status
aws apprunner list-services --region ap-south-1

# View ECR images
aws ecr list-images --repository-name lucintelsolutions --region ap-south-1

# Clean untagged ECR images manually
aws ecr batch-delete-image --repository-name lucintelsolutions --region ap-south-1 \
  --image-ids "$(aws ecr list-images --repository-name lucintelsolutions --region ap-south-1 --filter tagStatus=UNTAGGED --query 'imageIds' --output json)"

# View GitHub Actions runs
gh run list

# Check branch protection
gh api repos/elsonpulikkan96/lucintelsolutions.online/branches/main/protection
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| App Runner deploy fails | Check image is built for `linux/amd64`, not ARM |
| `npm ci` fails in Docker | Regenerate `package-lock.json` with `npm install --package-lock-only` |
| PR checks not blocking | Branch protection requires public repo (done) |
| ECR push denied | Run `aws ecr get-login-password --region ap-south-1 \| docker login ...` |
