import { User } from '@app/entities/User';
import { UserRepositoryInMemory } from '@app/repositories/User/InMemory';
import { describe, expect, it } from 'vitest';
import { CreateUser } from './';

const userProp = {
  name: 'John Doe',
  email: 'email@email.com',
  password: 'password'
};

describe('Testando a classe CreateUser:', () => {
  it('Deve ser ser possível criar uma instância;', () => {
    const repository = new UserRepositoryInMemory();
    const createUser = new CreateUser(repository);

    expect(createUser).toBeInstanceOf(CreateUser);
  });
  it('Deve ser possível criar um usuário;', async () => {
    const repository = new UserRepositoryInMemory();
    const createUser = new CreateUser(repository);

    const user = await createUser.execute(userProp);

    expect(user).toBeInstanceOf(User);
    expect(user.name).toBe(userProp.name);
    expect(user.email).toBe(userProp.email);
    expect(user.password).toBe(userProp.password);
  });
  it('Não deve ser possível criar um usuário com o mesmo email;', async () => {
    const repository = new UserRepositoryInMemory();
    const createUser = new CreateUser(repository);

    await createUser.execute(userProp);

    try {
      await createUser.execute(userProp);
    } catch (error) {
      expect((error as Error).message).toBe('User already exists.');
    }
  });
});
