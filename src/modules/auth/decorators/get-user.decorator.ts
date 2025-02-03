import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator((data: string, context: ExecutionContext) => {
  let user: any;

  // Detecta el tipo de contexto
  if (context.getType() === 'http') {
    // REST
    const req = context.switchToHttp().getRequest();
    user = req.user;
  } else if (context.getType<'graphql'>() === 'graphql') {
    // GraphQL
    const ctx = GqlExecutionContext.create(context);
    user = ctx.getContext().req.user;
  }

  // Si no se encuentra el usuario, lanza una excepción
  if (!user) {
    throw new InternalServerErrorException('User not found in the request');
  }

  // Retorna todo el usuario o una propiedad específica
  return data ? user[data] : user;
});

