import { FindUserByEmail, FIND_USER_BY_EMAIL } from '@app/use-cases/User/FindUserByEmail';
import { Inject } from '@decorators/di';
import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes as status } from 'http-status-codes';
import Jwt from 'jsonwebtoken';

export class TokenValidate {
  constructor(
    @Inject(FIND_USER_BY_EMAIL) private readonly findUser: FindUserByEmail
  ) {}

  validate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      res.status(status.UNAUTHORIZED).json({ error: 'Token is required.' });
      return;
    }
    try {
      const decoded = Jwt.verify(token, process.env.JWT_SECRET!) as Jwt.JwtPayload;

      await this.findUser.execute(decoded.email);

      req.userEmail = decoded.email;

      next();
    } catch (error) {
      res.status(status.UNAUTHORIZED).json({ error: (error as Jwt.VerifyErrors).message });
    }
  };
}
