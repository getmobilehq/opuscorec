import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateSignalDto, SignalResponse } from '@opuscore/shared';

@Injectable()
export class SignalsService {
  constructor(private prisma: PrismaService) {}

  async createSignal(data: CreateSignalDto & { createdBy?: string }): Promise<SignalResponse> {
    const signal = await this.prisma.signal.create({
      data: {
        type: data.type,
        source: data.source,
        payload: data.payload,
        createdBy: data.createdBy,
      },
    });

    return signal as SignalResponse;
  }

  async findAll(filters?: { type?: string; since?: Date; limit?: number }) {
    const where: any = {};

    if (filters?.type) {
      where.type = filters.type;
    }

    if (filters?.since) {
      where.createdAt = {
        gte: filters.since,
      };
    }

    return this.prisma.signal.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: filters?.limit || 100,
    });
  }

  async getActivityFeed(limit = 50) {
    return this.prisma.signal.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }
}
