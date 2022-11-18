import { Todo } from '@app/entities/Todo';
import { TodoRepositoryInMemory } from '@app/repositories/Todo/InMemory';
import { describe, expect, it } from 'vitest';
import { CreateTodo } from './';

const todoProp = {
  title: 'Todo title',
  userId: 'user-id'
};
describe('Testando a classe CreateTodo:', () => {
  it('Deve ser ser possível criar uma instância;', () => {
    const repository = new TodoRepositoryInMemory();
    const createTodo = new CreateTodo(repository);

    expect(createTodo).toBeInstanceOf(CreateTodo);
  });
  it('Deve ser possível criar um todo;', async () => {
    const repository = new TodoRepositoryInMemory();
    const createTodo = new CreateTodo(repository);

    const todo = await createTodo.execute(todoProp);

    expect(todo).toBeInstanceOf(Todo);
    expect(todo.title).toBe(todoProp.title);
    expect(todo.userId).toBe(todoProp.userId);
  });
});
