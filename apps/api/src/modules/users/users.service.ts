import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { User } from '@opuscore/database';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        team: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: {
    email: string;
    name: string;
    password: string;
    role?: string;
    teamId?: string;
  }): Promise<User> {
    const existingUser = await this.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
        role: data.role as any || 'USER',
        teamId: data.teamId,
      },
    });
  }

  async findAll(filters?: { teamId?: string; role?: string }) {
    return this.prisma.user.findMany({
      where: {
        ...(filters?.teamId && { teamId: filters.teamId }),
        ...(filters?.role && { role: filters.role as any }),
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        teamId: true,
        team: {
          select: {
            id: true,
            name: true,
            department: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: string, data: Partial<User>) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
