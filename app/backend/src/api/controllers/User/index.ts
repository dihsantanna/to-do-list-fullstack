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
      const { id, token } = await this.service.create({ name, email, password } as UserType);
      const response = { _id: id, name, email, token };
      res.status(status.CREATED).json(response);
    } catch (error) {
      res.status(status.BAD_REQUEST).json({ error: (error as Error).message });
    }
  };

  singIn = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body as UserType;
      const { id, name, token } = await this.service.singIn({ email, password });
      const response = { _id: id, name, email, token };
      res.status(status.OK).json(response);
    } catch (error) {
      res.status(status.UNAUTHORIZED).json({ error: (error as Error).message });
    }
  };

  createToken = async (req: Request, res: Response) => {
    const { userEmail, userId } = req;
    const token = this.service.createToken(userId!, userEmail!);
    res.status(status.OK).json({ token });
  };
}

Container.provide([{ provide: USER_CONTROLLER, useClass: UserController }]);
