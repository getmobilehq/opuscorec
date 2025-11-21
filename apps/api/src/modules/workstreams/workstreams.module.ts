import { Module } from '@nestjs/common';
import { WorkstreamsController } from './workstreams.controller';

@Module({
  controllers: [WorkstreamsController],
})
export class WorkstreamsModule {}
