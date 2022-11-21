import { Todo } from '@app/entities/Todo';
import { DB, DbType } from '@db/index';
import { Container, Inject, Injectable, InjectionToken } from '@decorators/di';
import { Todo as TodoModel } from '@prisma/client';
import { DbConnectionRequest } from '../DbConnectionRequest';
import { ITodoRepository } from './ITodoRepository';

export const TODO_REPOSITORY = new InjectionToken('TODO_REPOSITORY');

@Injectable()
export class TodoRepository implements ITodoRepository {
  constructor(
    @Inject(DB) private readonly db: DbType
  ) { }

  async DbConnection<DbResponse>(callbackWithDBRequest: DbConnectionRequest<DbResponse>) {
    await this.db.$connect();

    const result = await callbackWithDBRequest();

    await this.db.$disconnect();

    return result;
  }

  async create({ id, title, userId, completed, createdAt, updatedAt }: Todo) {
    const todo = await this.DbConnection<TodoModel>(
      () => this.db.todo.create({
        data: {
          id,
          title,
          userId,
          completed,
          createdAt,
          updatedAt
        }
      })
    );

    return new Todo(todo);
  }

  async findById(id: string) {
    const todo = await this.DbConnection<TodoModel | null>(
      () => this.db.todo.findUnique({ where: { id } })
    );

    return !todo ? null : new Todo(todo);
  };

  async changeTitle(id: string, title: string) {
    const todo = await this.DbConnection<TodoModel>(
      () => this.db.todo.update({
        where: { id },
        data: { title }
      })
    );

    return new Todo(todo);
  }

  async changeProgress(id: string, completed: boolean) {
    const todo = await this.DbConnection<TodoModel>(
      () => this.db.todo.update({
        where: { id },
        data: { completed }
      })
    );

    return new Todo(todo);
  }

  async delete(id: string) {
    const todo = await this.DbConnection<TodoModel>(
      () => this.db.todo.delete({ where: { id } })
    );

    return new Todo(todo);
  }
}

Container.provide([{ provide: TODO_REPOSITORY, useClass: TodoRepository }]);