import { Container, InjectionToken } from '@decorators/di';
import Joi from 'joi';

export const TODO_SCHEMA = new InjectionToken('TODO_SCHEMA');

export const todoSchema = Joi.object({
  title: Joi.string().required()
});

Container.provide([{ provide: TODO_SCHEMA, useValue: todoSchema }]);
