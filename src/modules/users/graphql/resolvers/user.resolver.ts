import { Args, Mutation, Resolver, Query, ID } from '@nestjs/graphql';
import { User } from "../../entities/user.entity";
import { UserService } from "../../services/user.service";
import { CreateUserInput, UpdateUserInput } from '../dto/inputs';
import { ParseUUIDPipe } from '@nestjs/common';
import { Auth, GetUser } from 'src/modules/auth/decorators';
import { ValidRoles } from 'src/modules/auth/interfaces/valid-roles';
import { ValidRolesArgs } from '../dto/args/roles.arg';

@Resolver(() => User)
@Auth()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.createUser(createUserInput);
  }

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @GetUser() user: User
  ){
    return await this.userService.updateUser(user.id, updateUserInput);
  }

  @Query(() => [User], { name: 'Users' })
  // Esta es la forma de autorizacion con roles
  @Auth(ValidRoles.developer)
  async findAll(
    // Los args son como query parms
    @Args() validRoles: ValidRolesArgs,
    // @GetUser() user: User
  ): Promise<User[]> {  
    // TODO: eliminar password del iser
    // console.log({ user});
      
    return await this.userService.findAll( validRoles.roles );
  }

  @Query(() => User, { name: 'User' })
  @Auth(ValidRoles.developer)
  async findOne(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string): Promise<User> {
    return await this.userService.findOneById(id);
  }

  @Mutation(() => User, { name: 'blockUser' })
  @Auth(ValidRoles.admin)
  async blockUser(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string, 
    @GetUser() user: User): Promise<User> {
    return await this.userService.blockUser(id, user);
  }
};