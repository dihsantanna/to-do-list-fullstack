import { TODO_SERVICE } from '@api/services/Todo';
import { ITodoService } from '@api/services/Todo/ITodoService';
import { Container, Inject, Injectable, InjectionToken } from '@decorators/di';
import { Request, Response } from 'express';
import { StatusCodes as status } from 'http-status-codes';
import { ITodoController } from './ITodoController';

export const TODO_CONTROLLER = new InjectionToken('TODO_CONTROLLER');

@Injectable()
export class TodoController implements ITodoController {
  constructor(
    @Inject(TODO_SERVICE) private readonly service: ITodoService
  ) { }

  create = async (req: Request, res: Response) => {
    const todo = await this.service.create(req.body);
    res.status(status.CREATED).json(todo);
  };

  getAllTodos = async (req: Request, res: Response) => {
    const todos = await this.service.getAllTodos(req.userId!);
    res.status(status.OK).json(todos);
  };

  editTitle = async (req: Request, res: Response) => {
    try {
      const todo = await this.service.editTitle(req.params.id, req.body.title);
      res.status(status.OK).json(todo);
    } catch (error) {
      res.status(status.BAD_REQUEST).json({ message: (error as Error).message });
    }
  };

  changeTodoProgress = async (req: Request, res: Response) => {
    try {
      const todo = await this.service.changeTodoProgress(req.params.id, req.body.progress);
      res.status(status.OK).json(todo);
    } catch (error) {
      res.status(status.BAD_REQUEST).json({ message: (error as Error).message });
    }
  };

  deleteTodo = async (req: Request, res: Response) => {
    try {
      const todo = await this.service.deleteTodo(req.params.id);
      res.status(status.OK).json(todo);
    } catch (error) {
      res.status(status.BAD_REQUEST).json({ message: (error as Error).message });
    }
  };
}

Container.provide([{ provide: TODO_CONTROLLER, useClass: TodoController }]);
