import { prisma } from './prisma';

export const db = prisma;

export type DbType = typeof db;
