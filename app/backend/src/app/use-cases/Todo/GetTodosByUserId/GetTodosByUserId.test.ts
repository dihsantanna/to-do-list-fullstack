import { Todo } from '@app/entities/Todo';
import { TodoRepositoryInMemory } from '@app/repositories/Todo/InMemory';
import { describe, expect, it } from 'vitest';
import { GetTodosByUserId } from './';

describe('Testando a classe GetTodosByUserId:', () => {
  it('Deve ser ser possível criar uma instância;', () => {
    const repository = new TodoRepositoryInMemory();
    const todosByUserId = new GetTodosByUserId(repository);

    expect(todosByUserId).toBeInstanceOf(GetTodosByUserId);
  });
  it('Deve retornar um array vazio, caso não existam "todos" com o id de usuário passado;', async () => {
    const repository = new TodoRepositoryInMemory();
    const todosByUserId = new GetTodosByUserId(repository);

    const todos = await todosByUserId.execute('user-id');

    expect(todos).toEqual([]);
  });
  it('Deve ser possível encontrar os todos caso existam e retornar um array de "Todos".', async () => {
    const repository = new TodoRepositoryInMemory();

    repository.todos = [
      new Todo({
        id: 'todo-id',
        title: 'Todo title',
        userId: 'user-id'
      })
    ];
    const todosByUserId = new GetTodosByUserId(repository);

    const todos = await todosByUserId.execute('user-id');

    expect(todos).toBeInstanceOf(Array);
    expect(todos[0]).toBeInstanceOf(Todo);
    expect(todos[0].userId).toEqual('user-id');
  });
});
