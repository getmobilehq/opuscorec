import { Module } from '@nestjs/common';
import { OKRsController } from './okrs.controller';

@Module({
  controllers: [OKRsController],
})
export class OKRsModule {}
