import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PrismaService } from '../../database/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOKRDto, UpdateOKRDto } from '@opuscore/shared';

@ApiTags('OKR')
@Controller('okrs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OKRsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async findAll(
    @Query('ownerId') ownerId?: string,
    @Query('teamId') teamId?: string,
    @Query('scope') scope?: string,
    @Query('period') period?: string,
  ) {
    return this.prisma.oKR.findMany({
      where: {
        ...(ownerId && { ownerId }),
        ...(teamId && { teamId }),
        ...(scope && { scope: scope as any }),
        ...(period && { period }),
      },
      include: {
        keyResults: true,
      },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prisma.oKR.findUnique({
      where: { id },
      include: {
        keyResults: true,
      },
    });
  }

  @Post()
  async create(@Body() dto: CreateOKRDto) {
    return this.prisma.oKR.create({
      data: {
        ownerId: dto.ownerId,
        teamId: dto.teamId,
        scope: dto.scope as any,
        period: dto.period,
        objective: dto.objective,
        keyResults: {
          create: dto.keyResults.map((kr) => ({
            description: kr.description,
            targetValue: kr.targetValue,
            unit: kr.unit,
          })),
        },
      },
      include: {
        keyResults: true,
      },
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateOKRDto) {
    return this.prisma.oKR.update({
      where: { id },
      data: {
        ...(dto.objective && { objective: dto.objective }),
        ...(dto.status && { status: dto.status as any }),
      },
    });
  }
}
