import { Todo } from '@src/app/entities/Todo';

export interface ITodoRepository {
  create: (todo: Todo) => Promise<Todo>
}
