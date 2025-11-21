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

    await this.prisma.bAUProcessVersion.create({
      data: {
        bauProcessId: bauProcess.id,
        version: 1,
        content: JSON.stringify({
          name: data.name,
          description: data.description,
          systemIds: data.systemIds || [],
        }),
        createdById: userId,
      },
    });

    await this.signalsService.createSignal({
      type: SIGNAL_TYPES.BAU_CREATED,
      source: 'bau_service',
      payload: {
        bauProcessId: bauProcess.id,
        name: bauProcess.name,
        teamId: bauProcess.teamId,
      },
    });

    return {
      ...bauProcess,
      systemIds: JSON.parse(bauProcess.systemIds),
    } as BAUProcessResponse;
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
        { name: { contains: filters.search } },
        { description: { contains: filters.search } },
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

    return {
      ...bauProcess,
      systemIds: JSON.parse(bauProcess.systemIds),
    } as any;
  }

  async update(id: string, data: UpdateBAUProcessDto, userId: string): Promise<BAUProcessResponse> {
    const existing = await this.findById(id);

    const updateData: any = { version: existing.version + 1 };
    if (data.name) updateData.name = data.name;
    if (data.description) updateData.description = data.description;
    if (data.ownerId) updateData.ownerId = data.ownerId;
    if (data.teamId) updateData.teamId = data.teamId;
    if (data.systemIds) updateData.systemIds = JSON.stringify(data.systemIds);
    if (data.status) updateData.status = data.status;

    const updated = await this.prisma.bAUProcess.update({
      where: { id },
      data: updateData,
    });

    await this.prisma.bAUProcessVersion.create({
      data: {
        bauProcessId: updated.id,
        version: updated.version,
        content: JSON.stringify({
          name: updated.name,
          description: updated.description,
          systemIds: JSON.parse(updated.systemIds),
        }),
        createdById: userId,
      },
    });

    await this.signalsService.createSignal({
      type: SIGNAL_TYPES.BAU_UPDATED,
      source: 'bau_service',
      payload: {
        bauProcessId: updated.id,
        name: updated.name,
        version: updated.version,
      },
    });

    return {
      ...updated,
      systemIds: JSON.parse(updated.systemIds),
    } as BAUProcessResponse;
  }

  async getVersions(id: string) {
    await this.findById(id);

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
    await this.findById(id);

    await this.prisma.bAUProcess.delete({
      where: { id },
    });

    await this.signalsService.createSignal({
      type: SIGNAL_TYPES.BAU_ARCHIVED,
      source: 'bau_service',
      payload: {
        bauProcessId: id,
      },
    });
  }

  async linkToProgram(bauProcessId: string, programId: string, linkType = 'impacted'): Promise<void> {
    await this.findById(bauProcessId);

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
        { name: { contains: query } },
        { description: { contains: query } },
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
