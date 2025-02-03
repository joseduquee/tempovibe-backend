import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { TypeTimeTracking } from '../graphql/enums/type-time-tracking.enum';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

@ObjectType()
export class TimeTracking {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @Field(() => TypeTimeTracking)
  type: TypeTimeTracking;

  @Field()
  @IsNotEmpty()
  @IsDate()
  timestamp: Date;
}
