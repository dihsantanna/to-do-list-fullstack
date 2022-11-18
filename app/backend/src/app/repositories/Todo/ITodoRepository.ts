import { Todo } from '@app/entities/Todo';

export interface ITodoRepository {
  create: (todo: Todo) => Promise<Todo>
  findById: (id: string) => Promise<Todo | undefined | null>
  changeTitle: (id: string, title: string) => Promise<Todo>
  changeProgress: (id: string, completed: boolean) => Promise<Todo>
  delete: (id: string) => Promise<Todo>
}
