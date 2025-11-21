import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateProgramDto, UpdateProgramDto, ProgramResponse } from '@opuscore/shared';
import { SignalsService } from '../signals/signals.service';
import { SIGNAL_TYPES } from '@opuscore/shared';

@Injectable()
export class ProgramsService {
  constructor(
    private prisma: PrismaService,
    private signalsService: SignalsService,
  ) {}

  async create(data: CreateProgramDto): Promise<ProgramResponse> {
    const program = await this.prisma.program.create({
      data: {
        name: data.name,
        sponsorId: data.sponsorId,
        managerId: data.managerId,
        scope: data.scope,
        status: 'DRAFT',
      },
    });

    // Emit signal
    await this.signalsService.createSignal({
      type: SIGNAL_TYPES.PROGRAM_CREATED,
      source: 'programs_service',
      payload: {
        programId: program.id,
        name: program.name,
      },
    });

    return program as ProgramResponse;
  }

  async findAll(filters?: { status?: string }) {
    const where: any = {};

    if (filters?.status) {
      where.status = filters.status;
    }

    return this.prisma.program.findMany({
      where,
      select: {
        id: true,
        name: true,
        status: true,
        sponsor: {
          select: {
            id: true,
            name: true,
          },
        },
        manager: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: string): Promise<ProgramResponse> {
    const program = await this.prisma.program.findUnique({
      where: { id },
      include: {
        sponsor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        manager: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        workstreams: true,
        workshops: true,
        tasks: {
          where: {
            status: { not: 'DONE' },
          },
        },
      },
    });

    if (!program) {
      throw new NotFoundException('Program not found');
    }

    return program as any;
  }

  async update(id: string, data: UpdateProgramDto): Promise<ProgramResponse> {
    await this.findById(id); // Verify exists

    const updated = await this.prisma.program.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.sponsorId && { sponsorId: data.sponsorId }),
        ...(data.managerId && { managerId: data.managerId }),
        ...(data.scope && { scope: data.scope }),
        ...(data.status && { status: data.status as any }),
      },
    });

    // Emit signal
    await this.signalsService.createSignal({
      type: SIGNAL_TYPES.PROGRAM_UPDATED,
      source: 'programs_service',
      payload: {
        programId: updated.id,
        name: updated.name,
        status: updated.status,
      },
    });

    return updated as ProgramResponse;
  }

  async delete(id: string): Promise<void> {
    await this.findById(id); // Verify exists

    await this.prisma.program.delete({
      where: { id },
    });
  }
}
