import { registerEnumType } from "@nestjs/graphql";

export enum ValidRoles {
  admin = 'ADMIN',
  developer = 'DEVELOPER',
  user = 'USER',
}

registerEnumType(ValidRoles, {
  name: 'ValidRoles',
  description: 'Valid roles for the application',
});