import { User } from '@app/entities/User';
import { DbConnectionRequest } from '../DbConnectionRequest';

export interface IUserRepository {
  create: (user: User) => Promise<User>
  findByEmail: (email: string) => Promise<User | null>
  DbConnection: <DbResponse>(callbackWithDBRequest: DbConnectionRequest<DbResponse>) => Promise<DbResponse>
};
