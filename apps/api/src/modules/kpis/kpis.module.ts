import { Module } from '@nestjs/common';
import { KPIsController } from './kpis.controller';

@Module({
  controllers: [KPIsController],
})
export class KPIsModule {}
