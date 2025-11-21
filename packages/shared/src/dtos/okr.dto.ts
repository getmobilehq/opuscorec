import { IsString, IsArray, IsEnum, IsOptional, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { KPIScope, PerformanceStatus } from './kpi.dto';

export class CreateKeyResultDto {
  @IsString()
  description!: string;

  @IsNumber()
  targetValue!: number;

  @IsString()
  unit!: string;
}

export class CreateOKRDto {
  @IsString()
  ownerId!: string;

  @IsString()
  @IsOptional()
  teamId?: string;

  @IsEnum(KPIScope)
  scope!: KPIScope;

  @IsString()
  period!: string;

  @IsString()
  objective!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateKeyResultDto)
  keyResults!: CreateKeyResultDto[];
}

export class UpdateOKRDto {
  @IsString()
  @IsOptional()
  objective?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateKeyResultDto)
  @IsOptional()
  keyResults?: CreateKeyResultDto[];

  @IsEnum(PerformanceStatus)
  @IsOptional()
  status?: PerformanceStatus;
}

export interface KeyResultResponse {
  id: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  status: PerformanceStatus;
}

export interface OKRResponse {
  id: string;
  ownerId: string;
  teamId?: string;
  scope: KPIScope;
  period: string;
  objective: string;
  keyResults: KeyResultResponse[];
  status: PerformanceStatus;
  createdAt: Date;
}
