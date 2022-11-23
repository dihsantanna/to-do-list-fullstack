import { Todo } from '@app/entities/Todo';
import { ITodoRepository } from '@app/repositories/Todo/ITodoRepository';
import { TODO_REPOSITORY } from '@app/repositories/Todo/TodoRepository';
import { Container, Inject, Injectable, InjectionToken } from '@decorators/di';
import { ChangeTodoTitleDTO } from './ChangeTodoTitleDTO';

export const CHANGE_TODO_TITLE = new InjectionToken('CHANGE_TODO_TITLE');

@Injectable()
export class ChangeTodoTitle {
  constructor(
    @Inject(TODO_REPOSITORY) private readonly todoRepository: ITodoRepository
  ) { }

  execute = async (data: ChangeTodoTitleDTO): Promise<Todo> => {
    const todoExists = await this.todoRepository.findById(data.id);
    if (!todoExists) throw new Error('Todo not exists.');
    return this.todoRepository.changeTitle(data.id, data.title);
  };
}

Container.provide([{ provide: CHANGE_TODO_TITLE, useClass: ChangeTodoTitle }]);
