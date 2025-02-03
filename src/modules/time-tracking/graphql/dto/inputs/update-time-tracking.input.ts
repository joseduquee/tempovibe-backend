import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateTimeTrackingInput } from './create-time-tracking.input';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateTimeTrackingInput extends PartialType(CreateTimeTrackingInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
