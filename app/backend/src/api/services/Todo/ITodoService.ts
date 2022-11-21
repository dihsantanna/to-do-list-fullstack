import { Todo } from '@app/entities/Todo';

export interface CreateTodoRequest {
  userId: string
  title: string
}

export type CreateTodoResponse = Todo;

export interface ITodoService {
  create: (data: CreateTodoRequest) => Promise<CreateTodoResponse>
  getAllTodos: (userId: string) => Promise<Todo[]>
  editTitle: (id: string, title: string) => Promise<Todo>
  changeTodoProgress: (id: string, completed: boolean) => Promise<Todo>
  deleteTodo: (id: string) => Promise<Todo>
}
