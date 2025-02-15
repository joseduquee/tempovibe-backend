import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateItemInput, UpdateItemInput } from '../graphql/dto';
import { Item } from '../entities/item.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { PaginationArgs, SearchArgs } from 'src/modules/common/dto/args';
import { Prisma } from '@prisma/client';

@Injectable()
export class ItemsService {
  private logger: Logger = new Logger('UserService');
  constructor(private readonly prisma: PrismaService) {}

  async createItem(
    createItemInput: CreateItemInput,
    user: User,
  ): Promise<Item> {
    try {
      const item = await this.prisma.item.create({
        data: {
          ...createItemInput,
          userId: user.id,
        },
        include: { user: true },
      });
      return item;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(
    userId: string,
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<Item[]> {
    const { offset, limit } = paginationArgs;
    const { search } = searchArgs;

    const where: Prisma.ItemWhereInput = { userId };

    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    //* Mejora con mas propiedades
    // if (search) {
    //   where.OR = [
    //     { name: { contains: search, mode: 'insensitive' } },
    //     { description: { contains: search, mode: 'insensitive' } }
    //   ];
    // }

    return await this.prisma.item.findMany({
      where,
      include: { user: true },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string, userId: string): Promise<Item> {
    try {
      return await this.prisma.item.findUniqueOrThrow({
        where: {
          id,
          userId,
        },
        include: { user: true },
      });
    } catch (error) {
      throw new BadRequestException('Item not found');
    }
  }

  async update(
    userId: string,
    updateItemInput: UpdateItemInput,
  ): Promise<Item> {
    try {
      await this.findOne(updateItemInput.id, userId);
      return await this.prisma.item.update({
        where: { id: updateItemInput.id },
        data: {
          ...updateItemInput,
        },
        include: {
          user: true,
        },
      });
    } catch (error) {
      throw new BadRequestException('Item not found or could not be updated');
    }
  }

  async remove(id: string, userId: string): Promise<Item> {
    try {
      return await this.prisma.item.delete({
        where: {
          id,
          userId,
        },
        include: { user: true },
      });
    } catch (error) {
      throw new BadRequestException('Item not found');
    }
  }

  async itemCountByUser(userId: string): Promise<number> {
    return await this.prisma.item.count({
      where: { userId },
    });
  }

  private handleDBErrors(error: any): never {
    this.logger.error(error);
    // if (error.code === 'P2002') {
    //   throw new ConflictException('Email already exists');
    // }

    // if (error.code === 'err--01') {
    //   throw new NotFoundException(error.detail);
    // }

    throw new BadRequestException('An unexpected error occurred');
  }
}
