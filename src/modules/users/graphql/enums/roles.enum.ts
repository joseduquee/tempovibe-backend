import { registerEnumType } from '@nestjs/graphql';

export enum Roles {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  USER = 'USER',
}

registerEnumType(Roles, {
  name: 'Roles',
});
