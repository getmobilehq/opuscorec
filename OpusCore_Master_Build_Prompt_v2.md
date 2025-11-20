# OpusCore Platform Master Build Prompt (v2 – with KPI/OKR & Executive Dashboard)

You are to design and build **OpusCore**, a full-scale enterprise SaaS platform:  
**The Operational Operating System for BAU Intelligence, Program Orchestration, KPI/OKR Performance, and Executive Insight.**

Your task is to create:

- System & solution architecture  
- Backend services  
- API endpoints (as per OpenAPI spec)  
- Database schema & migrations  
- Frontend applications & components  
- AI orchestration layer (multi-agent, tool calling)  
- Workflow engine for long-running processes  
- Metrics, signals, and KPI/OKR tracking  
- Executive dashboard experience  
- DevOps setup (IaC + CI/CD)  
- Implementation roadmap & documentation  

Use this prompt as the **source of truth**.  
This specification supersedes all prior versions.

---

## SECTION 1 – PLATFORM VISION

OpusCore is a unified platform for large enterprises that:

1. Maps, documents, and maintains **BAU (Business-as-Usual) processes**.  
2. Detects **missing or undocumented processes** using operational data.  
3. Uses AI to generate **full programs** (charter, workstreams, workshops, plans) in minutes.  
4. Delivers a **Workshop & Impact Engine** for structured discovery and design.  
5. Provides a **Performance Framework Engine** for KPI/OKR definition and tracking.  
6. Presents a **single Executive Dashboard (Command Center)** as a source of truth.  
7. Uses a **Signals & Metrics Stream** to track all activity and feed analytics & AI insights.

OpusCore =  
**BAU Navigator** + **Program Builder** + **Workshop Engine** + **Performance Framework Engine (KPI/OKR)** +  
**AI Orchestrator** + **Signals & Metrics** + **Executive Dashboard**.

Brand domain: `useopuscore.com`.

---

## SECTION 2 – CORE MODULES (MUST BE IMPLEMENTED)

### 2.1 BAU Navigator

Capabilities:

- CRUD BAU processes with rich metadata.
- Versioning & ownership.
- Tagging by team, system, geography, product.
- Link BAU processes to:
  - Teams
  - Programs
  - Systems
  - KPIs/OKRs (where relevant).
- AI-assisted drafting of new BAU processes.
- Missing BAU detection based on external signals (e.g., ITSM tickets, Jira issues).
- Semantic search (RAG) over BAU content.

### 2.2 Program Builder

Capabilities:

- Intake form to describe a new program (vision, scope, impacted teams/systems).  
- AI Program Designer Agent to:
  - Identify impacted BAU.
  - Propose workstreams.
  - Generate program boilerplate (overview, objectives, scope, governance, phases).
  - Suggest required workshops.
  - Draft program-level OKRs and key KPIs.
- Create:
  - Program entity
  - Workstreams
  - Initial workshops
  - Tasks for mobilisation.

### 2.3 Workshop Engine

Capabilities:

- Library of standard workshop types.
- Create/schedule workshops against a program.
- Generate agendas, inputs, outputs, and templates.
- Store workshop outcomes as artefacts.
- Emit signals (e.g., `workshop.completed`) for metrics and readiness.

### 2.4 Impact Engine

Capabilities:

- Capture impact assessments across:
  - People
  - Process
  - Technology
  - Data
  - Regulatory/Compliance.
- AI Impact Analyst Agent to suggest impact types and severity.
- Integrate impact outputs into:
  - Program risk profile
  - Readiness scores
  - Executive Dashboard.

### 2.5 Performance Framework Engine (KPI/OKR)

Capabilities:

- Define KPIs for:
  - Users
  - Teams
  - Workstreams
  - Programs
  - Organisation.
- Define OKRs:
  - Objective (qualitative)
  - Key Results (quantitative).
- Link KPIs/OKRs to:
  - Programs, teams, users, workstreams.
- Track progress via MetricEvents (e.g., task completions, workshop completions, BAU updates).
- AI KPI Recommender Agent:
  - Suggest KPIs and OKRs based on role, BAU, and program context.
- AI Performance Analyst Agent:
  - Summarise performance
  - Identify risk trends
  - Suggest corrective actions.

### 2.6 Signals & Metrics Stream

Capabilities:

- Capture events from all modules as Signals:
  - BAU changes
  - Program changes
  - Workshop lifecycle
  - Tasks lifecycle
  - KPI/OKR updates
  - System-detected events (e.g., missing BAU).
