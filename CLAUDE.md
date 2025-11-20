# CLAUDE.md - OpusCore Platform Guide for AI Assistants

> **Last Updated**: 2025-11-20
> **OpusCore Version**: v2
> **OpenAPI Version**: 0.2.0

## Table of Contents

1. [Project Overview](#project-overview)
2. [Repository Structure](#repository-structure)
3. [Core Architecture](#core-architecture)
4. [Development Workflow](#development-workflow)
5. [Key Conventions](#key-conventions)
6. [Module Reference](#module-reference)
7. [API Patterns](#api-patterns)
8. [Data Model](#data-model)
9. [AI Agent Development](#ai-agent-development)
10. [Testing Strategy](#testing-strategy)
11. [Deployment](#deployment)
12. [AI Assistant Guidelines](#ai-assistant-guidelines)

---

## Project Overview

### What is OpusCore?

OpusCore is an **enterprise SaaS platform** that serves as the **Operational Operating System** for large organizations. It combines:

- **BAU (Business-as-Usual) Intelligence** - Document and maintain operational processes
- **Program Orchestration** - AI-powered program design and mobilization
- **KPI/OKR Performance Framework** - Automated performance tracking
- **Executive Dashboards** - Single source of truth for leadership
- **AI Orchestration** - Multi-agent system for automation
- **Signals & Metrics Stream** - Event-driven analytics

### Brand & Domain

- **Domain**: `useopuscore.com`
- **API Base**: `https://api.useopuscore.com/v1`

### Core Value Proposition

OpusCore enables enterprises to:

1. **Map & Document BAU Processes** - Centralized knowledge base
2. **Detect Process Gaps** - AI-powered discovery from operational data
3. **Generate Programs in Minutes** - From intake to full program structure
4. **Automate Performance Tracking** - KPIs/OKRs linked to work
5. **Provide Executive Visibility** - Real-time dashboards with AI insights

### Technology Philosophy

**AI-Orchestration-First Architecture**

- AI agents are first-class citizens in the platform
- Domain services expose tool-callable APIs
- Workflows coordinate human-AI collaboration
- Events drive metrics and insights

---

## Repository Structure

### Current State

```
/opuscorec/
├── OpusCore_Master_Build_Prompt_v2.md       # Definitive specification
├── OpusCore_Executive_Dashboard_Architecture.md  # Dashboard design
├── OpusCore_KPI_OKR_Framework.md            # Performance framework
├── OpusCore_OpenAPI_FULL.yaml               # Complete API specification
├── OpusCore_OpenAPI_UPDATED.yaml            # Incremental updates
└── CLAUDE.md                                # This file
```

### Expected Structure (Implementation Phase)

```
/opuscorec/
├── docs/                    # All documentation
│   ├── architecture/        # System design docs
│   ├── api/                 # API guides
│   └── workflows/           # Process flows
├── infra/                   # Infrastructure as Code
│   ├── terraform/           # AWS/Cloud resources
│   ├── kubernetes/          # K8s manifests
│   └── docker/              # Container definitions
├── services/                # Backend microservices
│   ├── auth/               # Identity & auth service
│   ├── bau/                # BAU process service
│   ├── programs/           # Program management
│   ├── workshops/          # Workshop service
│   ├── tasks/              # Task management
│   ├── kpi-okr/            # Performance metrics
│   ├── signals/            # Event/signal service
│   ├── dashboard/          # Dashboard aggregation
│   ├── ai-orchestrator/    # AI agents & coordination
│   ├── workflow/           # Long-running workflows
│   └── search-rag/         # Search & RAG service
├── frontend/                # Client applications
│   ├── web/                # Main React/Next.js app
│   ├── components/         # Shared UI components
│   └── mobile/             # Future mobile apps
├── shared/                  # Shared libraries
│   ├── types/              # TypeScript types
│   ├── utils/              # Common utilities
│   └── constants/          # Shared constants
└── scripts/                 # Build & deployment scripts
```

---

## Core Architecture

### Architectural Layers

```
┌─────────────────────────────────────────┐
│         Client Layer (React/Next)       │
│  - BAU Explorer  - Program Builder      │
│  - Workshops     - KPI/OKR Dashboard    │
│  - Executive Dashboard                  │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      API Gateway & BFF Layer            │
│  - Authentication (JWT/OIDC)            │
│  - Request aggregation                  │
│  - Response tailoring                   │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Domain Services Layer           │
│  ┌──────────┐  ┌──────────┐            │
│  │   BAU    │  │ Programs │            │
│  └──────────┘  └──────────┘            │
│  ┌──────────┐  ┌──────────┐            │
│  │ Workshop │  │   Tasks  │            │
│  └──────────┘  └──────────┘            │
│  ┌──────────┐  ┌──────────┐            │
│  │ KPI/OKR  │  │ Signals  │            │
│  └──────────┘  └──────────┘            │
└─────────────────────────────────────────┘
         ↓                ↓
┌─────────────────┐  ┌──────────────────┐
│ AI Orchestrator │  │ Workflow Engine  │
│  - Agents       │  │  - State mgmt    │
│  - Tool calling │  │  - Approvals     │
│  - Prompts      │  │  - Triggers      │
└─────────────────┘  └──────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│            Data Layer                   │
│  - PostgreSQL (primary DB)              │
│  - Redis (cache)                        │
│  - Vector Store (embeddings)            │
│  - S3 (artifacts)                       │
│  - Graph DB (relationships) - optional  │
└─────────────────────────────────────────┘
```

### Key Architectural Principles

1. **Service Independence**: Each domain service owns its data and logic
2. **Event-Driven**: All significant actions emit signals/events
3. **AI-First**: AI agents interact via typed tool APIs
4. **Eventual Consistency**: Embrace async patterns for metrics aggregation
5. **Versioning**: All entities support versioning (BAU, Programs, etc.)

---

## Development Workflow

### Getting Started (Implementation Phase)

1. **Read the Specification**
   - Start with `OpusCore_Master_Build_Prompt_v2.md`
   - Review `OpusCore_OpenAPI_FULL.yaml` for API contracts

2. **Understand the Domain**
   - Review `OpusCore_KPI_OKR_Framework.md`
   - Review `OpusCore_Executive_Dashboard_Architecture.md`

3. **Plan Your Work**
   - Break down into services/modules
   - Start with foundational services (Auth, BAU, Programs)
   - Build AI orchestration layer iteratively

### Implementation Phases

#### Phase 1: Foundation (MVP)
- [ ] Infrastructure setup (Terraform, K8s)
- [ ] Auth/Identity service
- [ ] PostgreSQL schema & migrations
- [ ] API Gateway skeleton
- [ ] Basic frontend scaffold

#### Phase 2: Core Modules
- [ ] BAU Service (CRUD, versioning, search)
- [ ] Program Service (CRUD, status management)
- [ ] Task Service (CRUD, assignments)
- [ ] Signals Service (event ingestion)
- [ ] Basic frontend views

#### Phase 3: AI & Automation
- [ ] AI Orchestrator service
- [ ] Program Designer Agent
- [ ] BAU Curator Agent
- [ ] Workflow Engine (CreateProgram, CurateBAU)
- [ ] RAG/Search integration

#### Phase 4: Performance & Insights
- [ ] KPI/OKR Service
- [ ] Metrics Events processing
- [ ] Dashboard Service
- [ ] Executive Dashboard frontend
- [ ] Performance Analyst Agent
- [ ] Executive Insights Agent

#### Phase 5: Advanced Features
- [ ] Workshop Service
- [ ] Impact Engine
- [ ] Advanced workflows
- [ ] Graph relationships
- [ ] Real-time updates (WebSocket)

---

## Key Conventions

### Code Standards

#### Backend (Node.js/TypeScript recommended)

```typescript
// Service structure pattern
export class BAUService {
  constructor(
    private db: Database,
    private eventEmitter: EventEmitter,
    private logger: Logger
  ) {}

  async create(data: BAUProcessCreate): Promise<BAUProcess> {
    const process = await this.db.bauProcesses.create(data);

    // Emit signal
    await this.eventEmitter.emit('bau.process.created', {
      id: process.id,
      teamId: process.teamId,
      timestamp: new Date()
    });

    return process;
  }
}
```

#### API Responses

```typescript
// Success response
{
  "data": { /* entity or array */ },
  "meta": {
    "timestamp": "2025-11-20T10:00:00Z",
    "requestId": "req_123"
  }
}

// Error response
{
  "error": {
    "code": "BAU_NOT_FOUND",
    "message": "BAU process with id 'bau_123' not found",
    "details": {}
  },
  "meta": {
    "timestamp": "2025-11-20T10:00:00Z",
    "requestId": "req_123"
  }
}
```

#### Database Conventions

- **Table Names**: `snake_case` (e.g., `bau_processes`, `key_results`)
- **Primary Keys**: `id` (UUID or ULID recommended)
- **Timestamps**: Always include `created_at`, `updated_at`
- **Soft Deletes**: Use `deleted_at` for soft deletion
- **Versioning**: Include `version` integer field where needed

#### Event Naming

Format: `<domain>.<entity>.<action>`

Examples:
- `bau.process.created`
- `bau.process.updated`
- `program.created`
- `workshop.completed`
- `task.done`
- `kpi.progress`
- `okr.updated`

### Frontend Conventions

#### Component Structure

```typescript
// components/bau/BAUProcessList.tsx
import React from 'react';
import { useBAUProcesses } from '@/hooks/useBAUProcesses';

export const BAUProcessList: React.FC = () => {
  const { processes, loading, error } = useBAUProcesses();

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="bau-process-list">
      {processes.map(p => (
        <BAUProcessCard key={p.id} process={p} />
      ))}
    </div>
  );
};
```

#### Routing Structure

```
/                          → Landing/Dashboard
/bau                       → BAU Explorer
/bau/:id                   → BAU Detail
/bau/:id/versions          → BAU Version History
/programs                  → Program Portfolio
/programs/new              → Program Intake Form
/programs/:id              → Program Detail
/programs/:id/workshops    → Program Workshops
/workshops                 → Workshop Catalogue
/kpis                      → KPI Dashboard
/okrs                      → OKR Dashboard
/dashboard/executive       → Executive Command Center
/settings                  → User/Org Settings
```

---

## Module Reference

### 2.1 BAU Navigator

**Purpose**: Manage Business-as-Usual process documentation

**Key Features**:
- CRUD operations with versioning
- Rich metadata (tags, teams, systems)
- AI-assisted drafting
- Missing BAU detection
- Semantic search (RAG)

**API Endpoints**:
- `GET /bau/processes` - List processes
- `POST /bau/processes` - Create process
- `GET /bau/processes/:id` - Get process
- `PATCH /bau/processes/:id` - Update process
- `GET /bau/processes/:id/versions` - Get versions

**Database Schema**:
```sql
CREATE TABLE bau_processes (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES users(id),
  team_id UUID REFERENCES teams(id),
  system_ids UUID[],
  status VARCHAR(20) CHECK (status IN ('draft', 'active', 'archived')),
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 2.2 Program Builder

**Purpose**: AI-powered program design and management

**Key Features**:
- Program intake form
- AI Program Designer Agent
- Workstream generation
- Workshop suggestions
- OKR/KPI creation

**API Endpoints**:
- `GET /programs` - List programs
- `POST /programs` - Create program
- `GET /programs/:id` - Get program
- `PATCH /programs/:id` - Update program
- `POST /ai/generate-program` - AI program generation

**Workflows**:
- `CreateProgramWorkflow` - Orchestrates program creation

### 2.3 KPI/OKR Service

**Purpose**: Performance framework management

**Key Concepts**:
- **KPI**: Single metric with target/current values
- **OKR**: Objective + multiple Key Results
- **Scope**: user | team | workstream | program | org
- **Status**: on_track | at_risk | off_track

**API Endpoints**:
- `GET /kpis` - List KPIs
- `POST /kpis` - Create KPI
- `GET /okrs` - List OKRs
- `POST /okrs` - Create OKR
- `POST /metrics/events` - Submit metric events

**Integration Points**:
- Task completion → MetricEvent
- Workshop completion → MetricEvent
- BAU updates → Coverage KPIs
- Dashboard aggregations

### 2.4 Executive Dashboard

**Purpose**: Single source of truth for executives

**Key Widgets**:
1. Program Health Summary (RAG status)
2. Mobilization Velocity (time metrics)
3. BAU Coverage (% documented)
4. KPI/OKR Performance (on-track %)
5. Risk & Issue Heatmap
6. Readiness Score (composite metric)

**API Endpoints**:
- `GET /dashboards/executive` - Get dashboard data

**Data Flow**:
```
Events → Signals Service → Dashboard Service → Aggregations → Frontend
                                ↓
                          AI Insights Agent → Narrative summaries
```

### 2.5 Signals & Metrics

**Purpose**: Event-driven analytics foundation

**Models**:

```typescript
// Signal - Any platform activity
interface Signal {
  id: string;
  type: string;              // e.g., 'bau.process.created'
  source: string;            // Service name
  payload: object;           // Event-specific data
  createdAt: Date;
}

// MetricEvent - KPI/OKR progress events
interface MetricEvent {
  eventType: string;         // e.g., 'task.completed'
  sourceId: string;          // Related entity ID
  ownerId: string;           // User ID
  teamId?: string;
  value?: number;            // Metric value
  metadata: object;
  createdAt: Date;
}
```

---

## API Patterns

### Authentication

All endpoints (except `/auth/login`) require JWT bearer token:

```
Authorization: Bearer <jwt_token>
```

### Pagination

```
GET /programs?page=1&limit=20&sort=-createdAt
```

Response:
```json
{
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

### Filtering

```
GET /bau/processes?teamId=team_123&status=active&q=onboarding
```

### Versioning

API versioning in URL: `/v1/...`

Entity versioning: Increment `version` field on updates

### Error Handling

Use appropriate HTTP status codes:

- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Missing/invalid auth
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Data Model

### Core Entities

#### Users & Teams
```
User (id, name, email, role, teamId)
Team (id, name, department, parentTeamId)
```

#### BAU & Programs
```
BAU_Process (id, name, description, ownerId, teamId, systemIds[], status, version)
Program (id, name, sponsorId, managerId, scope, status)
Workstream (id, programId, name, leadId)
Workshop (id, programId, type, scheduledFor, status)
Task (id, type, status, assignedTo, programId, bauProcessId, dueDate)
```

#### Performance
```
KPI (id, name, ownerId, teamId, scope, targetValue, currentValue, unit, period, status)
OKR (id, ownerId, teamId, scope, period, objective, status)
KeyResult (id, okrId, description, targetValue, currentValue, unit, status)
```

#### Events
```
Signal (id, type, source, payloadJSON, createdAt)
MetricEvent (id, eventType, sourceId, ownerId, teamId, value, metadataJSON, createdAt)
```

### Relationships

```
User ──< BAU_Process (owner)
User ──< Program (sponsor, manager)
Team ──< BAU_Process
Team ──< User (members)
Program ──< Workstream
Program ──< Workshop
Program ──< Task
BAU_Process ──< Task
KPI ──── User (owner)
KPI ──── Team
OKR ──── User (owner)
OKR ──< KeyResult
```

---

## AI Agent Development

### Agent Architecture

Each AI agent follows this pattern:

```typescript
interface AIAgent {
  name: string;
  description: string;
  tools: Tool[];

  execute(input: AgentInput): Promise<AgentOutput>;
}

interface Tool {
  name: string;
  description: string;
  parameters: Schema;
  handler: (params: any) => Promise<any>;
}
```

### Example: Program Designer Agent

```typescript
class ProgramDesignerAgent implements AIAgent {
  name = 'program-designer';
  description = 'Generates program structure from intake';

  tools = [
    {
      name: 'searchBAU',
      description: 'Search BAU processes',
      parameters: { /* schema */ },
      handler: async (params) => {
        return await bauService.search(params.query);
      }
    },
    {
      name: 'createProgram',
      description: 'Create a program',
      parameters: { /* schema */ },
      handler: async (params) => {
        return await programService.create(params);
      }
    }
  ];

  async execute(input: ProgramIntake): Promise<ProgramDraft> {
    const prompt = this.buildPrompt(input);
    const response = await llm.chat({
      messages: [{ role: 'user', content: prompt }],
      tools: this.tools,
      model: 'gpt-4'
    });

    return this.parseResponse(response);
  }
}
```

### AI Agents Reference

| Agent | Purpose | Tools | Output |
|-------|---------|-------|--------|
| Program Designer | Generate program from intake | searchBAU, createProgram, createWorkstreams | Program draft with workstreams, workshops, OKRs |
| BAU Curator | Draft BAU from operational data | searchBAU, draftBAU | Draft BAU process with confidence score |
| Workshop Planner | Suggest workshops for program | listWorkshopTemplates, createWorkshops | Workshop plan with types and sequence |
| Impact Analyst | Assess program impacts | fetchBAU, fetchProgram | Impact statements across dimensions |
| KPI Recommender | Suggest KPIs/OKRs | listKPITemplates, createKPI | Recommended KPIs and targets |
| Performance Analyst | Analyze performance trends | fetchKPI, fetchOKR, fetchMetricEvents | Performance summary with recommendations |
| Executive Insights | Generate executive summaries | (reads aggregated data) | Narrative summary with top risks/opportunities |

### Prompt Engineering Best Practices

1. **Structured Prompts**: Use clear sections (Context, Task, Output Format)
2. **Examples**: Include 1-2 shot examples for complex tasks
3. **Constraints**: Explicitly state limitations and requirements
4. **Output Schema**: Define expected JSON structure
5. **Tool Descriptions**: Clear, concise tool usage instructions

---

## Testing Strategy

### Unit Tests

Test individual functions and classes:

```typescript
describe('BAUService', () => {
  it('should create a BAU process', async () => {
    const service = new BAUService(mockDb, mockEvents, mockLogger);
    const result = await service.create({
      name: 'Test Process',
      ownerId: 'user_1',
      teamId: 'team_1'
    });

    expect(result.id).toBeDefined();
    expect(result.name).toBe('Test Process');
  });
});
```

### Integration Tests

Test service interactions:

```typescript
describe('Program Creation Workflow', () => {
  it('should create program with workstreams', async () => {
    const intake = { /* ... */ };
    const result = await programDesignerAgent.execute(intake);

    expect(result.program).toBeDefined();
    expect(result.suggestedWorkstreams.length).toBeGreaterThan(0);
  });
});
```

### E2E Tests

Test full user flows:

```typescript
describe('Executive Dashboard', () => {
  it('should display program health metrics', async () => {
    await loginAs('exec@example.com');
    await goto('/dashboard/executive');

    const healthWidget = await page.findWidget('program-health');
    expect(healthWidget).toContainText('Programs');
  });
});
```

### AI Agent Testing

```typescript
describe('Program Designer Agent', () => {
  it('should generate valid program structure', async () => {
    const intake = createMockIntake();
    const result = await agent.execute(intake);

    expect(result.program.name).toBeDefined();
    expect(result.suggestedWorkstreams).toHaveLength(3);

    // Validate against schema
    expect(validateProgramDraft(result)).toBe(true);
  });
});
```

---

## Deployment

### Infrastructure (Terraform)

```hcl
# infra/terraform/main.tf
module "vpc" {
  source = "./modules/vpc"
  # ...
}

module "eks" {
  source = "./modules/eks"
  # ...
}

module "rds" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 5.0"
  # PostgreSQL configuration
}

module "redis" {
  source = "./modules/elasticache"
  # ...
}
```

### Kubernetes Deployment

```yaml
# infra/kubernetes/services/bau-service/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: bau-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: bau-service
  template:
    metadata:
      labels:
        app: bau-service
    spec:
      containers:
      - name: bau-service
        image: opuscore/bau-service:latest
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: url
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm test

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: docker build -t opuscore/bau-service .
      - run: docker push opuscore/bau-service:latest

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: kubectl apply -f infra/kubernetes/
```

---

## AI Assistant Guidelines

### When Working on This Codebase

1. **Always Reference the Spec**
   - Treat `OpusCore_Master_Build_Prompt_v2.md` as source of truth
   - Validate against `OpusCore_OpenAPI_FULL.yaml` for API changes

2. **Maintain Module Boundaries**
   - Services should be loosely coupled
   - Communication via APIs or events only
   - No direct database access across services

3. **Emit Events**
   - Every significant action should emit a Signal
   - Use structured event names: `<domain>.<entity>.<action>`
   - Include relevant context in payload

4. **Think AI-First**
   - Design APIs to be tool-callable
   - Use clear, typed schemas
   - Document tool usage in agent definitions

5. **Follow the Data Model**
   - Stick to defined entities and relationships
   - Use proper foreign keys and constraints
   - Always include timestamps and versioning

6. **Validate API Contracts**
   - Match request/response shapes to OpenAPI spec
   - Use proper HTTP methods and status codes
   - Implement proper error handling

7. **Document as You Go**
   - Update this CLAUDE.md when patterns change
   - Add JSDoc/TSDoc comments
   - Update OpenAPI spec for new endpoints

8. **Test Thoroughly**
   - Write unit tests for business logic
   - Integration tests for service interactions
   - E2E tests for critical user flows

### Common Pitfalls to Avoid

❌ **Don't**:
- Create endpoints not in the OpenAPI spec
- Access other services' databases directly
- Skip event emission for important actions
- Hardcode configuration values
- Ignore error handling
- Create entities without versioning support

✅ **Do**:
- Follow the specification
- Use dependency injection
- Emit structured events
- Use environment variables
- Handle errors gracefully
- Support versioning from day one

### Code Review Checklist

Before submitting code, verify:

- [ ] Matches OpenAPI specification
- [ ] Emits appropriate signals/events
- [ ] Includes unit tests (>80% coverage)
- [ ] Follows TypeScript/ESLint conventions
- [ ] Has proper error handling
- [ ] Includes JSDoc documentation
- [ ] No hardcoded secrets/config
- [ ] Database migrations included (if schema change)
- [ ] Updated CLAUDE.md (if patterns changed)

---

## Quick Reference

### Environment Variables

```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/opuscore
REDIS_URL=redis://host:6379

# Auth
JWT_SECRET=<secret>
JWT_EXPIRY=1h

# AI
OPENAI_API_KEY=<key>
OPENAI_MODEL=gpt-4

# Services
BAU_SERVICE_URL=http://bau-service:3001
PROGRAM_SERVICE_URL=http://program-service:3002
AI_ORCHESTRATOR_URL=http://ai-orchestrator:3010

# Observability
LOG_LEVEL=info
SENTRY_DSN=<dsn>
```

### Key Commands

```bash
# Development
npm run dev              # Start all services locally
npm test                 # Run tests
npm run lint             # Lint code

# Database
npm run migrate          # Run migrations
npm run seed             # Seed dev data

# Deployment
npm run build            # Build for production
docker-compose up        # Run locally with Docker
kubectl apply -f k8s/    # Deploy to Kubernetes
```

### Useful Links

- **OpenAPI Spec**: `/OpusCore_OpenAPI_FULL.yaml`
- **Master Spec**: `/OpusCore_Master_Build_Prompt_v2.md`
- **Dashboard Arch**: `/OpusCore_Executive_Dashboard_Architecture.md`
- **KPI/OKR Framework**: `/OpusCore_KPI_OKR_Framework.md`

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-11-20 | Initial CLAUDE.md creation |

---

**For questions or clarifications, refer to the master specification or update this document to benefit future AI assistants.**
