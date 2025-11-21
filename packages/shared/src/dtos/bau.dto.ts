import { IsString, IsArray, IsEnum, IsOptional, IsInt } from 'class-validator';

export enum BAUProcessStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
}

export class CreateBAUProcessDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsString()
  ownerId!: string;

  @IsString()
  teamId!: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  systemIds?: string[];
}

export class UpdateBAUProcessDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  ownerId?: string;

  @IsString()
  @IsOptional()
  teamId?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  systemIds?: string[];

  @IsEnum(BAUProcessStatus)
  @IsOptional()
  status?: BAUProcessStatus;
}

export class BAUDraftRequestDto {
  @IsArray()
  @IsString({ each: true })
  signals!: string[];

  @IsString()
  @IsOptional()
  teamId?: string;
}

export interface BAUProcessSummary {
  id: string;
  name: string;
  teamId: string;
  status: BAUProcessStatus;
}

export interface BAUProcessResponse {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  teamId: string;
  systemIds: string[];
  status: BAUProcessStatus;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BAUProcessDraft {
  draft: CreateBAUProcessDto;
  confidence: number;
}
