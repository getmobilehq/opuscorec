# OpusCore KPI / OKR Framework

## 1. Purpose

The KPI/OKR Framework in OpusCore provides a consistent, structured way to:

- Define, assign, and track **performance metrics** across individuals, teams, workstreams, programs, and the organisation.
- Align operational work (BAU and programs) to **measurable outcomes**.
- Feed **Executive Dashboards** and **AI-driven insights** with reliable, normalised performance data.

---

## 2. Core Concepts

### 2.1 KPI (Key Performance Indicator)

A **KPI** is a metric that measures the performance of:

- A user
- A team
- A workstream
- A program
- The entire organisation

Each KPI has:

- `name`
- `description`
- `ownerId` (user)
- `teamId` (optional)
- `scope` (`user|team|workstream|program|org`)
- `targetValue`
- `currentValue`
- `unit` (%, days, count, £, etc.)
- `period` (e.g. `2025-Q1`)
- `status` (`on_track | at_risk | off_track`)

### 2.2 OKR (Objectives & Key Results)

An **OKR** is a structured objective with several quantifiable key results.

- Objective (qualitative)
- Key Results (quantitative)

Each OKR has:

- `ownerId`
- `teamId` (optional)
- `scope` (`user|team|workstream|program|org`)
- `period`
- `objective`
- `keyResults[]`
- `status`

Each **Key Result** has:

- `description`
- `targetValue`
- `currentValue`
- `unit`
- `status`

---

## 3. Levels of KPI/OKR

### 3.1 Organisation Level

Examples:

- Increase on-time program delivery from 65% to 90%.
- Reduce average mobilization time from 60 days to 30 days.
- Achieve 100% BAU documentation coverage for critical teams.

### 3.2 Program Level

Examples:

- Deliver Program X on time, in budget, with defined scope.
- Achieve a readiness score of 90% before go-live.
- Reduce onboarding cycle time by 20%.

### 3.3 Team Level

Examples:

**Ops:**
- Maintain SLA adherence ≥ 95%.
- Reduce escalations by 15%.

**Tech:**
- Maintain deploy success rate ≥ 98%.
- Keep escaped defects < 5% per release.

**Change/Training:**
- Achieve ≥ 95% training completion.
- Reach user adoption thresholds by end of hypercare.

### 3.4 Individual Level

Examples:

- Complete 95% of tasks on time.
- Facilitate 5 key workshops this quarter.
- Document 10 BAU processes for assigned area.

---

## 4. Lifecycle of a KPI / OKR

### 4.1 Definition

- Created via `/kpis` or `/okrs` endpoints or UI.
- Can be:
  - Manually defined by managers
  - AI-suggested based on role, BAU, and program context

### 4.2 Alignment

- Each KPI/OKR is linked to:
  - A program (optional)
  - A workstream (optional)
  - A team and/or user (mandatory for lower-level metrics)
- Alignment ensures that every KPI/OKR can be surfaced appropriately in dashboards.

### 4.3 Tracking

- Progress events come from:
  - Task completions
  - Workshop completions
  - BAU changes
  - Manual updates
  - External system integrations (ITSM, Jira, etc.)
- These are logged as `MetricEvent` via `/metrics/events`.

### 4.4 Review

- KPIs and OKRs have periodic reviews:
  - Period-end (e.g., quarterly)
  - Program milestones
  - Governance cadence (SteerCo, program boards)

### 4.5 Closure and Learning

- At period end:
  - Status frozen (on_track/at_risk/off_track)
  - Lessons learned written back
  - AI can generate performance summaries and recommendations

---

## 5. Integration with OpusCore Modules

### 5.1 BAU Navigator

- BAU processes can suggest default KPIs:
  - E.g., for “Incident Management”, KPIs = MTTR, incident volume, SLA breach rate.
- When a new BAU process is documented, OpusCore can:
  - Suggest relevant KPIs
  - Create default KPIs at team-level

### 5.2 Program Builder

- When generating a new program, the AI Program Designer Agent creates:
  - Program-level OKRs aligned to scope and goals
  - Suggested team-level KPIs for each workstream

### 5.3 Tasks & Workflows

- Completion of tasks automatically emits `MetricEvent` entries:
  - `eventType: "task.completed"`
- Certain task types are mapped to KPIs:
  - E.g., “BAU Process Documented” → BAU coverage KPI
  - “Workshop Completed” → discovery completeness KPI

### 5.4 Executive Dashboard

- Aggregate KPI/OKR data is summarised by:
  - Org
  - Program
  - Team
  - Workstream
- Executives see:
  - % OKRs on-track vs off-track
  - Top risk KPIs
  - Trend charts

---

## 6. AI Enhancements

### 6.1 KPI Recommender Agent

Inputs:
- Role
- Team
- Program context
- Historical BAU & program data

Outputs:
- Suggested KPI definitions
- Suggested targets
- Suggested periods

### 6.2 OKR Generation & Refinement

- Agent proposes initial OKRs for new programs and teams.
- Users refine and approve via UI.

### 6.3 Performance Analyst Agent

- Reads KPI/OKR history + events.
- Produces:
  - Performance summaries
  - Trend analysis
  - Risk warnings
  - Coaching suggestions

---

## 7. Governance & Rules

- Only users with specific roles (e.g., Manager, Sponsor, PMO) can:
  - Define org-level or program-level OKRs
  - Approve KPI/OKR changes
- Role-based access controls apply:
  - Individual contributors see their OKRs + local team KPIs
  - Managers see their team/workstream
  - Execs see global portfolio view

---

## 8. Example

**Program Objective:**  
“Implement new onboarding platform across EMEA by Q3 2025.”

**Key Results:**
- Reduce onboarding cycle time from 10 to 7 days.
- Achieve 95% Day-1 readiness for new joiners.
- Train 100% of onboarding staff before go-live.

**Linked KPIs:**
- Cycle time (Ops)
- Readiness coverage (Ops/HR)
- Training completion (Training)

These are all defined in OpusCore and updated automatically as work is delivered.
