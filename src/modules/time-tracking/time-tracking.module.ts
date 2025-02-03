import { Module } from '@nestjs/common';
import { TimeTrackingResolver } from './graphql/resolvers/time-tracking.resolver';
import { TimeTrackingService } from './services/time-tracking.service';
import { PrismaModule } from 'src/common/modules/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TimeTrackingResolver, TimeTrackingService],
})
export class TimeTrackingModule {}
