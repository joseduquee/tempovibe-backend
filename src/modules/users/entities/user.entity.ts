import { ObjectType, Field, ID } from "@nestjs/graphql";
import { TimeTracking } from "../../time-tracking/entities/time-tracking.entity";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { Item } from "src/modules/items/entities/item.entity";

@ObjectType()
export class User {
  @Field(() => ID)
  @IsNotEmpty()
  @IsString()
  id: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @Field(() => [String])
  @IsNotEmpty()
  roles: string[];

  @Field(() => Boolean)
  @IsBoolean()
  isActive: boolean;

  @Field(() => [TimeTracking], { nullable: 'itemsAndList' })
  @IsOptional()
  timeTrackings?: TimeTracking[];

  // @Field(() => [Item], { nullable: true })
  @IsOptional()
  items?: Item[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsString()
  lastUpdateById?: string;

  @Field(() => User, { nullable: true })
  @IsOptional()
  lastUpdateBy?: User;
}