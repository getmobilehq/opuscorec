import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PrismaService } from '../../database/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateWorkshopDto } from '@opuscore/shared';

@ApiTags('Workshops')
@Controller('programs/:id/workshops')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WorkshopsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async findAll(@Param('id') programId: string) {
    return this.prisma.workshop.findMany({ where: { programId } });
  }

  @Post()
  async create(@Param('id') programId: string, @Body() dto: CreateWorkshopDto) {
    return this.prisma.workshop.create({
      data: {
        programId,
        type: dto.type,
        name: dto.name,
        description: dto.description,
        scheduledFor: dto.scheduledFor ? new Date(dto.scheduledFor) : null,
      },
    });
  }
}
