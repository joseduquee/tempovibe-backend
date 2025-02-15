import { Mutation, Resolver } from '@nestjs/graphql';
import { SeedService } from './seed.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces/valid-roles';

@Resolver()
// @Auth()
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}

  @Mutation(() => Boolean, { name: 'runSeed', description: 'Run seed of DDBB'})
  // @Auth(ValidRoles.developer)
  async runSeed(): Promise<boolean> {
    await this.seedService.runSeed();
    return true;
  }
}
