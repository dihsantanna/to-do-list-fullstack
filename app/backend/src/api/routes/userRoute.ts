import { UserController } from '@api/controllers/User';
import { SingInValidate, TokenValidate, UserValidate } from '@api/validations';
import { Container } from '@decorators/di';
import { Router } from 'express';

const userController = Container.get<UserController>(UserController);

const singInValidate = Container.get<SingInValidate>(SingInValidate);
const tokenValidate = Container.get<TokenValidate>(TokenValidate);
const userValidate = Container.get<UserValidate>(UserValidate);

const userRoute = Router();

userRoute.post('/users/register', userValidate.validate, userController.create);

userRoute.post('/users/sing-in', singInValidate.validate, userController.singIn);

userRoute.get('/users/validate', tokenValidate.validate, userController.validate);

export { userRoute };
