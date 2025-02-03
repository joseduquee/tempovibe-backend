import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class SignUpUserDto {
    
    @IsString()
    name: string;

    @IsString()
    lastName: string;

    @IsString()
    @IsEmail()
    email: string;
  
    @IsString()
    @IsStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
  })
    password: string;
  }