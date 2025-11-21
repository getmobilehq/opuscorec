import { IsString, IsJSON, IsNumber, IsOptional } from 'class-validator';

export class CreateSignalDto {
  @IsString()
  type!: string;

  @IsString()
  source!: string;

  @IsJSON()
  payload!: any;
}

export interface SignalResponse {
  id: string;
  type: string;
  source: string;
  payload: any;
  createdAt: Date;
}

export class CreateMetricEventDto {
  @IsString()
  eventType!: string;

  @IsString()
  sourceId!: string;

  @IsString()
  @IsOptional()
  ownerId?: string;

  @IsString()
  @IsOptional()
  teamId?: string;

  @IsNumber()
  @IsOptional()
  value?: number;

  @IsJSON()
  @IsOptional()
  metadata?: any;
}

export interface MetricEventResponse {
  eventType: string;
  sourceId: string;
  ownerId?: string;
  teamId?: string;
  value?: number;
  metadata?: any;
  createdAt: Date;
}
