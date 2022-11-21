import { ChangeTodoProgress } from '@app/use-cases/Todo/ChangeTodoProgress';
import { ChangeTodoTitle } from '@app/use-cases/Todo/ChangeTodoTitle';
import { CreateTodo } from '@app/use-cases/Todo/CreateTodo';
import { DeleteTodo } from '@app/use-cases/Todo/DeleteTodo';
import { GetTodosByUserId } from '@app/use-cases/Todo/GetTodosByUserId';

export interface ITodoServiceProps {
  create: CreateTodo
  findByUserId: GetTodosByUserId
  update: {
    title: ChangeTodoTitle
    progress: ChangeTodoProgress
  }
  delete: DeleteTodo
}
