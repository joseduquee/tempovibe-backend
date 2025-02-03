import { Controller, Get, Post, Body, Req, UseGuards, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse, SignInUserDto, SignUpUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';
import { Auth, GetRawHeaders, GetUser, RoleProtected } from './decorators';
import { IncomingHttpHeaders } from 'http';
import { ValidRoles } from './interfaces/valid-roles';
import { UserRoleGuard } from './guards/user-role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpUserDto: SignUpUserDto): Promise<AuthResponse> {
    return await this.authService.signup(signUpUserDto);
  }

  @Post('signin')
  async signIn(@Body() signInUserDto: SignInUserDto): Promise<AuthResponse> {
    return this.authService.signin(signInUserDto);
  }

  @Get('check-status')
  @Auth()
  async checkAuthStatus(@GetUser() user: User): Promise<AuthResponse> {
    return this.authService.checkAuthStatus(user);
  }
}
