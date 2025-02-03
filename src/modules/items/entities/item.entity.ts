import { ObjectType, Field, Float } from '@nestjs/graphql';
import { User } from 'src/modules/users/entities/user.entity';

@ObjectType()
export class Item {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Float)
  quantityUnits: number;

  @Field()
  userId: string;

  @Field(() => User)
  user: User;
}
