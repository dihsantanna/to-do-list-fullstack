import { CreateUser } from '@app/use-cases/User/CreateUser';
import { FindUserByEmail } from '@app/use-cases/User/FindUserByEmail';
import { Container, InjectionToken } from '@decorators/di';
import { IUserServiceProps } from './IUserServiceProps';

export const USER_SERVICE_PROPS = new InjectionToken('USER_SERVICE_PROPS');

export const UseServiceProps: IUserServiceProps = {
  create: Container.get<CreateUser>(CreateUser),
  findByEmail: Container.get<FindUserByEmail>(FindUserByEmail)
};

Container.provide([{ provide: USER_SERVICE_PROPS, useValue: UseServiceProps }]);
