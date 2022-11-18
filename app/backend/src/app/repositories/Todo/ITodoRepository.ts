import { Todo } from '@src/app/entities/Todo';

export interface ITodoRepository {
  create: (todo: Todo) => Promise<Todo>
  findById: (id: string) => Promise<Todo | undefined | null>
  changeTitle: (id: string, title: string) => Promise<Todo>
}
