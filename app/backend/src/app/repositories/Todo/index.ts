import { db } from '@db/index';
import { TodoRepository } from './TodoRepository';

export const TodoRepositoryInjected = new TodoRepository(db);
