import { IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';

export enum WorkshopStatus {
  PLANNED = 'PLANNED',
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class CreateWorkshopDto {
  @IsString()
  type!: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  scheduledFor?: string;
}

export interface WorkshopResponse {
  id: string;
  programId: string;
  type: string;
  name?: string;
  scheduledFor?: Date;
  status: WorkshopStatus;
  createdAt: Date;
}
