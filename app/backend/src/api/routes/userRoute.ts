import { UserController } from '@api/controllers/User';
import { SingInValidate, UserValidate } from '@api/validations';
import { Container } from '@decorators/di';
import { Router } from 'express';

const userController = Container.get<UserController>(UserController);

const userValidate = Container.get<UserValidate>(UserValidate);
const singInValidate = Container.get<SingInValidate>(SingInValidate);

const userRoute = Router();

userRoute.post('/users/register', userValidate.validate, userController.create);

userRoute.post('/users/sing-in', singInValidate.validate, userController.singIn);

export { userRoute };
