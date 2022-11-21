import { Todo } from '@app/entities/Todo';
import { ITodoRepository } from '@app/repositories/Todo/ITodoRepository';
import { TODO_REPOSITORY } from '@app/repositories/Todo/TodoRepository';
import { Container, Inject, Injectable, InjectionToken } from '@decorators/di';

export const GET_TODOS_BY_USER_ID = new InjectionToken('GET_TODOS_BY_USER_ID');

@Injectable()
export class GetTodosByUserId {
  constructor(
    @Inject(TODO_REPOSITORY) private readonly todoRepository: ITodoRepository
  ) { }

  execute = async (userId: string): Promise<Todo[]> => {
    const todos = await this.todoRepository.findByUserId(userId);
    return todos;
  };
}

Container.provide([{ provide: GET_TODOS_BY_USER_ID, useClass: GetTodosByUserId }]);
