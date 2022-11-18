import { Todo } from '@app/entities/Todo';
import { ITodoRepository } from '../ITodoRepository';

export class TodoRepositoryInMemory implements ITodoRepository {
  readonly todos: Todo[] = [];

  async create(todo: Todo): Promise<Todo> {
    this.todos.push(todo);
    return todo;
  }
}
