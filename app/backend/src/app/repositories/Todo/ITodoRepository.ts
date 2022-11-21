import { Todo } from '@app/entities/Todo';
import { DbConnectionRequest } from '../DbConnectionRequestType';

export interface ITodoRepository {
  create: (todo: Todo) => Promise<Todo>
  findById: (id: string) => Promise<Todo | null>
  changeTitle: (id: string, title: string) => Promise<Todo>
  changeProgress: (id: string, completed: boolean) => Promise<Todo>
  delete: (id: string) => Promise<Todo>
  DbConnection: <DbResponse>(callbackWithDBRequest: DbConnectionRequest<DbResponse>) => Promise<DbResponse>
}
