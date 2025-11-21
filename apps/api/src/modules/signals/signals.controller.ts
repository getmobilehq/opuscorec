import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SignalsService } from './signals.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Signals')
@Controller('signals')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SignalsController {
  constructor(private signalsService: SignalsService) {}

  @Get()
  @ApiOperation({ summary: 'List recent signals emitted by the platform' })
  @ApiQuery({ name: 'type', required: false })
  @ApiQuery({ name: 'since', required: false })
  async findAll(@Query('type') type?: string, @Query('since') since?: string) {
    return this.signalsService.findAll({
      type,
      since: since ? new Date(since) : undefined,
    });
  }

  @Get('feed')
  @ApiOperation({ summary: 'Get activity feed' })
  @ApiQuery({ name: 'limit', required: false })
  async getActivityFeed(@Query('limit') limit?: number) {
    return this.signalsService.getActivityFeed(limit);
  }
}
