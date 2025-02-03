import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateItemInput, UpdateItemInput } from '../graphql/dto';
import { Item } from '../entities/item.entity';

@Injectable()
export class ItemsService {
  private logger: Logger = new Logger('UserService');
  constructor(private readonly prisma: PrismaService) {}

  async createItem(createItemInput: CreateItemInput): Promise<Item> {
    try {
      const item = await this.prisma.item.create({
        data: createItemInput,
        include: { user: true },
      });
      return item;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(): Promise<Item[]> {
    return await this.prisma.item.findMany({ 
      include: { user: true },
     });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} item`;
  // }

  // update(id: number, updateItemInput: UpdateItemInput) {
  //   return `This action updates a #${id} item`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} item`;
  // }

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
