import { UserType } from '@app/entities/User';
import { Inject } from '@decorators/di';
import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import { USER_SCHEMA } from './schemas/userSchema';

export class UserValidate {
  constructor(
    @Inject(USER_SCHEMA) private readonly schema: ObjectSchema<UserType>
  ) { }

  validate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.schema.validateAsync(req.body);
      next();
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };
}
