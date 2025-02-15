import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/modules/prisma.module';
import { UserResolver } from './graphql/resolvers/user.resolver';
import { UserService } from './services/user.service';
import { AuthModule } from '../auth/auth.module';
import { ItemsModule } from '../items/items.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule), ItemsModule],
  providers: [UserResolver, UserService],
  exports: [UserService], 
})
export class UserModule {}
