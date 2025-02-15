import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { Item } from '../../entities/item.entity';
import { CreateItemInput } from '../dto/create-item.input';
import { ItemsService } from '../../services/items.service';
import { Auth, GetUser } from 'src/modules/auth/decorators';
import { User } from 'src/modules/users/entities/user.entity';
import { ParseUUIDPipe } from '@nestjs/common';
import { UpdateItemInput } from '../dto';
import { PaginationArgs, SearchArgs } from 'src/modules/common/dto/args';

@Resolver(() => Item)
@Auth()
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item, { name: 'createItem' })
  async createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
    @GetUser() user: User) {
    return await this.itemsService.createItem(createItemInput, user);
  }

  @Query(() => [Item], { name: 'items' })
  findAll(
    @GetUser() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArs: SearchArgs
  ): Promise<Item[]> {       
    return this.itemsService.findAll(user.id, paginationArgs, searchArs);
  }

  @Query(() => Item, { name: 'item' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @GetUser() user: User
  ): Promise<Item> {
    return await this.itemsService.findOne(id, user.id);
  }

  @Mutation(() => Item)
  async updateItem(@Args('updateItemInput') updateItemInput: UpdateItemInput,
    @GetUser() user: User) {
    return await this.itemsService.update(user.id, updateItemInput);
  }

  @Mutation(() => Item)
  async removeItem(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @GetUser() user: User) {
    return await this.itemsService.remove(id, user.id);
  }
}
