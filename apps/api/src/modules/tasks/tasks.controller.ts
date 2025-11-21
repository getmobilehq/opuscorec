import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PrismaService } from '../../database/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateTaskDto, UpdateTaskDto } from '@opuscore/shared';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TasksController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async findAll(@Query('assignedTo') assignedTo?: string, @Query('status') status?: string) {
    return this.prisma.task.findMany({
      where: {
        ...(assignedTo && { assignedToId: assignedTo }),
        ...(status && { status: status as any }),
      },
    });
  }

  @Post()
  async create(@Body() dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        type: dto.type,
        title: dto.title,
        description: dto.description,
        assignedToId: dto.assignedToId,
        programId: dto.programId,
        payload: dto.payload,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
      },
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: {
        ...(dto.assignedToId !== undefined && { assignedToId: dto.assignedToId }),
        ...(dto.status && { status: dto.status as any }),
        ...(dto.payload && { payload: dto.payload }),
        ...(dto.dueDate && { dueDate: new Date(dto.dueDate) }),
      },
    });
  }
}
