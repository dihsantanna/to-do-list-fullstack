import { Todo } from '@app/entities/Todo';
import { TodoRepositoryInMemory } from '@app/repositories/Todo/InMemory';
import { describe, expect, it } from 'vitest';
import { DeleteTodo } from './';

describe('Testando a classe DeleteTodo:', () => {
  it('Deve ser ser possível criar uma instância;', () => {
    const repository = new TodoRepositoryInMemory();
    const changeTodoTitle = new DeleteTodo(repository);

    expect(changeTodoTitle).toBeInstanceOf(DeleteTodo);
  });
  it('Deve ser lançado um erro, caso "todo" não exista;', async () => {
    const repository = new TodoRepositoryInMemory();
    const changeTodoTitle = new DeleteTodo(repository);

    try {
      await changeTodoTitle.execute('todo-id');
    } catch (error) {
      expect((error as Error).message).toBe('Todo not exists.');
    }
  });
  it('Deve ser possível deletar o todo e retornar uma instância do "Todo" atualizado.', async () => {
    const repository = new TodoRepositoryInMemory();
    const changeTodoTitle = new DeleteTodo(repository);

    const todo = new Todo({
      id: 'todo-id',
      title: 'Todo title',
      userId: 'user-id'
    });

    await repository.create(todo);

    const todoDeleted = await changeTodoTitle.execute('todo-id');

    expect(todoDeleted).toBeInstanceOf(Todo);
    expect(todoDeleted).toEqual(todo);
  });
});
