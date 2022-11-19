import { db } from '@db/index';
import { UserRepository } from './UserRepository';

export const UserRepositoryInjected = new UserRepository(db);
