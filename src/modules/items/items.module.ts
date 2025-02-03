import { Module } from '@nestjs/common';
import { ItemsResolver } from './graphql/resolvers/items.resolver';
import { ItemsService } from './services/items.service';

@Module({
  providers: [ItemsResolver, ItemsService],
})
export class ItemsModule {}
