import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

// Core modules
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

// Domain modules
import { BAUModule } from './modules/bau/bau.module';
import { ProgramsModule } from './modules/programs/programs.module';
import { WorkstreamsModule } from './modules/workstreams/workstreams.module';
import { WorkshopsModule } from './modules/workshops/workshops.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { KPIsModule } from './modules/kpis/kpis.module';
import { OKRsModule } from './modules/okrs/okrs.module';
import { SignalsModule } from './modules/signals/signals.module';
import { MetricsModule } from './modules/metrics/metrics.module';
import { DashboardsModule } from './modules/dashboards/dashboards.module';
import { AIModule } from './modules/ai/ai.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),

    // Core
    DatabaseModule,
    AuthModule,
    UsersModule,

    // Domain modules
    BAUModule,
    ProgramsModule,
    WorkstreamsModule,
    WorkshopsModule,
    TasksModule,
    KPIsModule,
    OKRsModule,
    SignalsModule,
    MetricsModule,
    DashboardsModule,
    AIModule,
  ],
})
export class AppModule {}
