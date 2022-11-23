import { describe, expect, it } from 'vitest';
import { User } from './';

export const userProp = {
  name: 'John Doe',
  email: 'email@email.com',
  password: 'password'
};

describe('Testando a classe User:', () => {
  it('Deve ser ser possível criar uma instância;', () => {
    const user = new User(userProp);
    expect(user).toBeInstanceOf(User);
  });

  it('Deve possuir os atributos "id", "name", "email", "password", "createdAt" e "updatedAt";', () => {
    const user = new User({
      id: 'id',
      ...userProp,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('createdAt');
    expect(user).toHaveProperty('updatedAt');
  });

  it('Deve ser gerado um id único, ao criar uma instância sem passar o "id";', () => {
    const user = new User(userProp);
    const user2 = new User(userProp);

    expect(user.id).toBeDefined();
    expect(user2.id).toBeDefined();
    expect(user.id).not.toEqual(user2.id);
  });
  it('Não deve ser possível alterar o "id" de uma instância;', () => {
    const user = new User(userProp);

    const captureError = async (): Promise<undefined | Error> => {
      try {
        (user.id as unknown) = 'newId';
      } catch (err) {
        return err as Error;
      }
    };

    void expect(captureError()).resolves.toBeInstanceOf(Error);
  });
  it('Deve ser gerada um data de criação, ao criar uma instância sem passar o "createAt";', () => {
    const user = new User(userProp);

    expect(user.createdAt).toBeDefined();
    expect(user.createdAt).toBeInstanceOf(Date);
  });
  it('Deve retornar o valor "null", ao criar uma instância sem passar o "updateAt".', () => {
    const user = new User(userProp);

    expect(user.updatedAt).toBeNull();
  });
});
