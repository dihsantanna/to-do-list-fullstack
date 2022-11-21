import { Todo } from '@app/entities/Todo';
import { ITodoRepository } from '@app/repositories/Todo/ITodoRepository';
import { TODO_REPOSITORY } from '@app/repositories/Todo/TodoRepository';
import { Container, Inject, Injectable, InjectionToken } from '@decorators/di';
import { ChangeTodoProgressDTO } from './ChangeTodoProgressDTO';

export const CHANGE_TODO_PROGRESS = new InjectionToken('CHANGE_TODO_PROGRESS');

@Injectable()
export class ChangeTodoProgress {
  constructor(
    @Inject(TODO_REPOSITORY) private readonly todoRepository: ITodoRepository
  ) {}

  execute = async (data: ChangeTodoProgressDTO): Promise<Todo> => {
    const todo = await this.todoRepository.findById(data.id);
    if (!todo) throw new Error('Todo not exists.');
    return this.todoRepository.changeProgress(data.id, data.completed);
  };
}

Container.provide([{ provide: CHANGE_TODO_PROGRESS, useClass: ChangeTodoProgress }]);
