import { User } from '@app/entities/User';
import { UserRepositoryInMemory } from '@app/repositories/User/InMemory';
import { describe, expect, it } from 'vitest';
import { CreateUser } from '../CreateUser';
import { FindUserByEmail } from './';

const userProp = {
  name: 'John Doe',
  email: 'email@email.com',
  password: 'password'
};

describe('Testando a classe FindUserByEmail:', () => {
  it('Deve ser ser possível criar uma instância;', () => {
    const repository = new UserRepositoryInMemory();
    const findUser = new FindUserByEmail(repository);

    expect(findUser).toBeInstanceOf(FindUserByEmail);
  });
  it('Deve ser possível localizar um usuário pelo email;', async () => {
    const repository = new UserRepositoryInMemory();

    const createUser = new CreateUser(repository);
    await createUser.execute(userProp);

    const findUser = new FindUserByEmail(repository);

    const user = await findUser.execute(userProp.email);

    expect(user).toBeInstanceOf(User);
    expect(user.name).toBe(userProp.name);
    expect(user.email).toBe(userProp.email);
    expect(user.password).toBe(userProp.password);
  });
  it('Deve ser lançado um erro, caso o usuário não seja encontrado;', async () => {
    const repository = new UserRepositoryInMemory();

    const createUser = new CreateUser(repository);
    await createUser.execute(userProp);

    const findUser = new FindUserByEmail(repository);

    try {
      await findUser.execute('outro@email.com');
    } catch (error) {
      expect((error as Error).message).toBe('User not found.');
    }
  });
});
