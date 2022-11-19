import { UserRepositoryInjected } from '@app/repositories/User';
import { CreateUser } from './CreateUser';
import { FindUserByEmail } from './FindUserByEmail';

export const CreateUserInjected = new CreateUser(UserRepositoryInjected);

export const FindUserByEmailInjected = new FindUserByEmail(UserRepositoryInjected);
