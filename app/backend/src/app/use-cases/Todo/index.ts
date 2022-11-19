import { TodoRepositoryInjected } from '@app/repositories/Todo';
import { ChangeTodoProgress } from './ChangeTodoProgress';
import { ChangeTodoTitle } from './ChangeTodoTitle';
import { CreateTodo } from './CreateTodo';
import { DeleteTodo } from './DeleteTodo';

export const CreateTodoInjected = new CreateTodo(TodoRepositoryInjected);

export const ChangeTodoTitleInjected = new ChangeTodoTitle(TodoRepositoryInjected);

export const ChangeTodoProgressInjected = new ChangeTodoProgress(TodoRepositoryInjected);

export const DeleteTodoInjected = new DeleteTodo(TodoRepositoryInjected);
