import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TimeTracking } from '../../entities/time-tracking.entity';
import { TimeTrackingService } from '../../services/time-tracking.service';
import { CreateTimeTrackingInput, UpdateTimeTrackingInput } from '../dto/inputs';

@Resolver(() => TimeTracking)
export class TimeTrackingResolver {
  constructor(private readonly timeTrackingService: TimeTrackingService) {}

  @Mutation(() => TimeTracking)
  createTimeTracking(@Args('createTimeTrackingInput') createTimeTrackingInput: CreateTimeTrackingInput) {
    return this.timeTrackingService.create(createTimeTrackingInput);
  }

  @Query(() => [TimeTracking], { name: 'timeTracking' })
  findAll() {
    return this.timeTrackingService.findAll();
  }

  // @Query(() => TimeTracking, { name: 'timeTracking' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.timeTrackingService.findOne(id);
  // }

  // @Mutation(() => TimeTracking)
  // removeTimeTracking(@Args('id', { type: () => Int }) id: number) {
  //   return this.timeTrackingService.remove(id);
  // }
}
