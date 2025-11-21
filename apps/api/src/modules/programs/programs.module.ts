import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { SignalsModule } from '../signals/signals.module';

@Module({
  imports: [SignalsModule],
  providers: [ProgramsService],
  controllers: [ProgramsController],
  exports: [ProgramsService],
})
export class ProgramsModule {}
