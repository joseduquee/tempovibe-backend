import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/common/services/prisma.service';
import { SEED_ITEMS, SEED_USERS } from './data/seed-data';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SeedService {
  private isProd: boolean;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.isProd = configService.get('STAGE') === 'prod';
  }

  async runSeed(): Promise<boolean> {
    if (this.isProd) {
      throw new Error('You cannot run seed in production');
    }

    //* Clean up the database
    await this.deleteDatabase();

    //* Create users
    await this.loadUsers();

    //* Create Items
    await this.loadItems();

    return true;
  }

  private async deleteDatabase(): Promise<void> {
    try {
      await this.prisma.$transaction([
        this.prisma.item.deleteMany(),
        this.prisma.user.deleteMany(),
      ]);
    } catch (error) {
      throw new Error(`Error deleting database: ${error.message}`);
    }
  }

  private async loadUsers(): Promise<User> {
    const usersWithHash = await Promise.all(
      SEED_USERS.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      })),
    );

    const users = await this.prisma.user.createMany({
      data: usersWithHash,
    });
    return users[0];
  }

  private async loadItems(): Promise<void> {
    const users = await this.prisma.user.findMany();
    if (users.length === 0) {
      throw new Error('Theres no users in the database');
    }

    const itemsWithUsers = SEED_ITEMS.map((item) => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      return {
        ...item,
        userId: randomUser.id,
      };
    });

    await this.prisma.item.createMany({
      data: itemsWithUsers,
      skipDuplicates: true,
    });
  }
}
