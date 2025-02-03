import { OmitType } from "@nestjs/graphql";
import { User } from "src/modules/users/entities/user.entity";

export class UserResponseDto extends OmitType(User, ['password'] as const) {}