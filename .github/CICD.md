# CI/CD Pipeline Documentation

## Overview

OpusCore uses GitHub Actions for automated testing, building, and deployment. The CI/CD pipeline ensures code quality, runs tests, and automates deployment to staging and production environments.

## Workflows

### 1. CI Pipeline (`ci.yml`)

Runs on every push to `main`, `develop`, and feature branches.

**Jobs:**
- **Lint & Format Check**: Validates code style and formatting
- **Build**: Compiles TypeScript and builds all packages
- **Test**: Runs unit tests and coverage reports
- **Database Check**: Validates Prisma schema
- **Security**: Runs npm audit for vulnerabilities
- **Quality Gate**: Ensures all checks pass

**Triggers:**
```yaml
- Push to main, develop, feature/*, claude/* branches
- Pull requests to main, develop
```

### 2. CD Pipeline (`cd.yml`)

Handles deployments to staging and production.

**Jobs:**
- **Build & Push**: Creates Docker images and pushes to registry
- **Deploy Staging**: Deploys to staging environment (auto on main branch)
- **Deploy Production**: Deploys to production (on version tags only)
- **Rollback**: Automatic rollback on deployment failure

**Triggers:**
```yaml
- Push to main → Deploy to staging
- Version tags (v*.*.*) → Deploy to production
- Manual workflow dispatch → Deploy to specified environment
```

### 3. PR Pipeline (`pr.yml`)

Runs on pull requests to ensure quality before merging.

**Jobs:**
- **PR Quality Checks**: Lint, format, type-check, build, test
- **Bundle Size Check**: Monitors build output sizes

**Triggers:**
```yaml
- Pull request opened, synchronized, or reopened
- Only runs on non-draft PRs
```

## Environment Variables

### Required Secrets

Set these in GitHub repository settings → Secrets and variables → Actions:

#### Staging Environment
- `STAGING_DATABASE_URL`: Database connection string
- `STAGING_JWT_SECRET`: JWT signing secret
- `STAGING_API_URL`: Staging API URL

#### Production Environment
- `PROD_DATABASE_URL`: Database connection string
- `PROD_JWT_SECRET`: JWT signing secret
- `PROD_API_URL`: Production API URL

### Optional Secrets
- `SLACK_WEBHOOK`: For deployment notifications
- `DOCKER_REGISTRY_TOKEN`: If using custom registry
- `DEPLOY_KEY`: SSH key for server deployments

## Docker Build

### Multi-stage Build Process

1. **Dependencies Stage**: Installs production dependencies
2. **Builder Stage**: Compiles TypeScript and builds application
3. **Production Stage**: Creates minimal production image

```bash
# Build locally
npm run docker:build

# Run locally
npm run docker:run
```

### Image Optimization

- Non-root user (nestjs:nodejs)
- Minimal Alpine Linux base
- Multi-stage build reduces image size
- Health check endpoint included
- Build cache optimization with GitHub Actions

## NPM Scripts for CI/CD

```json
{
  "ci:install": "npm ci",
  "ci:build": "npm run db:generate && npm run build",
  "ci:test": "npm run test",
  "ci:lint": "npm run lint && npm run format:check"
}
```

## Deployment Process

### Staging Deployment (Automatic)

1. Push to `main` branch
2. CI pipeline runs and validates
3. Docker image built and pushed
4. Deployed to staging automatically
5. Smoke tests run
6. Notification sent

### Production Deployment (Manual)

1. Create and push version tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
2. CD pipeline triggered
3. Docker image built and tagged
4. Manual approval required (GitHub Environment protection)
5. Deployed to production
6. Smoke tests run
7. GitHub release created
8. Notification sent

### Manual Deployment

Use workflow dispatch to manually trigger deployment:

1. Go to Actions → CD Pipeline → Run workflow
2. Select environment (staging/production)
3. Confirm and run

## Quality Gates

All PRs must pass:
- ✅ Linting (ESLint)
- ✅ Formatting (Prettier)
- ✅ Type checking (TypeScript)
- ✅ Build (all packages)
- ✅ Tests (unit tests)
- ✅ Database schema validation
- ✅ Security audit (no high vulnerabilities)

## Branch Protection Rules

### Main Branch
- Require PR reviews (1 approver)
- Require status checks to pass
- Require branches to be up to date
- No force pushes
- No deletions

### Develop Branch
- Require status checks to pass
- Allow force pushes from maintainers
- No deletions

## Rollback Procedure

### Automatic Rollback
If deployment fails, the rollback job automatically triggers.

### Manual Rollback

#### Using Docker Tags
```bash
# List available tags
docker images opuscore-api

# Rollback to previous version
kubectl set image deployment/opuscore-api api=opuscore-api:previous-tag
```

#### Using GitHub
1. Go to Actions → CD Pipeline
2. Find last successful deployment
3. Re-run deployment workflow

## Monitoring & Notifications

### Health Checks
- Docker health check every 30s
- `/health` endpoint monitored
- Auto-restart on failure

### Notifications
Configure webhooks for:
- Deployment success/failure
- Security vulnerabilities
- Quality gate failures

### Logs
- Build logs: GitHub Actions
- Application logs: Container stdout/stderr
- Database logs: Prisma query logs (dev only)

## Troubleshooting

### Build Failures

**Prisma Client Generation Fails**
```bash
# Locally regenerate
npm run db:generate

# Check schema validity
npx prisma validate
```

**TypeScript Compilation Errors**
```bash
# Check types
npm run type-check

# Clean build
npm run clean:build && npm run build
```

### Deployment Failures

**Database Migration Issues**
```bash
# Check migration status
npx prisma migrate status

# Reset database (dev only!)
npm run db:reset
```

**Docker Build Fails**
```bash
# Build with verbose logging
docker build --progress=plain -f apps/api/Dockerfile .

# Check .dockerignore
cat .dockerignore
```

### Test Failures

**Flaky Tests**
- Re-run failed tests
- Check for race conditions
- Verify test database cleanup

**Environment Issues**
- Ensure test environment variables are set
- Check DATABASE_URL points to test database
- Verify JWT_SECRET is set

## Performance Optimization

### Caching Strategy
- npm dependencies cached (GitHub Actions)
- Docker layer caching enabled
- Prisma client generation cached

### Parallel Execution
- Lint, test, and security jobs run in parallel
- Workspaces build independently
- Test suites run concurrently

## Security Best Practices

1. **Secrets Management**
   - Never commit secrets to repository
   - Use GitHub Secrets for sensitive data
   - Rotate secrets regularly

2. **Dependency Scanning**
   - npm audit runs on every build
   - Audit threshold: moderate
   - Auto-update notifications enabled

3. **Image Security**
   - Non-root container user
   - Minimal Alpine base image
   - Regular base image updates
   - No secrets in Docker layers

4. **Access Control**
   - Required PR reviews
   - Branch protection rules
   - Environment protection rules
   - Audit logs enabled

## Continuous Improvement

### Metrics to Track
- Build time trends
- Test coverage percentage
- Deployment frequency
- Mean time to recovery (MTTR)
- Change failure rate

### Future Enhancements
- [ ] Add E2E test suite
- [ ] Implement canary deployments
- [ ] Add performance testing
- [ ] Set up monitoring dashboards
- [ ] Automated dependency updates
- [ ] Multi-region deployment
- [ ] Blue-green deployment strategy

## Support

For CI/CD issues:
1. Check workflow logs in GitHub Actions
2. Review this documentation
3. Create issue with `ci/cd` label
4. Contact DevOps team

---

**Last Updated**: 2025-11-21
**Maintained By**: OpusCore DevOps Team