- Normalise events into:
  - `Signal` records (for activity feeds).
  - `MetricEvent` records (for KPI/OKR progress, readiness metrics, etc.).
- Provide APIs for internal services and external integrations to emit events.

### 2.7 Executive Dashboard (Command Center)

Capabilities:

- Executive overview widgets:
  - Program health (RAG).
  - BAU coverage.
  - Mobilisation velocity.
  - KPI/OKR performance.
  - Risk & RAID heatmaps.
  - Readiness score.
- Program portfolio view and drill-down.
- Program detail dashboard (workstreams, risks, readiness, OKRs).
- KPI/OKR performance view (org → team → individual).
- Activity signals feed.
- AI Executive Insights Agent to produce:
  - Narrative summaries
  - Top risks and opportunities
  - Recommended next actions.

### 2.8 AI Orchestration Layer

Capabilities:

- Manage multiple AI “agents”:
  - Program Designer Agent
  - BAU Curator Agent
  - Workshop Planner Agent
  - Impact Analyst Agent
  - KPI Recommender Agent
  - Performance Analyst Agent
  - Executive Insights Agent
- Use tool/function calling to interact with domain services.
- Coordinate multi-step workflows (reasoning + actions).
- Integrate with RAG for BAU, programs, templates, metrics, prior outcomes.
- Govern prompts, responses, and validations.

### 2.9 Workflow Engine

Capabilities:

- Orchestrate long-running workflows:
  - CreateProgramWorkflow
  - CurateMissingBAUWorkflow
  - WorkshopPlanWorkflow
  - ImpactAssessmentWorkflow
  - OKRSetupWorkflow
  - KPITrackingWorkflow
  - ExecutiveInsightsWorkflow
- Manage:
  - States
  - Approvals
  - Human-in-the-loop steps
  - Time-based triggers.

---

## SECTION 3 – ARCHITECTURE (AI-ORCHESTRATION-FIRST)

Implement an **AI-Orchestration-first architecture** with the following layers:

### 3.1 Client Layer

- React or Next.js frontend.
- Workspaces:
  - BAU Explorer (list, detail, versions, search).
  - Program Builder (intake, AI suggestions, program detail).
  - Workshops (catalogue, calendar, detail).
  - KPI/OKR (personal, team, program views).
  - Executive Dashboard.
- Integrations UI:
  - Settings for ITSM/Jira/HRIS connections.

### 3.2 API Gateway & BFF

- Single public entrypoint (API Gateway).
- Backend-for-frontend layer for:
  - Aggregating multiple services
  - Tailoring responses for UI views.
- Auth:
  - JWT / OIDC / SSO ready.

### 3.3 Domain Services

Implement as microservices or a modular monolith (but keep boundaries clear):

- **Auth/Identity Service**
  - Users, roles, teams, permissions.

- **BAU Service**
  - BAU processes, versions, tags, links to teams/systems/programs.

- **Program Service**
  - Programs, workstreams, status, governance metadata.

- **Workshop Service**
  - Workshop catalogue and instances.

- **Template Service**
  - Reusable artefacts (documents, workshop templates, boilerplate texts).

- **Workflow Service**
  - Long-running workflow definitions & instances.

- **Task Service**
  - Tasks assigned to users/teams/programs.

- **KPI/OKR Service**
  - KPI and OKR definitions and states.

- **Signals & Metrics Service**
  - Signals and MetricEvents ingest, storage, simple aggregations.

- **Dashboard Service**
  - Aggregated views for executive and other dashboards.

- **Search & RAG Service**
  - Full-text search and vector search across BAU, programs, templates, metrics.

### 3.4 Data Layer

- PostgreSQL as primary relational DB.
- Redis for caching and ephemeral data.
- Vector store (e.g. pgvector, FAISS, Milvus) for embeddings.
- Object storage (S3 or equivalent) for artefacts.
- Optional graph DB (Neo4j or similar) for relationships (teams–systems–programs–BAU).

### 3.5 AI Orchestration Layer

Implement a separate **AI Orchestrator** service:

- Handles:
  - Prompt templates
  - Tool schemas
  - Conversations & state
- Connects to the LLM API (e.g., GPT-5.1) with:
  - Function/tool calling
  - Response validation
  - Safety checks.
- Calls domain services via well-typed internal APIs.

### 3.6 DevOps

