import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Item } from '../../entities/item.entity';
import { CreateItemInput } from '../dto/create-item.input';
import { ItemsService } from '../../services/items.service';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  createItem(@Args('createItemInput') createItemInput: CreateItemInput) {
    return this.itemsService.createItem(createItemInput);
  }

  @Query(() => [Item], { name: 'items' })
  findAll() {
    return this.itemsService.findAll();
  }

  // @Query(() => Item, { name: 'item' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.itemsService.findOne(id);
  // }

  // @Mutation(() => Item)
  // updateItem(@Args('updateItemInput') updateItemInput: UpdateItemInput) {
  //   return this.itemsService.update(updateItemInput.id, updateItemInput);
  // }

  // @Mutation(() => Item)
  // removeItem(@Args('id', { type: () => Int }) id: number) {
  //   return this.itemsService.remove(id);
  // }
}
