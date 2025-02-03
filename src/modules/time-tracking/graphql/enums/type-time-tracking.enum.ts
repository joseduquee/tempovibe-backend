import { registerEnumType } from "@nestjs/graphql";

export enum TypeTimeTracking {
  START = 'START',
  PAUSE = 'PAUSE',
  END = 'END',
}

registerEnumType(TypeTimeTracking, {
  name: 'TypeTimeTracking',
});