import { Request, Response } from 'express';

export interface ITodoController {
  create: (req: Request, res: Response) => Promise<void>
  getAllTodos: (req: Request, res: Response) => Promise<void>
  editTitle: (req: Request, res: Response) => Promise<void>
  changeTodoProgress: (req: Request, res: Response) => Promise<void>
  deleteTodo: (req: Request, res: Response) => Promise<void>
}
