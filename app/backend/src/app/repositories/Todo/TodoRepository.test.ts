import { Todo } from '@app/entities/Todo';
import { db } from '@db/index';
import { Todo as TodoModel } from '@prisma/client';
import { afterEach, beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest';
import { TodoRepository } from './TodoRepository';

const todoProp = new Todo({
  title: 'Todo title',
  userId: 'user-id'
});

const { id, title, userId, completed, createdAt, updatedAt } = todoProp;

const mockDB = () => {
  db.$connect = vi.fn();
  db.$disconnect = vi.fn();
  db.todo.create = vi.fn();
  db.todo.findUnique = vi.fn();
  db.todo.update = vi.fn();
  db.todo.delete = vi.fn();

  (db.todo.create as unknown as MockedFunction<typeof db.todo.create>)
    .mockResolvedValue({ id, title, userId, completed, createdAt, updatedAt } as TodoModel);
  (db.todo.findUnique as unknown as MockedFunction<typeof db.todo.findUnique>)
    .mockResolvedValue({ id, title, userId, completed, createdAt, updatedAt } as TodoModel);
  (db.todo.update as unknown as MockedFunction<typeof db.todo.update>)
    .mockResolvedValue({ id, title, userId, completed, createdAt, updatedAt } as TodoModel);
  (db.todo.delete as unknown as MockedFunction<typeof db.todo.delete>)
    .mockResolvedValue({ id, title, userId, completed, createdAt, updatedAt } as TodoModel);
};

describe('Testando classe TodoRepository', () => {
  beforeEach(() => {
    mockDB();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Deve ser possível criar uma instância;', () => {
    const todoRepository = new TodoRepository(db);
    expect(todoRepository).toBeInstanceOf(TodoRepository);
  });

  describe('Testando método DbConnection:', () => {
    it('Deve ser possível chamar o método;', async () => {
      const todoRepository = new TodoRepository(db);
      await todoRepository.DbConnection(async () => Promise.resolve());

      expect(db.$connect).toBeCalled();
      expect(db.$disconnect).toBeCalled();
    });
    it('Deve retornar o valor correto, passado dentro da callback passada como parâmetro;', async () => {
      const todoRepository = new TodoRepository(db);
      const result = await todoRepository.DbConnection<string>(async () => Promise.resolve('result'));

      expect(result).toBe('result');
    });
  });

  describe('Testando método create:', () => {
    it('Deve ser possível chamar o método;', async () => {
      const todoRepository = new TodoRepository(db);
      await todoRepository.create(todoProp);

      expect(db.todo.create).toBeCalled();
    });
    it('Deve retornar uma instância da classe "Todo";', async () => {
      const todoRepository = new TodoRepository(db);

      const result = await todoRepository.create(todoProp);

      expect(result).toBeInstanceOf(Todo);
      expect(result).toEqual(todoProp);
    });
  });

  describe('Testando método findById:', () => {
    it('Deve ser possível chamar o método;', async () => {
      const todoRepository = new TodoRepository(db);
      await todoRepository.findById(id);

      expect(db.todo.findUnique).toBeCalled();
    });
    it('Deve retornar uma instância da classe "Todo";', async () => {
      const todoRepository = new TodoRepository(db);

      const result = await todoRepository.findById(id);

      expect(result).toBeInstanceOf(Todo);
      expect(result).toEqual(todoProp);
    });
    it('Deve retornar "null", caso não encontre a tarefa pelo id passado como parâmetro;', async () => {
      (db.todo.findUnique as unknown as MockedFunction<typeof db.todo.findUnique>)
        .mockResolvedValue(null);

      const userRepository = new TodoRepository(db);

      const result = await userRepository.findById(id);

      expect(result).toBeNull();
    });
  });

  describe('Testando método changeTitle:', () => {
    it('Deve ser possível chamar o método;', async () => {
      const todoRepository = new TodoRepository(db);
      await todoRepository.changeTitle(id, title);

      expect(db.todo.update).toBeCalled();
    });
    it('Deve retornar uma instância da classe "Todo";', async () => {
      const todoRepository = new TodoRepository(db);

      const result = await todoRepository.changeTitle(id, title);

      expect(result).toBeInstanceOf(Todo);
      expect(result).toEqual(todoProp);
    });
  });

  describe('Testando método changeProgress:', () => {
    it('Deve ser possível chamar o método;', async () => {
      const todoRepository = new TodoRepository(db);
      await todoRepository.changeProgress(id, !completed);

      expect(db.todo.update).toBeCalled();
    });
    it('Deve retornar uma instância da classe "Todo";', async () => {
      const todoRepository = new TodoRepository(db);

      const result = await todoRepository.changeProgress(id, !completed);

      expect(result).toBeInstanceOf(Todo);
      expect(result).toEqual(todoProp);
    });
  });

  describe('Testando método delete:', () => {
    it('Deve ser possível chamar o método;', async () => {
      const todoRepository = new TodoRepository(db);
      await todoRepository.delete(id);

      expect(db.todo.delete).toBeCalled();
    });
    it('Deve retornar uma instância da classe "Todo";', async () => {
      const todoRepository = new TodoRepository(db);

      const result = await todoRepository.delete(id);

      expect(result).toBeInstanceOf(Todo);
      expect(result).toEqual(todoProp);
    });
  });
});
