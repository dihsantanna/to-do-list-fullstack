import { Todo } from '@app/entities/Todo';
import { ITodoRepository } from '@app/repositories/Todo/ITodoRepository';
import { TODO_REPOSITORY } from '@app/repositories/Todo/TodoRepository';
import { Container, Inject, Injectable, InjectionToken } from '@decorators/di';

export const DELETE_TODO = new InjectionToken('DELETE_TODO');

@Injectable()
export class DeleteTodo {
  constructor(
    @Inject(TODO_REPOSITORY) private readonly todoRepository: ITodoRepository
  ) { }

  execute = async (id: string): Promise<Todo> => {
    const todoExists = await this.todoRepository.findById(id);

    if (!todoExists) throw new Error('Todo not exists.');

    return this.todoRepository.delete(id);
  };
}

Container.provide([{ provide: DELETE_TODO, useClass: DeleteTodo }]);
