import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ProgramsService } from './programs.service';
import { CreateProgramDto, UpdateProgramDto } from '@opuscore/shared';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Programs')
@Controller('programs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProgramsController {
  constructor(private programsService: ProgramsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new program' })
  async create(@Body() dto: CreateProgramDto) {
    return this.programsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List programs' })
  @ApiQuery({ name: 'status', required: false, enum: ['draft', 'mobilizing', 'active', 'closed'] })
  async findAll(@Query('status') status?: string) {
    return this.programsService.findAll({ status });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get program by id' })
  async findOne(@Param('id') id: string) {
    return this.programsService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a program' })
  async update(@Param('id') id: string, @Body() dto: UpdateProgramDto) {
    return this.programsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a program' })
  async delete(@Param('id') id: string) {
    await this.programsService.delete(id);
    return { success: true };
  }
}
