import { Todo } from '@app/entities/Todo';
import { ITodoRepository } from '../ITodoRepository';

export class TodoRepositoryInMemory implements ITodoRepository {
  todos: Todo[] = [];

  async create(todo: Todo): Promise<Todo> {
    this.todos.push(todo);
    return todo;
  }

  async findById(id: string): Promise<Todo | undefined | null> {
    return this.todos.find((todo) => todo.id === id);
  }

  async changeTitle(id: string, title: string): Promise<Todo> {
    let result = {} as Todo;

    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        todo.title = title;
        result = todo;
      };
      return todo;
    });

    return result;
  }

  async changeProgress(id: string, completed: boolean): Promise<Todo> {
    let result = {} as Todo;

    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = completed;
        result = todo;
      };
      return todo;
    });

    return result;
  }

  async delete(id: string): Promise<Todo> {
    let result = {} as Todo;

    this.todos = this.todos.filter((todo) => {
      if (todo.id === id) result = todo;

      return todo.id !== id;
    });

    return result;
  }
}
