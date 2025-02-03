import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { TypeTimeTracking } from '../../enums/type-time-tracking.enum';
import { IsUUID } from 'class-validator';

@InputType()
export class CreateTimeTrackingInput {
  @Field(() => ID)
  @IsUUID()
  userId: string;

  @Field(() => TypeTimeTracking)
  type: TypeTimeTracking;
}
