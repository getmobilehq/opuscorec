import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BAUService } from './bau.service';
import { CreateBAUProcessDto, UpdateBAUProcessDto } from '@opuscore/shared';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('BAU')
@Controller('bau/processes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BAUController {
  constructor(private bauService: BAUService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new BAU process' })
  @ApiResponse({ status: 201, description: 'BAU process created' })
  async create(@Body() dto: CreateBAUProcessDto, @Request() req: any) {
    return this.bauService.create(dto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'List BAU processes' })
  @ApiQuery({ name: 'teamId', required: false })
  @ApiQuery({ name: 'status', required: false, enum: ['draft', 'active', 'archived'] })
  @ApiQuery({ name: 'q', required: false, description: 'Text search' })
  async findAll(
    @Query('teamId') teamId?: string,
    @Query('status') status?: string,
    @Query('q') search?: string,
  ) {
    return this.bauService.findAll({ teamId, status, search });
  }

  @Get('search')
  @ApiOperation({ summary: 'Search BAU processes' })
  @ApiQuery({ name: 'q', required: true })
  @ApiQuery({ name: 'teamId', required: false })
  async search(@Query('q') query: string, @Query('teamId') teamId?: string) {
    return this.bauService.searchBAU(query, teamId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a BAU process by id' })
  @ApiResponse({ status: 200, description: 'BAU process found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findOne(@Param('id') id: string) {
    return this.bauService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a BAU process' })
  @ApiResponse({ status: 200, description: 'BAU process updated' })
  async update(@Param('id') id: string, @Body() dto: UpdateBAUProcessDto, @Request() req: any) {
    return this.bauService.update(id, dto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a BAU process' })
  @ApiResponse({ status: 204, description: 'BAU process deleted' })
  async delete(@Param('id') id: string) {
    await this.bauService.delete(id);
    return { success: true };
  }

  @Get(':id/versions')
  @ApiOperation({ summary: 'List versions of a BAU process' })
  async getVersions(@Param('id') id: string) {
    return this.bauService.getVersions(id);
  }
}
