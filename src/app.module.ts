import { Module } from '@nestjs/common';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { TimeTrackingModule } from './modules/time-tracking/time-tracking.module';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/modules/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { ItemsModule } from './modules/items/items.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    //* Se comenta porque es la parte basica sincrona
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   // debug: false,
    //   playground: false,
    //   plugins: [ApolloServerPluginLandingPageLocalDefault()],
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    // }),

    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ AuthModule ],
      inject: [ JwtService],
      useFactory: async( jwtService: JwtService ) => ({ 
        // debug: false,
        playground: false,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        context({ req }) {
          const token = req.headers.authorization?.replace('Bearer ', '');
          if(!token) throw new Error('No token provided');
          const payload = jwtService.decode(token);
          if(!payload) throw new Error('Invalid token');
        }
      }),
    }),

    TimeTrackingModule,
    UserModule,
    AuthModule,
    ItemsModule,
    PrismaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