- Docker for containerisation.
- Kubernetes (e.g., EKS) for orchestration.
- Terraform for IaC (network, EKS, RDS, Redis, S3, etc.).
- CI/CD via GitHub Actions (or similar).

---

## SECTION 4 – ENTITY MODEL (ERD)

Implement at minimum the following entities (logical model):

### 4.1 Core

- **User**(id, name, email, role, teamId, ...).  
- **Team**(id, name, department, parentTeamId?).

### 4.2 BAU & Programs

- **BAU_Process**(id, name, description, ownerId, teamId, systemIds[], status, version, createdAt, updatedAt).  
- **Program**(id, name, sponsorId, managerId, scope, status, createdAt, updatedAt).  
- **Workstream**(id, programId, name, leadId).  
- **Workshop**(id, programId, type, scheduledFor, status, outputsRef, ...).  
- **Task**(id, type, status, assignedTo, programId?, bauProcessId?, dueDate, payload).

### 4.3 KPI & OKR

- **KPI**(id, name, description, ownerId, teamId?, scope, targetValue, currentValue, unit, period, status, createdAt).  
- **OKR**(id, ownerId, teamId?, scope, period, objective, status, createdAt).  
- **KeyResult**(id, okrId, description, targetValue, currentValue, unit, status).

### 4.4 Signals & Metrics

- **Signal**(id, type, source, payloadJSON, createdAt).  
- **MetricEvent**(id, eventType, sourceId, ownerId, teamId?, value?, metadataJSON, createdAt).

### 4.5 Dashboards

- **DashboardWidgetConfig**(id, type, title, configJSON, ownerRoleScope).  
- **Derived aggregations** (materialized views or computed queries for DashboardView).

---

## SECTION 5 – API SPEC (OPENAPI)

Implement all endpoints defined in the **OpusCore OpenAPI FULL YAML** (v0.2.0), including:

- Auth: `/auth/login`, `/users/me`  
- BAU: `/bau/processes`, `/bau/processes/{id}`, `/bau/processes/{id}/versions`  
- Programs: `/programs`, `/programs/{id}`, `/programs/{id}/workstreams`, `/programs/{id}/workshops`  
- Tasks: `/tasks`, `/tasks/{id}`  
- AI: `/ai/generate-program`, `/ai/suggest-workshops`, `/ai/draft-bau`  
- KPI/OKR: `/kpis`, `/kpis/{id}`, `/okrs`, `/okrs/{id}`  
- Dashboards: `/dashboards/executive`  
- Signals & Metrics: `/signals`, `/metrics/events`  

All schemas (BAU, Program, Workshop, Task, KPI, OKR, Signal, MetricEvent, DashboardView, etc.) must match the YAML.

---

## SECTION 6 – AI ORCHESTRATION AGENTS

Implement the following AI agents in the AI Orchestrator:

### 6.1 Program Designer Agent

- Input:
  - ProgramIntake (name, description, objectives, impactedTeams, impactedSystems).
- Tools:
  - `searchBAU`, `listWorkstreamsTemplates`, `createProgram`, `createWorkstreams`, `createWorkshops`.
- Output:
  - Program boilerplate
  - Suggested workstreams
  - Suggested workshops
  - Program-level OKRs and KPIs.

### 6.2 BAU Curator Agent

- Input:
  - BAUDraftRequest (signals: logs/tickets text, teamId).
- Tools:
  - `searchBAU`, `draftBAUProcess`, `createBAUProcess(draft)`.
- Output:
  - Draft BAU process
  - Suggested owner/team
  - Confidence score.
- Human review required before activation.

### 6.3 Workshop Planner Agent

- Input:
  - Program context (scope, status, impacted areas).
- Tools:
  - `listWorkshopTemplates`, `createWorkshops`, `suggestSchedule`.
- Output:
  - Workshop plan with types, sequence, suggested participants.

### 6.4 Impact Analyst Agent

- Input:
  - BAU vs future-state differences
  - Program objectives and changes.
- Tools:
  - `fetchBAUProcesses`, `fetchProgramDesign`.
- Output:
  - People/process/tech/data/regulatory impact statements
  - Severity levels
  - Suggested mitigations.

### 6.5 KPI Recommender Agent

- Input:
  - Role, team, program context, BAU area.
- Tools:
  - `listKPITemplates`, `createKPI`.
- Output:
  - Suggested KPIs and targets
  - Mapped to scope (user/team/program/org).

### 6.6 Performance Analyst Agent

- Input:
  - KPI/OKR history
  - MetricEvents over time.
