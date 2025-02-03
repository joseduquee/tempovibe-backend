import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetRawHeaders = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    // Verificar si es una solicitud GraphQL
    const gqlContext = GqlExecutionContext.create(ctx);
    const gqlReq = gqlContext.getContext().req;
    
    if (gqlReq) {
      // Si es una solicitud GraphQL, obtener los headers del contexto de GraphQL
      return gqlReq.rawHeaders;
    }
    
    // Si no es una solicitud GraphQL, obtener los headers del contexto HTTP
    const req = ctx.switchToHttp().getRequest();
    return req.rawHeaders;
  },
);
