import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateItemInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsNumber()
  quantityUnits: number;
}
