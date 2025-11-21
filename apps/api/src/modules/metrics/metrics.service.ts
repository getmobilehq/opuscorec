import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateMetricEventDto, MetricEventResponse } from '@opuscore/shared';

@Injectable()
export class MetricsService {
  constructor(private prisma: PrismaService) {}

  async createMetricEvent(data: CreateMetricEventDto): Promise<MetricEventResponse> {
    const event = await this.prisma.metricEvent.create({
      data: {
        eventType: data.eventType,
        sourceId: data.sourceId,
        ownerId: data.ownerId,
        teamId: data.teamId,
        kpiId: undefined, // Can be set via separate logic
        value: data.value,
        metadata: data.metadata,
      },
    });

    return event as MetricEventResponse;
  }

  async findAll(filters?: {
    eventType?: string;
    sourceId?: string;
    ownerId?: string;
    teamId?: string;
    kpiId?: string;
    since?: Date;
    limit?: number;
  }) {
    const where: any = {};

    if (filters?.eventType) {
      where.eventType = filters.eventType;
    }

    if (filters?.sourceId) {
      where.sourceId = filters.sourceId;
    }

    if (filters?.ownerId) {
      where.ownerId = filters.ownerId;
    }

    if (filters?.teamId) {
      where.teamId = filters.teamId;
    }

    if (filters?.kpiId) {
      where.kpiId = filters.kpiId;
    }

    if (filters?.since) {
      where.createdAt = {
        gte: filters.since,
      };
    }

    return this.prisma.metricEvent.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: filters?.limit || 100,
    });
  }

  async aggregateByType(eventType: string, period: string) {
    // Aggregate metric events by type
    const events = await this.prisma.metricEvent.findMany({
      where: {
        eventType,
      },
      select: {
        value: true,
        createdAt: true,
        teamId: true,
      },
    });

    // Group by team
    const byTeam = events.reduce((acc, event) => {
      const team = event.teamId || 'unassigned';
      if (!acc[team]) {
        acc[team] = { count: 0, total: 0 };
      }
      acc[team].count += 1;
      acc[team].total += event.value || 0;
      return acc;
    }, {} as Record<string, { count: number; total: number }>);

    return byTeam;
  }
}