- Tools:
  - `fetchKPI`, `fetchOKR`, `fetchMetricEvents`.
- Output:
  - Performance summary
  - Risk flags (“off-track”)
  - Coaching suggestions and recommended actions.

### 6.7 Executive Insights Agent

- Input:
  - Aggregated dashboard data (programs, BAU coverage, KPI/OKR status, Signals).
- Output:
  - Executive narrative summary
  - Top 3–5 focus areas
  - Key risks and recommended next steps.

---

## SECTION 7 – WORKFLOWS

Implement at least these workflows in the Workflow Service:

### 7.1 CreateProgramWorkflow

1. Triggered when a new intake is submitted.  
2. Calls Program Designer Agent.  
3. Creates draft program, workstreams, workshops, and tasks.  
4. Creates program-level OKRs and key KPIs.  
5. Assigns review task to Program Manager.  
6. On approval, program moves to `mobilizing`.

### 7.2 CurateMissingBAUWorkflow

1. Triggered when external signals indicate undocumented recurring work.  
2. BAU Curator Agent drafts process.  
3. Task assigned to BAU owner / Ops lead for review.  
4. On approval, BAU process becomes active and linked KPIs update coverage metrics.

### 7.3 WorkshopPlanWorkflow

1. Triggered when a program enters `mobilizing`.  
2. Workshop Planner Agent generates a workshop plan.  
3. Tasks created for scheduling and facilitation.  
4. Signals emitted on completion for readiness metrics.

### 7.4 ImpactAssessmentWorkflow

1. Triggered for major design changes.  
2. Impact Analyst Agent drafts assessments.  
3. SMEs review and approve.  
4. Risks and mitigations linked into program RAID and readiness.

### 7.5 OKRSetupWorkflow

1. At start of a period (quarter) or new program.  
2. KPI Recommender suggests OKRs by scope (org/team/program/user).  
3. Managers review and approve.  
4. OKRs locked in for the period.

### 7.6 KPITrackingWorkflow

1. Continuously receives MetricEvents (task completions, training completion, BAU updates, etc.).  
2. Updates KPI and KeyResult current values.  
3. Adjusts KPI/OKR status (on_track/at_risk/off_track).  
4. Emits signals when thresholds breach.

### 7.7 ExecutiveInsightsWorkflow

1. Runs on schedule (e.g., daily/weekly).  
2. Aggregates metrics, BAU status, program statuses, and signals.  
3. Calls Executive Insights Agent.  
4. Stores insight summaries.  
5. Surfaces them in the Executive Dashboard and optional email exports.

---

## SECTION 8 – SUCCESS CRITERIA

The platform is considered successful when:

1. A user can create a new program with a short intake, and within minutes:
   - A program, workstreams, workshops, tasks, and KPIs/OKRs are generated.
2. BAU processes can be:
   - Documented, versioned, searched, and linked to programs.
3. Missing BAU can be detected from external operational data and drafted via AI.  
4. KPI/OKR tracking is automated via events, not manual spreadsheets.  
5. The Executive Dashboard provides:
   - Program portfolio health
   - BAU coverage
   - KPI/OKR performance
   - Readiness and risk indicators
   - AI-generated executive summaries.
6. All modules are integrated end-to-end:
   - BAU ←→ Programs ←→ Workshops ←→ Tasks ←→ KPI/OKR ←→ Dashboard ←→ AI.

---

## SECTION 9 – OUTPUT EXPECTATIONS FOR THE BUILD

The implementation must produce:

- **Architecture documentation** (diagrams + rationale).  
- **OpenAPI implementation** aligned with `OpusCore_OpenAPI_FULL.yaml`.  
- **Data model & migration scripts** for all entities.  
- **Backend services** for BAU, Program, Workshop, Workflow, Task, KPI/OKR, Signals, Dashboard, Search/RAG, AI Orchestrator.  
- **Frontend applications** for:
  - BAU Explorer
  - Program Builder
  - Workshops
  - KPI/OKR views
  - Executive Dashboard.  
- **Workflow definitions** for all key workflows.  
- **DevOps setup** (Terraform, Kubernetes manifests/Helm, CI/CD pipelines).  
- **Monitoring & observability** baseline (logs, metrics, traces).  
- **Documentation & runbooks** for deployment, operations, and onboarding.

This is the **definitive, comprehensive build prompt** for OpusCore (v2).  
All engineering and AI code generation should adhere to this specification.
