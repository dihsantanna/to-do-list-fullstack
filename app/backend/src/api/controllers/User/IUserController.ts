import { Request, Response } from 'express';

export interface IUserController {
  create: (req: Request, res: Response) => Promise<void>
  singIn: (req: Request, res: Response) => Promise<void>
  validate: (req: Request, res: Response) => Promise<void>
}
