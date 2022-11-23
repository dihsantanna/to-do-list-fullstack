import { Container, InjectionToken } from '@decorators/di';
import { prisma } from './prisma';

export const db = prisma;

export type DbType = typeof db;

export const DB = new InjectionToken('DB');

Container.provide([{ provide: DB, useValue: db }]);
