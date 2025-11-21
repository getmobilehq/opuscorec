import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PrismaService } from '../../database/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateKPIDto, UpdateKPIDto } from '@opuscore/shared';

@ApiTags('KPI')
@Controller('kpis')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class KPIsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async findAll(
    @Query('ownerId') ownerId?: string,
    @Query('teamId') teamId?: string,
    @Query('scope') scope?: string,
  ) {
    return this.prisma.kPI.findMany({
      where: {
        ...(ownerId && { ownerId }),
        ...(teamId && { teamId }),
        ...(scope && { scope: scope as any }),
      },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prisma.kPI.findUnique({ where: { id } });
  }

  @Post()
  async create(@Body() dto: CreateKPIDto) {
    return this.prisma.kPI.create({
      data: {
        name: dto.name,
        description: dto.description,
        ownerId: dto.ownerId,
        teamId: dto.teamId,
        scope: dto.scope as any,
        targetValue: dto.targetValue,
        unit: dto.unit,
        period: dto.period,
      },
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateKPIDto) {
    return this.prisma.kPI.update({
      where: { id },
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.targetValue !== undefined && { targetValue: dto.targetValue }),
        ...(dto.currentValue !== undefined && { currentValue: dto.currentValue }),
        ...(dto.status && { status: dto.status as any }),
      },
    });
  }
}
