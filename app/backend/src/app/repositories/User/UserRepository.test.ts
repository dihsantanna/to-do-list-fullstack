import { User } from '@app/entities/User';
import { db } from '@db/index';
import { User as UserModel } from '@prisma/client';
import { afterEach, beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest';
import { UserRepository } from './UserRepository';

const userProp = new User({
  name: 'John Doe',
  email: 'john@email.com',
  password: 'password'
});

const { id, email, name, password, createdAt, updatedAt } = userProp;

const mockDB = () => {
  db.$connect = vi.fn();
  db.$disconnect = vi.fn();
  db.user.create = vi.fn();
  db.user.findUnique = vi.fn();

  (db.user.create as unknown as MockedFunction<typeof db.user.create>)
    .mockResolvedValue({ id, email, name, password, createdAt, updatedAt } as UserModel);
  (db.user.findUnique as unknown as MockedFunction<typeof db.user.findUnique>)
    .mockResolvedValue({ id, email, name, password, createdAt, updatedAt } as UserModel);
};

describe('Testando classe UserRepository:', () => {
  beforeEach(() => {
    mockDB();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Deve ser possível criar uma instância;', () => {
    const userRepository = new UserRepository(db);
    expect(userRepository).toBeInstanceOf(UserRepository);
  });

  describe('Testando método DbConnection:', () => {
    it('Deve ser possível chamar o método;', async () => {
      const userRepository = new UserRepository(db);
      await userRepository.DbConnection(async () => Promise.resolve());

      expect(db.$connect).toBeCalled();
      expect(db.$disconnect).toBeCalled();
    });
    it('Deve retornar o valor correto, passado dentro da callback passada como parâmetro;', async () => {
      const userRepository = new UserRepository(db);
      const result = await userRepository.DbConnection<string>(async () => Promise.resolve('result'));

      expect(result).toBe('result');
    });
  });

  describe('Testando método create:', () => {
    it('Deve ser possível chamar o método;', async () => {
      const userRepository = new UserRepository(db);
      await userRepository.create(userProp);

      expect(db.user.create).toBeCalled();
    });
    it('Deve retornar uma instância da classe "User";', async () => {
      const userRepository = new UserRepository(db);

      const result = await userRepository.create(userProp);

      expect(result).toBeInstanceOf(User);
      expect(result).toEqual(userProp);
    });
  });

  describe('Testando método findByEmail:', () => {
    it('Deve ser possível chamar o método;', async () => {
      const userRepository = new UserRepository(db);
      await userRepository.findByEmail(email);

      expect(db.user.findUnique).toBeCalled();
    });
    it('Deve retornar uma instância da classe "User";', async () => {
      const userRepository = new UserRepository(db);

      const result = await userRepository.findByEmail(email);

      expect(result).toBeInstanceOf(User);
      expect(result).toEqual(userProp);
    });
    it('Deve retornar "null", caso não encontre um usuário com o email passado como parâmetro;', async () => {
      (db.user.findUnique as unknown as MockedFunction<typeof db.user.findUnique>)
        .mockResolvedValue(null);

      const userRepository = new UserRepository(db);

      const result = await userRepository.findByEmail(email);

      expect(result).toBeNull();
    });
  });
});
