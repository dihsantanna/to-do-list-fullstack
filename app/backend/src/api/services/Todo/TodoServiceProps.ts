import { ChangeTodoProgress } from '@app/use-cases/Todo/ChangeTodoProgress';
import { ChangeTodoTitle } from '@app/use-cases/Todo/ChangeTodoTitle';
import { CreateTodo } from '@app/use-cases/Todo/CreateTodo';
import { DeleteTodo } from '@app/use-cases/Todo/DeleteTodo';
import { GetTodosByUserId } from '@app/use-cases/Todo/GetTodosByUserId';
import { Container, InjectionToken } from '@decorators/di';
import { ITodoServiceProps } from './ITodoServiceProps';

export const TODO_SERVICE_PROPS = new InjectionToken('TODO_SERVICE_PROPS');

export const TodoServiceProps: ITodoServiceProps = {
  create: Container.get<CreateTodo>(CreateTodo),
  findByUserId: Container.get<GetTodosByUserId>(GetTodosByUserId),
  update: {
    title: Container.get<ChangeTodoTitle>(ChangeTodoTitle),
    progress: Container.get<ChangeTodoProgress>(ChangeTodoProgress)
  },
  delete: Container.get<DeleteTodo>(DeleteTodo)
};

Container.provide([{ provide: TODO_SERVICE_PROPS, useValue: TodoServiceProps }]);
