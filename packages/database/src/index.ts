import { PrismaClient } from '@prisma/client';

export * from '@prisma/client';

// Singleton instance
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Export utility functions
export async function disconnect() {
  await prisma.$disconnect();
}

export async function connect() {
  await prisma.$connect();
}
