import { ITodoRepository } from '@app/repositories/Todo/ITodoRepository';
import { TODO_REPOSITORY } from '@app/repositories/Todo/TodoRepository';
import { Container, Inject, Injectable, InjectionToken } from '@decorators/di';
import { Todo } from '@src/app/entities/Todo';
import { CreateTodoDTO } from './CreateTodoDTO';

export const CREATE_TODO = new InjectionToken('CREATE_TODO');

@Injectable()
export class CreateTodo {
  constructor(
    @Inject(TODO_REPOSITORY) private readonly todoRepository: ITodoRepository
  ) { }

  execute = async (data: CreateTodoDTO): Promise<Todo> => {
    const todo = new Todo(data);
    return this.todoRepository.create(todo);
  };
}

Container.provide([{ provide: CREATE_TODO, useClass: CreateTodo }]);
