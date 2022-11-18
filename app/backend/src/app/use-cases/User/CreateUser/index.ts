import { User } from '@app/entities/User';
import { IUserRepository } from '@app/repositories/User/IUserRepository';
import { CreateUserDTO } from './CreateUserDTO';

export class CreateUser {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(data: CreateUserDTO) {
    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) throw new Error('User already exists.');

    const user = new User(data);

    return this.userRepository.createUser(user);
  }
}
