import { Container, Inject, Injectable, InjectionToken } from '@decorators/di';
import { compareSync, genSalt, hash } from 'bcrypt';
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
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    const password = await hash(data.password, salt);

    const { id, name, email } = await this.useCases.create.execute({ ...data, password });
    const token = Jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    return { id, name, email, token };
  };

  singIn = async (data: SingInRequest): Promise<SingInResponse> => {
    const { id, name, email, password } = await this.useCases.findByEmail.execute(data.email);

    const checkPass = compareSync(data.password, password);

    if (!checkPass) throw new Error('Invalid password.');

    const token = this.createToken(id, email);

    return { id, name, email, token };
  };

  validate = async (id: string, email: string) => {
    const token = Jwt.sign({ id, email }, process.env.JWT_SECRET!, { expiresIn: '1d' }) as string;
    const { name } = await this.useCases.findByEmail.execute(email);
    return { name, token };
  };
}

Container.provide([{ provide: USER_SERVICE, useClass: UserService }]);
