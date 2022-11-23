import { Inject } from '@decorators/di';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes as status } from 'http-status-codes';
import { ObjectSchema } from 'joi';
import { CHANGE_TODO_PROGRESS_SCHEMA } from './schemas/changeTodoProgressSchema';

export class TodoProgressValidate {
  constructor(
    @Inject(CHANGE_TODO_PROGRESS_SCHEMA) private readonly schema: ObjectSchema
  ) { }

  validate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.schema.validateAsync(req.body);
      next();
    } catch (error) {
      res.status(status.BAD_REQUEST).json({ error: (error as Error).message });
    }
  };
}
