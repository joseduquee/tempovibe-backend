import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthResponse, SignInUserDto, SignUpUserDto } from './dto';
import { UserService } from '../users/services/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

    private getJwtToken(jwtPayload: JwtPayload) {
      return this.jwtService.sign({ 
        id: jwtPayload.id, 
        name: jwtPayload.name,
        email: jwtPayload.email,
        lastName: jwtPayload.lastName
      })
    }
  
    async signup(signupInput: SignUpUserDto): Promise<AuthResponse> {
      
      const user = await this.userService.createUser(signupInput);
      const token = this.getJwtToken(user);
  
      return { token, user};
    }

    async signin({ email, password }: SignInUserDto): Promise<AuthResponse> {
      const userLogged = await this.userService.findOneByEmail(email);
      
      if(!bcrypt.compareSync(password, userLogged.password)) {
        throw new BadRequestException('Invalid credentials');
      }

      const { password: _, ...user } = userLogged;
      const token = this.getJwtToken(user);

      return { token, user};
    }

    async checkAuthStatus(user: User): Promise<AuthResponse> {
      const { password, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword,
        token: this.getJwtToken( user )
      }
    }
}
