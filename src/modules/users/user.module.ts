import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/common/modules/prisma.module';
import { UserResolver } from './graphql/resolvers/user.resolver';
import { UserService } from './services/user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  providers: [UserResolver, UserService],
  exports: [UserService], 
})
export class UserModule {}
