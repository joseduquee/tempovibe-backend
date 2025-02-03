import { Reflector } from "@nestjs/core";
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { User } from "src/modules/users/entities/user.entity";
import { META_ROLES } from "../decorators/role-protected.decorator";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class UserRoleGuard implements CanActivate {
  
  constructor(
    private readonly reflector: Reflector
  ) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());
    
    if( !validRoles ) return true;
    if( validRoles.length === 0 ) return true;
    
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const user = req.user as User;

    if(!user)
      throw new BadRequestException('User not found');
    
    for (const role of user.roles) {
      if( validRoles.includes( role ) ) return true;
    }

    throw new ForbiddenException(`User ${ user.name } need a valid role: [${ validRoles }]`);

  }
}