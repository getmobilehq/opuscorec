import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PrismaService } from '../../database/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Dashboards')
@Controller('dashboards')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DashboardsController {
  constructor(private prisma: PrismaService) {}

  @Get('executive')
  @ApiOperation({ summary: 'Get executive dashboard view' })
  async getExecutiveDashboard(@Query('period') period?: string, @Query('orgUnit') orgUnit?: string) {
    // Fetch aggregated data for executive dashboard
    const programs = await this.prisma.program.findMany({
      select: {
        id: true,
        name: true,
        status: true,
        healthScore: true,
      },
    });

    const bauCoverage = await this.prisma.bAUProcess.count({
      where: { status: 'ACTIVE' },
    });

    const kpiStats = await this.prisma.kPI.groupBy({
      by: ['status'],
      _count: true,
    });

    const okrStats = await this.prisma.oKR.groupBy({
      by: ['status'],
      _count: true,
    });

    return {
      period: period || 'current',
      orgUnit: orgUnit || 'all',
      widgets: [
        {
          id: 'program-health',
          type: 'program_health',
          title: 'Program Health Summary',
          description: 'Overview of all programs by status',
          data: {
            programs: programs.length,
            byStatus: programs.reduce((acc, p) => {
              acc[p.status] = (acc[p.status] || 0) + 1;
              return acc;
            }, {} as Record<string, number>),
          },
        },
        {
          id: 'bau-coverage',
          type: 'bau_coverage',
          title: 'BAU Coverage',
          description: 'Number of documented BAU processes',
          data: {
            totalActive: bauCoverage,
          },
        },
        {
          id: 'kpi-performance',
          type: 'kpi_summary',
          title: 'KPI Performance',
          description: 'KPI status distribution',
          data: {
            byStatus: kpiStats.reduce((acc, stat) => {
              acc[stat.status] = stat._count;
              return acc;
            }, {} as Record<string, number>),
          },
        },
        {
          id: 'okr-performance',
          type: 'okr_summary',
          title: 'OKR Performance',
          description: 'OKR status distribution',
          data: {
            byStatus: okrStats.reduce((acc, stat) => {
              acc[stat.status] = stat._count;
              return acc;
            }, {} as Record<string, number>),
          },
        },
      ],
    };
  }
}
