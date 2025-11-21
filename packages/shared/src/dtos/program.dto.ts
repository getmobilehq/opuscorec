import { IsString, IsEnum, IsOptional, IsArray } from 'class-validator';

export enum ProgramStatus {
  DRAFT = 'DRAFT',
  MOBILIZING = 'MOBILIZING',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
}

export class CreateProgramDto {
  @IsString()
  name!: string;

  @IsString()
  sponsorId!: string;

  @IsString()
  managerId!: string;

  @IsString()
  @IsOptional()
  scope?: string;
}

export class UpdateProgramDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  sponsorId?: string;

  @IsString()
  @IsOptional()
  managerId?: string;

  @IsString()
  @IsOptional()
  scope?: string;

  @IsEnum(ProgramStatus)
  @IsOptional()
  status?: ProgramStatus;
}

export class ProgramIntakeDto {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  objectives?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  impactedTeams?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  impactedSystems?: string[];
}

export interface ProgramSummary {
  id: string;
  name: string;
  status: ProgramStatus;
}

export interface ProgramResponse {
  id: string;
  name: string;
  sponsorId: string;
  managerId: string;
  scope?: string;
  status: ProgramStatus;
  createdAt: Date;
}

export interface ProgramDraft {
  program: CreateProgramDto;
  suggestedWorkstreams: string[];
  suggestedWorkshops: WorkshopSuggestion[];
  boilerplate: Record<string, any>;
}

export interface WorkshopSuggestion {
  type: string;
  rationale: string;
}

export class CreateWorkstreamDto {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  leadId?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
