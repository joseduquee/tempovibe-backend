import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../users/user.module';
import { ItemsModule } from '../items/items.module';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [ConfigModule, UserModule, ItemsModule],
})
export class SeedModule {}
