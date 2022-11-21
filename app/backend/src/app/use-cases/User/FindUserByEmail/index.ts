import { IUserRepository } from '@app/repositories/User/IUserRepository';
import { USER_REPOSITORY } from '@app/repositories/User/UserRepository';
import { Container, Inject, Injectable, InjectionToken } from '@decorators/di';

export const FIND_USER_BY_EMAIL = new InjectionToken('FIND_USER_BY_EMAIL');

@Injectable()
export class FindUserByEmail {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository
  ) { }

  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new Error('User not found.');

    return user;
  }
}

Container.provide([{ provide: FIND_USER_BY_EMAIL, useClass: FindUserByEmail }]);
