import { User } from '@app/entities/User';

export interface IUserRepository {
  createUser: (user: User) => Promise<User>
  findByEmail: (email: string) => Promise<User | undefined | null>
};
