import { Todo } from '@app/entities/Todo';
import { ITodoRepository } from '@app/repositories/Todo/ITodoRepository';

export class DeleteTodo {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async execute(id: string): Promise<Todo> {
    const todoExists = await this.todoRepository.findById(id);

    if (!todoExists) throw new Error('Todo not exists.');

    return this.todoRepository.delete(id);
  }
}
