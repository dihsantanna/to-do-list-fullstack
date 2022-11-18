import { Todo } from '@app/entities/Todo';
import { ITodoRepository } from '@app/repositories/Todo/ITodoRepository';
import { ChangeTodoTitleDTO } from './ChangeTodoTitleDTO';

export class ChangeTodoTitle {
  constructor(private readonly todoRepository: ITodoRepository) { }

  async execute(data: ChangeTodoTitleDTO): Promise<Todo> {
    const todoExists = await this.todoRepository.findById(data.id);
    if (!todoExists) throw new Error('Todo not exists.');
    return this.todoRepository.changeTitle(data.id, data.title);
  }
}
