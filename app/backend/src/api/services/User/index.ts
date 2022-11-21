import { Container, Inject, Injectable, InjectionToken } from '@decorators/di';
import { compareSync, hash } from 'bcrypt';
import 'dotenv/config';
import Jwt from 'jsonwebtoken';
import { CreateUserRequest, CreateUserResponse, IUserService, SingInRequest, SingInResponse } from './IUserService';
import { IUserServiceProps } from './IUserServiceProps';
import { USER_SERVICE_PROPS } from './UseServicesProps';

export const USER_SERVICE = new InjectionToken('USER_SERVICE');

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_SERVICE_PROPS) private readonly useCases: IUserServiceProps
  ) { }

  create = async (data: CreateUserRequest): Promise<CreateUserResponse> => {
    const password = await hash(data.password, 10);

    const user = await this.useCases.create.execute({ ...data, password });
    return user;
  };

  singIn = async (data: SingInRequest): Promise<SingInResponse> => {
    const user = await this.useCases.findByEmail.execute(data.email);

    const checkPass = compareSync(data.password, user.password);

    if (!checkPass) throw new Error('Invalid password.');

    const token = Jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    return token;
  };
}

Container.provide([{ provide: USER_SERVICE, useClass: UserService }]);
