import { Container, InjectionToken } from '@decorators/di';
import Joi from 'joi';

export const CHANGE_TODO_PROGRESS_SCHEMA = new InjectionToken('CHANGE_TODO_PROGRESS_SCHEMA');

export const changeTodoProgressSchema = Joi.object({
  completed: Joi.boolean().required()
});

Container.provide([{ provide: CHANGE_TODO_PROGRESS_SCHEMA, useValue: changeTodoProgressSchema }]);
