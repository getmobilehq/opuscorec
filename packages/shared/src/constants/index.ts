// Platform-wide constants

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

export const SIGNAL_TYPES = {
  BAU_CREATED: 'bau.process.created',
  BAU_UPDATED: 'bau.process.updated',
  BAU_ARCHIVED: 'bau.process.archived',
  PROGRAM_CREATED: 'program.created',
  PROGRAM_UPDATED: 'program.updated',
  PROGRAM_STATUS_CHANGED: 'program.status.changed',
  WORKSHOP_SCHEDULED: 'workshop.scheduled',
  WORKSHOP_COMPLETED: 'workshop.completed',
  TASK_CREATED: 'task.created',
  TASK_COMPLETED: 'task.done',
  KPI_PROGRESS: 'kpi.progress',
  OKR_PROGRESS: 'okr.progress',
} as const;

export const METRIC_EVENT_TYPES = {
  TASK_COMPLETED: 'task.completed',
  WORKSHOP_COMPLETED: 'workshop.completed',
  KPI_PROGRESS: 'kpi.progress',
  OKR_PROGRESS: 'okr.progress',
  BAU_UPDATE: 'bau.update',
} as const;

export const WORKSHOP_TYPES = {
  KICKOFF: 'kickoff',
  DISCOVERY: 'discovery',
  DESIGN: 'design',
  IMPACT_ASSESSMENT: 'impact_assessment',
  READINESS_REVIEW: 'readiness_review',
  RETROSPECTIVE: 'retrospective',
} as const;

export const AI_AGENT_TYPES = {
  PROGRAM_DESIGNER: 'program_designer',
  BAU_CURATOR: 'bau_curator',
  WORKSHOP_PLANNER: 'workshop_planner',
  IMPACT_ANALYST: 'impact_analyst',
  KPI_RECOMMENDER: 'kpi_recommender',
  PERFORMANCE_ANALYST: 'performance_analyst',
  EXECUTIVE_INSIGHTS: 'executive_insights',
} as const;
