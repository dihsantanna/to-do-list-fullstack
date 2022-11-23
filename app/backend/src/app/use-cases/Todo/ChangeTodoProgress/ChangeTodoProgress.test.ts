import { Todo } from '@app/entities/Todo';
import { TodoRepositoryInMemory } from '@app/repositories/Todo/InMemory';
import { describe, expect, it } from 'vitest';
import { ChangeTodoProgress } from './';

describe('Testando a classe ChangeTodoProgress:', () => {
  it('Deve ser ser possível criar uma instância;', () => {
    const repository = new TodoRepositoryInMemory();
    const changeTodoProgress = new ChangeTodoProgress(repository);

    expect(changeTodoProgress).toBeInstanceOf(ChangeTodoProgress);
  });
  it('Deve ser lançado um erro, caso "todo" não exista;', async () => {
    const repository = new TodoRepositoryInMemory();
    const changeTodoProgress = new ChangeTodoProgress(repository);

    try {
      await changeTodoProgress.execute({
        id: 'todo-id',
        completed: true
      });
    } catch (error) {
      expect((error as Error).message).toBe('Todo not exists.');
    }
  });
  it('Deve ser possível alterar o progresso do todo e retornar uma instância do "Todo" atualizado.', async () => {
    const repository = new TodoRepositoryInMemory();
    const changeTodoProgress = new ChangeTodoProgress(repository);

    const todo = new Todo({
      id: 'todo-id',
      title: 'Todo title',
      userId: 'user-id'
    });

    await repository.create(todo);

    const todoUpdated = await changeTodoProgress.execute({
      id: todo.id,
      completed: true
    });

    expect(todoUpdated).toBeInstanceOf(Todo);
    expect(todoUpdated.completed).toBe(true);
  });
});
