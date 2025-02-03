import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/common/services/prisma.service';
import { User } from '../entities/user.entity';
import { Roles } from '../graphql/enums/roles.enum';
import { SignUpUserDto } from 'src/modules/auth/dto';
import { ValidRoles } from 'src/modules/auth/interfaces/valid-roles';
import { UpdateUserInput } from '../graphql/dto/inputs';

type UserWithoutPassword = Omit<User, 'password'>;

@Injectable()
export class UserService {
  private logger: Logger = new Logger('UserService');
  constructor(private readonly prisma: PrismaService) {}

  async createUser(signUpInput: SignUpUserDto): Promise<UserWithoutPassword> {
    try {
      const user = await this.prisma.user.create({
        data: {
          email: signUpInput.email,
          password: bcrypt.hashSync(signUpInput.password, 10),
          name: signUpInput.name,
          lastName: signUpInput.lastName,
          roles: [Roles.USER],
        },
      });
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async updateUser(userId: string, updateUserInput: UpdateUserInput): Promise<UserWithoutPassword> {
    try {
      await this.findOneById(updateUserInput.id); 
      return await this.prisma.user.update({
        where: { id: updateUserInput.id },
        data: {
          ...updateUserInput,
          lastUpdateById: userId,
        },
        include: {
          lastUpdateBy: true,
        },
      });
    } catch (error) { 
      this.handleDBErrors(error);
    } 
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.prisma.user.findUniqueOrThrow({ where: { email } });
    } catch (error) {
      this.handleDBErrors({
        code: 'err--01',
        detail: `Email ${email} not found`,
      });
    }
  }

  async findOneById(id: string): Promise<User> {
    try {
      return await this.prisma.user.findUniqueOrThrow({ where: { id } });
    } catch (error) {
      this.handleDBErrors({
        code: 'err--01',
        detail: `Id ${id} not found`,
      });
    }
  }

  async findAll(roles: ValidRoles[]): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: roles.length > 0
        ? {
            roles: {
              hasSome: roles,
            },
          }
        : {}, // Si no hay roles, no se aplica ningún filtro
      include: {
        lastUpdateBy: true,
      },
    });
  }

  async blockUser(id: string, user: User): Promise<User> {
    await this.findOneById(id);
    return await this.prisma.user.update({
      where: { id },
      data: { 
        isActive: false, 
        lastUpdateById: user.id,
      },
      include: {
        lastUpdateBy: true,
      }
    });
  }

  private handleDBErrors(error: any): never {
    this.logger.error(error);
    if (error.code === 'P2002') {
      throw new ConflictException('Email already exists');
    }

    if (error.code === 'err--01') {
      throw new NotFoundException(error.detail);
    }

    throw new BadRequestException('An unexpected error occurred');
  }
}
