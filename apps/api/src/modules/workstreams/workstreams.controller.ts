import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PrismaService } from '../../database/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateWorkstreamDto } from '@opuscore/shared';

@ApiTags('Workstreams')
@Controller('programs/:id/workstreams')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WorkstreamsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async findAll(@Param('id') programId: string) {
    return this.prisma.workstream.findMany({ where: { programId } });
  }

  @Post()
  async create(@Param('id') programId: string, @Body() dto: CreateWorkstreamDto) {
    return this.prisma.workstream.create({
      data: {
        programId,
        name: dto.name,
        leadId: dto.leadId,
        description: dto.description,
      },
    });
  }
}
