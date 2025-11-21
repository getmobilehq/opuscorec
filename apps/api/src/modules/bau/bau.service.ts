import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import {
  CreateBAUProcessDto,
  UpdateBAUProcessDto,
  BAUProcessResponse,
  BAUProcessSummary,
} from '@opuscore/shared';
import { SignalsService } from '../signals/signals.service';
import { SIGNAL_TYPES } from '@opuscore/shared';

@Injectable()
export class BAUService {
  constructor(
    private prisma: PrismaService,
    private signalsService: SignalsService,
  ) {}

  async create(data: CreateBAUProcessDto, userId: string): Promise<BAUProcessResponse> {
    const bauProcess = await this.prisma.bAUProcess.create({
      data: {
        name: data.name,
        description: data.description,
        ownerId: data.ownerId,
        teamId: data.teamId,
        systemIds: JSON.stringify(data.systemIds || []),
        version: 1,
      },
    });

    // Create initial version
    await this.prisma.bAUProcessVersion.create({
      data: {
        bauProcessId: bauProcess.id,
        version: 1,
        content: JSON.stringify({
          name: data.name,
          description: data.description,
          systemIds: JSON.stringify(data.systemIds || []),
        },
        }),
        createdById: userId,
      },
    });

    // Emit signal
    await this.signalsService.createSignal({
      type: SIGNAL_TYPES.BAU_CREATED,
      source: 'bau_service',
      payload: {
        bauProcessId: bauProcess.id,
        name: bauProcess.name,
        teamId: bauProcess.teamId,
      },
    });

    return { ...bauProcess, systemIds: JSON.parse(bauProcess.systemIds) } as BAUProcessResponse;
  }

  async findAll(filters?: {
    teamId?: string;
    status?: string;
    search?: string;
  }): Promise<BAUProcessSummary[]> {
    const where: any = {};

    if (filters?.teamId) {
      where.teamId = filters.teamId;
    }

    if (filters?.status) {
      where.status = filters.status;
    }

    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const processes = await this.prisma.bAUProcess.findMany({
      where,
      select: {
        id: true,
        name: true,
        teamId: true,
        status: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return processes as BAUProcessSummary[];
  }

  async findById(id: string): Promise<BAUProcessResponse> {
    const bauProcess = await this.prisma.bAUProcess.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        team: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!bauProcess) {
      throw new NotFoundException('BAU Process not found');
    }

    return bauProcess as any;
  }

  async update(id: string, data: UpdateBAUProcessDto, userId: string): Promise<BAUProcessResponse> {
    const existing = await this.findById(id);

    const updated = await this.prisma.bAUProcess.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description && { description: data.description }),
        ...(data.ownerId && { ownerId: data.ownerId }),
        ...(data.teamId && { teamId: data.teamId }),
        ...(data.systemIds && { systemIds: data.systemIds }),
        ...(data.status && { status: data.status as any }),
        version: existing.version + 1,
      },
    });

    // Create new version
    await this.prisma.bAUProcessVersion.create({
      data: {
        bauProcessId: updated.id,
        version: updated.version,
        content: JSON.stringify({
          name: updated.name,
          description: updated.description,
          systemIds: updated.systemIds,
        },
        }),
        createdById: userId,
      },
    });

    // Emit signal
    await this.signalsService.createSignal({
      type: SIGNAL_TYPES.BAU_UPDATED,
      source: 'bau_service',
      payload: {
        bauProcessId: updated.id,
        name: updated.name,
        version: updated.version,
      },
    });

    return updated as BAUProcessResponse;
  }

  async getVersions(id: string) {
    await this.findById(id); // Verify exists

    return this.prisma.bAUProcessVersion.findMany({
      where: { bauProcessId: id },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        version: 'desc',
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.findById(id); // Verify exists

    await this.prisma.bAUProcess.delete({
      where: { id },
    });

    // Emit signal
    await this.signalsService.createSignal({
      type: SIGNAL_TYPES.BAU_ARCHIVED,
      source: 'bau_service',
      payload: {
        bauProcessId: id,
      },
    });
  }

  async linkToProgram(bauProcessId: string, programId: string, linkType = 'impacted'): Promise<void> {
    await this.findById(bauProcessId); // Verify BAU exists

    await this.prisma.programBAULink.create({
      data: {
        bauProcessId,
        programId,
        linkType,
      },
    });
  }

  async searchBAU(query: string, teamId?: string) {
    const where: any = {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
      status: 'ACTIVE',
    };

    if (teamId) {
      where.teamId = teamId;
    }

    return this.prisma.bAUProcess.findMany({
      where,
      select: {
        id: true,
        name: true,
        description: true,
        teamId: true,
      },
      take: 10,
    });
  }
}
