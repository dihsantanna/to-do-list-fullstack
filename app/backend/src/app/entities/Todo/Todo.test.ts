import { describe, expect, it } from 'vitest';
import { Todo } from './';

export const todoProp = {
  title: 'Testar todo',
  userId: 'todoId'
};

describe('Testando a classe Todo:', () => {
  it('Deve ser ser possível criar uma instância;', () => {
    const todo = new Todo(todoProp);
    expect(todo).toBeInstanceOf(Todo);
  });

  it('Deve possuir os atributos "id", "title", "userId", "completed", "createdAt" e "updatedAt";', () => {
    const todo = new Todo({
      id: 'id',
      ...todoProp,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    expect(todo).toHaveProperty('id');
    expect(todo).toHaveProperty('title');
    expect(todo).toHaveProperty('userId');
    expect(todo).toHaveProperty('completed');
    expect(todo).toHaveProperty('createdAt');
    expect(todo).toHaveProperty('updatedAt');
  });

  it('Deve ser gerado um id único, ao criar uma instância sem passar o "id";', () => {
    const todo = new Todo(todoProp);
    const todo2 = new Todo(todoProp);

    expect(todo.id).toBeDefined();
    expect(todo2.id).toBeDefined();
    expect(todo.id).not.toEqual(todo2.id);
  });
  it('Não deve ser possível alterar o "id" de uma instância;', () => {
    const todo = new Todo(todoProp);

    const captureError = async (): Promise<undefined | Error> => {
      try {
        (todo.id as unknown) = 'newId';
      } catch (err) {
        return err as Error;
      }
    };

    void expect(captureError()).resolves.toBeInstanceOf(Error);
  });
  it('Deve ser gerada um data de criação, ao criar uma instância sem passar o "createAt";', () => {
    const todo = new Todo(todoProp);

    expect(todo.createdAt).toBeDefined();
    expect(todo.createdAt).toBeInstanceOf(Date);
  });
  it('Deve retornar o valor "null", ao criar uma instância sem passar o "updateAt".', () => {
    const todo = new Todo(todoProp);

    expect(todo.updatedAt).toBeNull();
  });
  it('Dever ser setado o valor "false", ao criar uma instância sem passar o "completed".', () => {
    const todo = new Todo(todoProp);

    expect(todo.completed).toBe(false);
  });
});
