import { Container, InjectionToken } from '@decorators/di';
import Joi from 'joi';

export const SING_IN_SCHEMA = new InjectionToken('SING_IN_SCHEMA');

export const singInSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } }).required(),
  password: Joi.string().min(8).max(24).required()
});

Container.provide([{ provide: SING_IN_SCHEMA, useValue: singInSchema }]);
