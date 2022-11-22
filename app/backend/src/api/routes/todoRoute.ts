import { TodoController } from '@api/controllers/Todo';
import { TodoValidate, TokenValidate } from '@api/validations';
import { TodoProgressValidate } from '@api/validations/TodoProgressValidate';
import { Container } from '@decorators/di';
import { Router } from 'express';

const todoController = Container.get<TodoController>(TodoController);

const tokenValidate = Container.get<TokenValidate>(TokenValidate);
const todoValidate = Container.get<TodoValidate>(TodoValidate);
const todoProgressValidate = Container.get<TodoProgressValidate>(TodoProgressValidate);

const todoRoute = Router();

todoRoute.post('/todos', tokenValidate.validate, todoValidate.validate, todoController.create);
todoRoute.get('/todos', tokenValidate.validate, todoController.getAllTodos);
todoRoute.patch('/todos/title/:id', tokenValidate.validate, todoValidate.validate, todoController.editTitle);
todoRoute.patch('/todos/progress/:id', tokenValidate.validate, todoProgressValidate.validate, todoController.changeTodoProgress);
todoRoute.delete('/todos/:id', tokenValidate.validate, todoController.deleteTodo);

export { todoRoute };
