import { Todo } from '@app/entities/Todo';
import { ITodoRepository } from '@app/repositories/Todo/ITodoRepository';
import { ChangeTodoProgressDTO } from './ChangeTodoProgressDTO';

export class ChangeTodoProgress {
  constructor(
    private readonly todoRepository: ITodoRepository
  ) {}

  async execute(data: ChangeTodoProgressDTO): Promise<Todo> {
    const todo = await this.todoRepository.findById(data.id);
    if (!todo) throw new Error('Todo not exists.');
    return this.todoRepository.changeProgress(data.id, data.completed);
  }
}
