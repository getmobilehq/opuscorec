# OpusCore Executive Dashboard Architecture

## 1. Purpose

The **Executive Dashboard (Command Center)** provides a single source of truth for:

- Program portfolio health
- BAU documentation and readiness
- KPI/OKR performance
- Risk & issue concentration
- Readiness for cutover and change

It is powered by **Signals**, **Metrics**, **KPI/OKR data**, and **program/BAU metadata**.

---

## 2. High-Level Architecture

### 2.1 Components

1. **Dashboard Service**
   - Backend service to aggregate data for dashboard views.
   - Exposes `/dashboards/executive` and future dashboard endpoints.

2. **Signals & Metrics Service**
   - Collects events from across the platform.
   - Normalises events into `Signal` and `MetricEvent` models.
   - Feeds analytics and dashboard computations.

3. **KPI/OKR Service**
   - Manages KPI and OKR records.
   - Provides current status, trends, and aggregates.

4. **Program Service**
   - Supplies program metadata, status, and risk tags.

5. **BAU Service**
   - Supplies BAU coverage, status, and “missing process” flags.

6. **AI Insights Engine**
   - Consumes aggregated metrics and signals.
   - Generates narrative insights, warnings, and recommendations.

7. **Frontend – Executive Dashboard UI**
   - Presents widgets, charts, tables, and narratives.
   - Provides filters and drill-down capabilities.

---

## 3. Data Flow

### 3.1 Event & Signal Generation

When users interact with OpusCore:

- Create/update BAU processes → `bau.process.created/updated`
- Create/update programs → `program.created/updated`
- Complete workshops → `workshop.completed`
- Complete tasks → `task.done`
- Change KPI values → `kpi.progress`
- Update OKRs → `okr.progress`
- System-derived events:
  - “Missing BAU detected”
  - “Readiness threshold not met”
  - “Risk spikes detected”

All of these are emitted as **Signals** (append-only) and **MetricEvents**.

### 3.2 Aggregation

The Dashboard Service:

1. Periodically (or on-demand) aggregates:
   - Program statuses
   - KPI/OKR performance
   - BAU coverage
   - Risk indicators
   - Workload / velocity metrics

2. Computes:
   - Portfolio roll-ups
   - Performance summaries
   - Trend data

3. Asks AI Insights Engine to:
   - Generate narrative summaries
   - Highlight anomalies
   - Suggest focus areas

---

## 4. Dashboard Views & Widgets

### 4.1 Executive Overview Widgets

1. **Program Health Summary**
   - Count of programs by RAG status.
   - Top 5 at-risk programs.

2. **Mobilization Velocity**
   - Average days from “program created” to “mobilization complete”.
   - Trend by quarter.

3. **BAU Coverage**
   - % BAU processes documented per critical team.
   - Heatmap by department.

4. **KPI/OKR Performance**
   - % OKRs on track vs off track.
   - KPI status distribution.

5. **Risk & Issue Heatmap**
   - RAIDs aggregated by severity and owner.

6. **Readiness Score**
   - Composite metric using:
     - BAU completeness
     - Training completion
     - Open risks
     - Impact assessments

### 4.2 Program Portfolio View

- Table of all programs with:
  - Status, Sponsor, Manager
  - Workstreams count
  - Health (RAG)
  - Key metrics (budget variance, timeline health, readiness)

Clicking a row opens a **Program Detail View**.

### 4.3 Program Detail View

Widgets:

- Program summary
- Workstream status
- Key OKRs
- Upcoming milestones
- RAID summary
- Readiness breakdown
- Latest signals (activity feed)

### 4.4 KPI/OKR Performance View

- Organisation-level OKR progress
- Drill-down by:
  - Team
  - Workstream
  - Individual
- Charts:
  - Time-series for key KPIs
  - Route to underlying events and artefacts

---

## 5. API Design

The Dashboard frontend primarily calls:

- `GET /dashboards/executive?period=&orgUnit=`

`DashboardView` schema includes:

- `period`
- `orgUnit`
- Array of `DashboardWidget` entries, each containing:
  - `type` (e.g. "program_health", "okr_summary")
  - `title`
  - `description`
  - `data` (free-form JSON for widget-specific rendering)

---

## 6. Technology Approach

### 6.1 Backend

- Implement Dashboard Service as a separate service or module.
- Use:
  - **Read-optimised queries** and/or
  - Precomputed aggregates (materialized views, cached summaries).

### 6.2 Storage

- Transactional data:
  - PostgreSQL (programs, BAU, tasks, KPI, OKR).
- Signals & MetricEvents:
  - Append-only event table (Postgres) or
  - Streams (Kafka/Kinesis) + sink to analytics DB.
- Aggregates:
  - Materialized views in Postgres, or
  - Dedicated analytics DB (ClickHouse, Redshift, BigQuery — future).

### 6.3 Real-Time vs Snapshot

- MVP:
  - Snapshot-based (refresh on load).
- V1+:
  - Auto-refresh intervals (e.g., every 60s).
- V2:
  - WebSocket / server-sent events for near-real-time updates.

---

## 7. Role-Based Access Control

- **Exec / C-level**
  - Full org-level view.

- **Program Manager**
  - Portfolio subset or only their own programs.

- **Team Lead**
  - Teams + workstreams they own.

- **Individual**
  - Limited dashboards: their OKRs, tasks, KPIs.

---

## 8. AI-Driven Insights

### 8.1 Executive Insights Agent

- Input:
  - Aggregated data (KPI/OKR status, risks, BAU gaps, program statuses, signals).
- Output:
  - Narrative summary:
    - “Top 3 risks this week”
    - “Programs trending off-track”
    - “Teams exceeding targets”
  - Recommendations:
    - “Consider additional training for Team X”
    - “Increase focus on BAU documentation in Dept Y”
    - “Workshop backlog in Program Z – risk for mobilization”

Insights surface as:

- Text panels in the dashboard
- PDF/HTML exports
- Optional weekly email briefings

---

## 9. UX Principles

- Clear hierarchy (Org → Program → Team → Individual).
- Filters:
  - Time window
  - Org unit
  - Program
  - Team
- Drill-down from visuals to underlying details and artefacts.
- Export options:
  - PDF / PowerPoint snapshots
  - CSV for data
- Actionability:
  - From dashboard widget → create task / trigger workshop / open program directly.

---

## 10. Implementation Phasing

### Phase 1 (MVP+)
- Executive overview widgets:
  - Program counts, basic RAG.
  - BAU coverage.
  - Simple KPI/OKR stats.
- Snapshot refresh.

### Phase 2 (V1)
- Deeper drill-down views.
- Signals section (recent activity).
- Basic AI-generated summary.

### Phase 3 (V2)
- Real-time updates (WebSocket).
- Graph-based relationships (program–system–team).
- Predictive insights (e.g., risk forecasting).
- Self-service configuration of dashboard widgets.
