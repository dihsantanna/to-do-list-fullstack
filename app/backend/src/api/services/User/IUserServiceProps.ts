import { CreateUser } from '@app/use-cases/User/CreateUser';
import { FindUserByEmail } from '@app/use-cases/User/FindUserByEmail';

export interface IUserServiceProps {
  create: CreateUser
  findByEmail: FindUserByEmail
}
