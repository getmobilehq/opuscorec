import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { MetricsService } from './metrics.service';
import { CreateMetricEventDto } from '@opuscore/shared';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Metrics')
@Controller('metrics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MetricsController {
  constructor(private metricsService: MetricsService) {}

  @Post('events')
  @ApiOperation({ summary: 'Submit a metric or KPI/OKR progress event' })
  @ApiResponse({ status: 202, description: 'Event accepted' })
  async createEvent(@Body() dto: CreateMetricEventDto) {
    return this.metricsService.createMetricEvent(dto);
  }

  @Get('events')
  @ApiOperation({ summary: 'Get metric events' })
  async getEvents(
    @Query('eventType') eventType?: string,
    @Query('sourceId') sourceId?: string,
    @Query('ownerId') ownerId?: string,
    @Query('teamId') teamId?: string,
  ) {
    return this.metricsService.findAll({
      eventType,
      sourceId,
      ownerId,
      teamId,
    });
  }
}
