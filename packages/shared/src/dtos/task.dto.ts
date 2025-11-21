import { IsString, IsEnum, IsOptional, IsDateString, IsJSON } from 'class-validator';

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

export class CreateTaskDto {
  @IsString()
  type!: string;

  @IsString()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  assignedToId?: string;

  @IsString()
  @IsOptional()
  programId?: string;

  @IsJSON()
  @IsOptional()
  payload?: any;

  @IsDateString()
  @IsOptional()
  dueDate?: string;
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  assignedToId?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsJSON()
  @IsOptional()
  payload?: any;

  @IsDateString()
  @IsOptional()
  dueDate?: string;
}

export interface TaskResponse {
  id: string;
  type: string;
  title: string;
  description?: string;
  status: TaskStatus;
  assignedToId?: string;
  programId?: string;
  payload?: any;
  dueDate?: Date;
  createdAt: Date;
}
