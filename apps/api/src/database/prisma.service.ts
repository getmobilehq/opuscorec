import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@opuscore/database';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Database connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🔌 Database disconnected');
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Cannot clean database in production');
    }

    // Clean in reverse order of dependencies
    const models = Reflect.ownKeys(this).filter(
      (key) => typeof key === 'string' && key[0] !== '_' && key[0] !== '$',
    );

    for (const modelKey of models) {
      const model = this[modelKey as string];
      if (model && typeof model.deleteMany === 'function') {
        await model.deleteMany();
      }
    }
  }
}
