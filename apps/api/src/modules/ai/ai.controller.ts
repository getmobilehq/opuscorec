import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProgramIntakeDto, BAUDraftRequestDto } from '@opuscore/shared';

@ApiTags('AI')
@Controller('ai')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AIController {
  @Post('generate-program')
  @ApiOperation({ summary: 'AI-generate a program boilerplate from intake' })
  async generateProgram(@Body() dto: ProgramIntakeDto) {
    // TODO: Implement AI program generation
    return {
      program: {
        name: dto.name,
        sponsorId: 'placeholder',
        managerId: 'placeholder',
        scope: dto.description,
      },
      suggestedWorkstreams: ['Workstream 1', 'Workstream 2'],
      suggestedWorkshops: [
        { type: 'kickoff', rationale: 'Initialize the program' },
        { type: 'discovery', rationale: 'Understand requirements' },
      ],
      boilerplate: {
        overview: dto.description,
        objectives: dto.objectives,
      },
    };
  }

  @Post('suggest-workshops')
  @ApiOperation({ summary: 'AI-suggest workshops for a program' })
  async suggestWorkshops(@Body() body: { programId: string }) {
    // TODO: Implement AI workshop suggestions
    return [
      { type: 'kickoff', rationale: 'Program initialization' },
      { type: 'discovery', rationale: 'Requirements gathering' },
      { type: 'design', rationale: 'Solution design' },
    ];
  }

  @Post('draft-bau')
  @ApiOperation({ summary: 'Draft BAU process from unstructured signals' })
  async draftBAU(@Body() dto: BAUDraftRequestDto) {
    // TODO: Implement AI BAU drafting
    return {
      draft: {
        name: 'Detected BAU Process',
        description: `Process derived from signals: ${dto.signals.join(', ')}`,
        ownerId: 'placeholder',
        teamId: dto.teamId || 'placeholder',
      },
      confidence: 0.75,
    };
  }
}
