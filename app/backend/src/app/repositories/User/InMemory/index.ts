import { User } from '@app/entities/User';
import { IUserRepository } from '../IUserRepository';

export class UserRepositoryInMemory implements IUserRepository {
  readonly users: User[] = [];

  constructor() {}

  async createUser(data: User): Promise<User> {
    this.users.push(data);

    return data;
  }

  async findByEmail(email: string): Promise<User | undefined | null> {
    return this.users.find((user) => user.email === email);
  }
}
