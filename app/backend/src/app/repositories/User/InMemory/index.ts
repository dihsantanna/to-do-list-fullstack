import { User } from '@app/entities/User';
import { DbConnectionRequest } from '@app/repositories/DbConnectionRequest';
import { IUserRepository } from '../IUserRepository';

export class UserRepositoryInMemory implements IUserRepository {
  readonly users: User[] = [];

  constructor() { }

  async DbConnection<DbResponse>(callbackWithDBRequest: DbConnectionRequest<DbResponse>) {
    return callbackWithDBRequest();
  }

  async create(data: User): Promise<User> {
    this.users.push(data);

    return data;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }
}
