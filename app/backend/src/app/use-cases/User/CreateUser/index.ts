import { User } from '@app/entities/User';
import { IUserRepository } from '@app/repositories/User/IUserRepository';
import { USER_REPOSITORY } from '@app/repositories/User/UserRepository';
import { Container, Inject, Injectable, InjectionToken } from '@decorators/di';
import { CreateUserDTO } from './CreateUserDTO';

export const CREATE_USER = new InjectionToken('CREATE_USER');

@Injectable()
export class CreateUser {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository
  ) { }

  async execute(data: CreateUserDTO) {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) throw new Error('User already exists.');

    const user = new User(data);

    return this.userRepository.create(user);
  }
}

Container.provide([{ provide: CREATE_USER, useClass: CreateUser }]);
