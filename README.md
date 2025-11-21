# OpusCore Platform

**The Operational Operating System for BAU Intelligence, Program Orchestration, KPI/OKR Performance, and Executive Insight.**

## Overview

OpusCore is a full-scale enterprise SaaS platform that:

- Maps and maintains Business-as-Usual (BAU) processes
- Uses AI to generate complete programs in minutes
- Delivers structured workshops and impact assessments
- Tracks KPI/OKR performance automatically
- Provides executive dashboards as a single source of truth

## Architecture

OpusCore uses a modern, AI-orchestration-first architecture:

- **Frontend**: Next.js 14+ with TypeScript and TailwindCSS
- **Backend**: NestJS with modular monolith architecture
- **Database**: PostgreSQL 16 with pgvector for embeddings
- **AI**: Multi-agent orchestration with function calling
- **Infrastructure**: Kubernetes on AWS with Terraform

## Project Structure

```
opuscore/
├── apps/
│   ├── api/              # NestJS API service
│   ├── web/              # Next.js frontend
│   └── ai-orchestrator/  # AI orchestration service
├── packages/
│   ├── database/         # Prisma schema & migrations
│   ├── shared/           # Shared types and utilities
│   └── openapi/          # OpenAPI specifications
├── infra/
│   └── terraform/        # Infrastructure as Code
└── .github/
    └── workflows/        # CI/CD pipelines
```

## Quick Start

### Prerequisites

- Node.js >= 20.0.0
- PostgreSQL >= 16
- Redis >= 7
- Docker (for local development)

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Start development servers
npm run dev:api    # API on http://localhost:3000
npm run dev:web    # Web on http://localhost:3001
npm run dev:ai     # AI Orchestrator on http://localhost:3002
```

## Development

### Database

```bash
# Generate Prisma client after schema changes
npm run db:generate

# Create and apply migrations
npm run db:migrate

# Open Prisma Studio
npm run db:studio
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch
```

### Linting

```bash
# Lint all workspaces
npm run lint

# Fix linting issues
npm run lint -- --fix
```

## Modules

### Core Modules

- **BAU Navigator**: Document and version BAU processes
- **Program Builder**: AI-powered program generation
- **Workshop Engine**: Structured workshop planning and execution
- **Impact Engine**: Multi-dimensional impact assessments
- **Performance Framework**: KPI/OKR tracking and analytics

### AI Agents

- Program Designer Agent
- BAU Curator Agent
- Workshop Planner Agent
- Impact Analyst Agent
- KPI Recommender Agent
- Performance Analyst Agent
- Executive Insights Agent

## API Documentation

Interactive API documentation is available at:
- Development: http://localhost:3000/api/docs
- Production: https://api.useopuscore.com/docs

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

## License

Proprietary - All rights reserved
