import { Inject } from '@decorators/di';
import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import { SING_IN_SCHEMA } from './schemas/singInSchema';

export class SingInValidate {
  constructor(
    @Inject(SING_IN_SCHEMA) private readonly schema: ObjectSchema
  ) {}

  validate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      await this.schema.validateAsync({ email, password });
      next();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };
}
