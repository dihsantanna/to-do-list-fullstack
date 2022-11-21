import { UserType } from '@app/entities/User';
import { Container, InjectionToken } from '@decorators/di';
import Joi from 'joi';

export const USER_SCHEMA = new InjectionToken('USER_SCHEMA');

export const userSchema = Joi.object<UserType>({
  name: Joi.string().min(4).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } }).required(),
  password: Joi.string().min(8).max(24).required()
});

Container.provide([{ provide: USER_SCHEMA, useValue: userSchema }]);
