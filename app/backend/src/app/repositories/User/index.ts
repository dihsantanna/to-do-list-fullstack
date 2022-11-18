import { User } from '@app/entities/User';
import { DbType } from '@db/index';
import { User as UserModel } from '@prisma/client';
import { DbConnectionRequest, IUserRepository } from './IUserRepository';

export class UserRepository implements IUserRepository {
  constructor(private readonly db: DbType) { }

  async DbConnection<DbResponse>(callbackWithDBRequest: DbConnectionRequest<DbResponse>) {
    await this.db.$connect();

    const result = await callbackWithDBRequest();

    await this.db.$disconnect();

    return result;
  }

  async create({ id, email, name, password, createdAt, updatedAt }: User) {
    const user = await this.DbConnection<UserModel>(
      () => this.db.user.create({
        data: {
          id,
          email,
          name,
          password,
          createdAt,
          updatedAt
        }
      })
    );

    return new User(user);
  }

  async findByEmail(email: string) {
    const user = await this.DbConnection<UserModel | null>(
      () => this.db.user.findUnique({ where: { email } })
    );

    return !user ? null : new User(user);
  }
}
