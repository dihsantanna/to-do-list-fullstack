import { Todo } from '@app/entities/Todo';
import { TodoRepositoryInMemory } from '@app/repositories/Todo/InMemory';
import { describe, expect, it } from 'vitest';
import { ChangeTodoTitle } from './';

describe('Testando a classe ChangeTodoTitle:', () => {
  it('Deve ser ser possível criar uma instância;', () => {
    const repository = new TodoRepositoryInMemory();
    const changeTodoTitle = new ChangeTodoTitle(repository);

    expect(changeTodoTitle).toBeInstanceOf(ChangeTodoTitle);
  });
  it('Deve ser lançado um erro, caso "todo" não exista;', async () => {
    const repository = new TodoRepositoryInMemory();
    const changeTodoTitle = new ChangeTodoTitle(repository);

    try {
      await changeTodoTitle.execute({
        id: 'todo-id',
        title: 'Todo title'
      });
    } catch (error) {
      expect((error as Error).message).toBe('Todo not exists.');
    }
  });
  it('Deve ser possível alterar o título do todo e retornar uma instância do "Todo" atualizado.', async () => {
    const repository = new TodoRepositoryInMemory();
    const changeTodoTitle = new ChangeTodoTitle(repository);

    const todo = new Todo({
      id: 'todo-id',
      title: 'Todo title',
      userId: 'user-id'
    });

    await repository.create(todo);

    const todoUpdated = await changeTodoTitle.execute({
      id: todo.id,
      title: 'Todo title updated'
    });

    expect(todoUpdated).toBeInstanceOf(Todo);
    expect(todoUpdated.title).toBe('Todo title updated');
  });
});
