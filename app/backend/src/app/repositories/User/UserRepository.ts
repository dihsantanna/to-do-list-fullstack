import { User } from '@app/entities/User';
import { DB, DbType } from '@db/index';
import { Container, Inject, Injectable, InjectionToken } from '@decorators/di';
import { User as UserModel } from '@prisma/client';
import { DbConnectionRequest } from '../DbConnectionRequest';
import { IUserRepository } from './IUserRepository';

export const USER_REPOSITORY = new InjectionToken('USER_REPOSITORY');

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject(DB) private readonly db: DbType
  ) { }

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

Container.provide([{ provide: USER_REPOSITORY, useClass: UserRepository }]);
