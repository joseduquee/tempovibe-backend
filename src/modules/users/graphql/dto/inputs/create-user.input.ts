import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Roles } from "../../enums/roles.enum";

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  password: string;

  @Field(() => [Roles], { defaultValue: [Roles.USER] })
  @IsArray()
  @IsOptional()
  roles: Roles[];
}