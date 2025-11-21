// Common types across the platform

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  status?: string;
  teamId?: string;
  ownerId?: string;
}

// Domain-specific types
export type EntityStatus = 'draft' | 'active' | 'archived' | 'closed';
export type PerformanceStatus = 'on_track' | 'at_risk' | 'off_track';
export type WorkflowStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
