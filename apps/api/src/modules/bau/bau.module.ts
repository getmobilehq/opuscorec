import { Module } from '@nestjs/common';
import { BAUService } from './bau.service';
import { BAUController } from './bau.controller';
import { SignalsModule } from '../signals/signals.module';

@Module({
  imports: [SignalsModule],
  providers: [BAUService],
  controllers: [BAUController],
  exports: [BAUService],
})
export class BAUModule {}
