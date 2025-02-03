import { User } from "src/modules/users/entities/user.entity";
import { UserResponseDto } from "./user-response.dto";

export class AuthResponse {
  // @ApiProperty({ description: 'JWT token for authentication' })
  token: string;
  // @ApiProperty({ description: 'User information' })
  user: UserResponseDto
}