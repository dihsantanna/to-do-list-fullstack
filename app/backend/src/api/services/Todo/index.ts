import { Container, Inject, InjectionToken } from '@decorators/di';
import { CreateTodoRequest, ITodoService } from './ITodoService';
import { ITodoServiceProps } from './ITodoServiceProps';
import { TODO_SERVICE_PROPS } from './TodoServiceProps';

export const TODO_SERVICE = new InjectionToken('TODO_SERVICE');

export class TodoService implements ITodoService {
  constructor(
    @Inject(TODO_SERVICE_PROPS) private readonly useCases: ITodoServiceProps
  ) { }

  create = async (data: CreateTodoRequest) => {
    const todo = await this.useCases.create.execute(data);
    return todo;
  };

  getAllTodos = async (userId: string) => {
    const todos = await this.useCases.findByUserId.execute(userId);
    return todos;
  };

  editTitle = async (id: string, title: string) => {
    const todo = await this.useCases.update.title.execute({ id, title });
    return todo;
  };

  changeTodoProgress = async (id: string, completed: boolean) => {
    const todo = await this.useCases.update.progress.execute({ id, completed });
    return todo;
  };

  deleteTodo = async (id: string) => {
    const todo = await this.useCases.delete.execute(id);
    return todo;
  };
}

Container.provide([{ provide: TODO_SERVICE, useClass: TodoService }]);
