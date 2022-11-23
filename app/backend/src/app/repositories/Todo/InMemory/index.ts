import { Todo } from '@app/entities/Todo';
import { DbConnectionRequest } from '@app/repositories/DbConnectionRequestType';
import { ITodoRepository } from '../ITodoRepository';

export class TodoRepositoryInMemory implements ITodoRepository {
  todos: Todo[] = [];

  DbConnection = async <DbResponse>(callbackWithDBRequest: DbConnectionRequest<DbResponse>): Promise<DbResponse> => {
    return callbackWithDBRequest();
  };

  create = async (todo: Todo): Promise<Todo> => {
    this.todos.push(todo);
    return todo;
  };

  findById = async (id: string): Promise<Todo | null> => {
    return this.todos.find((todo) => todo.id === id) ?? null;
  };

  findByUserId = async (userId: string): Promise<Todo[]> => {
    return this.todos.filter((todo) => todo.userId === userId);
  };

  changeTitle = async (id: string, title: string): Promise<Todo> => {
    let result = {} as Todo;

    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        todo.title = title;
        result = todo;
      };
      return todo;
    });

    return result;
  };

  changeProgress = async (id: string, completed: boolean): Promise<Todo> => {
    let result = {} as Todo;

    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = completed;
        result = todo;
      };
      return todo;
    });

    return result;
  };

  delete = async (id: string): Promise<Todo> => {
    let result = {} as Todo;

    this.todos = this.todos.filter((todo) => {
      if (todo.id === id) result = todo;

      return todo.id !== id;
    });

    return result;
  };
}
