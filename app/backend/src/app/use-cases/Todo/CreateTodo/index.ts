import { ITodoRepository } from '@app/repositories/Todo/ITodoRepository';
import { Todo } from '@src/app/entities/Todo';
import { CreateTodoDTO } from './CreateTodoDTO';

export class CreateTodo {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async execute(data: CreateTodoDTO): Promise<Todo> {
    const todo = new Todo(data);
    return this.todoRepository.create(todo);
  }
}
