import { USER_SERVICE } from '@api/services/User';
import { IUserService } from '@api/services/User/IUserService';
import { UserType } from '@app/entities/User';
import { Container, Inject, Injectable, InjectionToken } from '@decorators/di';
import { Request, Response } from 'express';
import { StatusCodes as status } from 'http-status-codes';
import { IUserController } from './IUserController';

export const USER_CONTROLLER = new InjectionToken('USER_CONTROLLER');

@Injectable()
export class UserController implements IUserController {
  constructor(
    @Inject(USER_SERVICE) private readonly service: IUserService
  ) { }

  create = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body as UserType;
      const user = await this.service.create({ name, email, password } as UserType);
      res.status(status.CREATED).json(user);
    } catch (error) {
      res.status(status.BAD_REQUEST).json({ error: (error as Error).message });
    }
  };

  singIn = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body as UserType;
      const token = await this.service.singIn({ email, password });
      res.status(status.OK).json({ token });
    } catch (error) {
      res.status(status.UNAUTHORIZED).json({ error: (error as Error).message });
    }
  };
}

Container.provide([{ provide: USER_CONTROLLER, useClass: UserController }]);
