import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';

export enum KPIScope {
  USER = 'USER',
  TEAM = 'TEAM',
  WORKSTREAM = 'WORKSTREAM',
  PROGRAM = 'PROGRAM',
  ORG = 'ORG',
}

export enum PerformanceStatus {
  ON_TRACK = 'ON_TRACK',
  AT_RISK = 'AT_RISK',
  OFF_TRACK = 'OFF_TRACK',
}

export class CreateKPIDto {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  ownerId!: string;

  @IsString()
  @IsOptional()
  teamId?: string;

  @IsEnum(KPIScope)
  scope!: KPIScope;

  @IsNumber()
  targetValue!: number;

  @IsString()
  unit!: string;

  @IsString()
  period!: string;
}

export class UpdateKPIDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  targetValue?: number;

  @IsNumber()
  @IsOptional()
  currentValue?: number;

  @IsEnum(PerformanceStatus)
  @IsOptional()
  status?: PerformanceStatus;
}

export interface KPIResponse {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  teamId?: string;
  scope: KPIScope;
  targetValue: number;
  currentValue: number;
  unit: string;
  period: string;
  status: PerformanceStatus;
  createdAt: Date;
}
