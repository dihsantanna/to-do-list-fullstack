import { User } from '@app/entities/User';
import { DbConnectionRequest } from '@app/repositories/DbConnectionRequestType';
import { IUserRepository } from '../IUserRepository';

export class UserRepositoryInMemory implements IUserRepository {
  readonly users: User[] = [];

  constructor() { }

  DbConnection = async <DbResponse>(callbackWithDBRequest: DbConnectionRequest<DbResponse>) => {
    return callbackWithDBRequest();
  };

  create = async (data: User): Promise<User> => {
    this.users.push(data);

    return data;
  };

  findByEmail = async (email: string): Promise<User | null> => {
    return this.users.find((user) => user.email === email) ?? null;
  };
}
