# CI/CD Quick Start Guide

## 🚀 Setup Complete!

Your OpusCore project now has a complete CI/CD pipeline configured with GitHub Actions.

## What's Been Set Up

### ✅ GitHub Actions Workflows

1. **CI Pipeline** (`.github/workflows/ci.yml`)
   - Runs on every push and PR
   - Validates code quality, builds, and tests
   - 6 parallel jobs for fast feedback

2. **CD Pipeline** (`.github/workflows/cd.yml`)
   - Automated deployments to staging/production
   - Docker image building and publishing
   - Automatic rollback on failures

3. **PR Pipeline** (`.github/workflows/pr.yml`)
   - PR-specific quality checks
   - Bundle size monitoring
   - Automated PR comments

### ✅ Docker Infrastructure

- **Multi-stage Dockerfile** optimized for production
- **Health check endpoints** for monitoring
- **Security hardening** with non-root user
- **Alpine Linux** base for minimal image size

### ✅ Code Quality Tools

- **Prettier** for consistent formatting
- **ESLint** for code quality (ready to configure)
- **TypeScript** strict type checking
- **npm scripts** for all CI/CD operations

## Quick Commands

### Local Development

```bash
# Start API server
npm run dev:api

# Run tests
npm test

# Lint and format
npm run lint
npm run format

# Type check
npm run type-check

# Build all packages
npm run build
```

### Database Operations

```bash
# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

### Docker Operations

```bash
# Build Docker image
npm run docker:build

# Run containerized API
npm run docker:run

# Or use Docker directly
docker build -t opuscore-api -f apps/api/Dockerfile .
docker run -p 3000:3000 --env-file .env opuscore-api
```

### CI/CD Commands

```bash
# Run CI checks locally
npm run ci:install
npm run ci:build
npm run ci:test
npm run ci:lint
```

## How to Deploy

### Staging Deployment (Automatic)

```bash
# Just push to main
git checkout main
git merge your-feature-branch
git push origin main

# GitHub Actions will:
# 1. Run all CI checks
# 2. Build Docker image
# 3. Deploy to staging
# 4. Run smoke tests
```

### Production Deployment (Manual)

```bash
# Create and push a version tag
git tag v1.0.0
git push origin v1.0.0

# GitHub Actions will:
# 1. Build production Docker image
# 2. Wait for manual approval
# 3. Deploy to production
# 4. Create GitHub release
```

## Required GitHub Configuration

Before the workflows can run fully, set these up:

### 1. Environment Secrets

Go to: `Settings → Secrets and variables → Actions`

**For Staging:**
```
STAGING_DATABASE_URL
STAGING_JWT_SECRET
STAGING_API_URL
```

**For Production:**
```
PROD_DATABASE_URL
PROD_JWT_SECRET
PROD_API_URL
```

### 2. Environment Protection Rules

Go to: `Settings → Environments`

Create two environments:
- **staging**: No protection rules needed
- **production**:
  - ✅ Required reviewers (1+)
  - ✅ Wait timer (optional)
  - ✅ Deployment branches (only tags)

### 3. Branch Protection Rules

Go to: `Settings → Branches`

**For `main` branch:**
- ✅ Require pull request reviews (1 approver)
- ✅ Require status checks to pass
  - build
  - lint
  - test
  - database-check
- ✅ Require branches to be up to date
- ✅ Do not allow bypassing the above settings

## Workflow Triggers

### CI Pipeline Triggers
```yaml
✓ Push to: main, develop, feature/*, claude/*
✓ Pull requests to: main, develop
```

### CD Pipeline Triggers
```yaml
✓ Push to main → Deploy to staging
✓ Version tags (v*.*.*) → Deploy to production
✓ Manual workflow dispatch
```

### PR Pipeline Triggers
```yaml
✓ Pull request opened
✓ Pull request synchronized
✓ Pull request reopened
```

## Health Endpoints

Your API now has health check endpoints:

```bash
# General health
curl http://localhost:3000/health

# Readiness probe (for k8s)
curl http://localhost:3000/health/ready

# Liveness probe (for k8s)
curl http://localhost:3000/health/live
```

Response example:
```json
{
  "status": "ok",
  "timestamp": "2025-11-21T01:00:00.000Z",
  "uptime": 42.5,
  "environment": "production"
}
```

## Quality Gates

All PRs must pass:
- ✅ **Linting**: No ESLint errors
- ✅ **Formatting**: Code matches Prettier rules
- ✅ **Type Checking**: No TypeScript errors
- ✅ **Build**: All packages build successfully
- ✅ **Tests**: All tests pass
- ✅ **Database**: Prisma schema is valid
- ✅ **Security**: No critical vulnerabilities

## Monitoring CI/CD

### View Workflow Runs
1. Go to **Actions** tab in GitHub
2. Click on any workflow run to see details
3. Inspect logs for each job

### Check Deployment Status
1. Go to **Environments** in GitHub
2. View deployment history
3. See active deployments

### Monitor Build Times
Track these metrics:
- CI pipeline: Target < 5 minutes
- Build job: Target < 2 minutes
- Test job: Target < 2 minutes
- Docker build: Target < 3 minutes

## Troubleshooting

### Build Fails on CI but Works Locally

```bash
# Clean everything and try again
npm run clean
npm ci
npm run db:generate
npm run build
```

### Docker Build Fails

```bash
# Build with detailed logs
docker build --progress=plain -f apps/api/Dockerfile .

# Check .dockerignore
cat .dockerignore
```

### Tests Fail in CI

```bash
# Run tests with same environment as CI
DATABASE_URL="file:./test.db" \
JWT_SECRET="test-secret-key" \
NODE_ENV="test" \
npm test
```

### Deployment Stuck

1. Check GitHub Actions logs
2. Verify secrets are set correctly
3. Check environment protection rules
4. Manually approve if needed

## Next Steps

### Immediate Actions
1. ✅ Set up GitHub environment secrets
2. ✅ Configure branch protection rules
3. ✅ Create staging environment
4. ✅ Test deployment workflow

### Future Enhancements
- [ ] Add E2E tests
- [ ] Set up monitoring (Datadog, New Relic, etc.)
- [ ] Configure Slack/Discord notifications
- [ ] Add performance testing
- [ ] Implement canary deployments
- [ ] Set up automated dependency updates

## Getting Help

- **Documentation**: See `.github/CICD.md` for detailed guide
- **Workflow Files**: Check `.github/workflows/` directory
- **Docker**: See `apps/api/Dockerfile`
- **Scripts**: Check `package.json` scripts section

## Resources

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Docker Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)
- [NestJS Best Practices](https://docs.nestjs.com/techniques/performance)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)

---

**Status**: ✅ CI/CD Infrastructure Complete
**Last Updated**: 2025-11-21
**Ready for**: Development, Testing, and Deployment
