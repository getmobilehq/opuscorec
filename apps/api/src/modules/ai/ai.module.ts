import { Module } from '@nestjs/common';
import { AIController } from './ai.controller';
import { BAUModule } from '../bau/bau.module';
import { ProgramsModule } from '../programs/programs.module';

@Module({
  imports: [BAUModule, ProgramsModule],
  controllers: [AIController],
})
export class AIModule {}
