import { Todo } from '@app/entities/Todo';
import { DB, DbType } from '@db/index';
import { Container, Inject, Injectable, InjectionToken } from '@decorators/di';
import { Todo as TodoModel } from '@prisma/client';
import { DbConnectionRequest } from '../DbConnectionRequestType';
import { ITodoRepository } from './ITodoRepository';

export const TODO_REPOSITORY = new InjectionToken('TODO_REPOSITORY');

@Injectable()
export class TodoRepository implements ITodoRepository {
  constructor(
    @Inject(DB) private readonly db: DbType
  ) { }

  DbConnection = async <DbResponse>(callbackWithDBRequest: DbConnectionRequest<DbResponse>): Promise<DbResponse> => {
    await this.db.$connect();

    const result = await callbackWithDBRequest();

    await this.db.$disconnect();

    return result;
  };

  create = async ({ id, title, userId, completed, createdAt, updatedAt }: Todo) => {
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
  };

  findById = async (id: string): Promise<Todo | null> => {
    const todo = await this.DbConnection<TodoModel | null>(
      () => this.db.todo.findUnique({ where: { id } })
    );

    return !todo ? null : new Todo(todo);
  };

  changeTitle = async (id: string, title: string): Promise<Todo> => {
    const todo = await this.DbConnection<TodoModel>(
      () => this.db.todo.update({
        where: { id },
        data: { title }
      })
    );

    return new Todo(todo);
  };

  changeProgress = async (id: string, completed: boolean): Promise<Todo> => {
    const todo = await this.DbConnection<TodoModel>(
      () => this.db.todo.update({
        where: { id },
        data: { completed }
      })
    );

    return new Todo(todo);
  };

  delete = async (id: string): Promise<Todo> => {
    const todo = await this.DbConnection<TodoModel>(
      () => this.db.todo.delete({ where: { id } })
    );

    return new Todo(todo);
  };
}

Container.provide([{ provide: TODO_REPOSITORY, useClass: TodoRepository }]);
