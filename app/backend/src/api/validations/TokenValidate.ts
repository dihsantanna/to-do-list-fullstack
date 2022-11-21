import { Container, Injectable, InjectionToken } from '@decorators/di';
import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes as status } from 'http-status-codes';
import Jwt from 'jsonwebtoken';

export const TOKEN_VALIDATE = new InjectionToken('TOKEN_VALIDATE');

@Injectable()
export class TokenValidate {
  validate = async (req: Request<{ userEmail: string }>, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ error: 'Token is required' });
      return;
    }
    try {
      Jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) throw err;
        req.userEmail = (decoded as { email: string }).email;
      });
      next();
    } catch (error) {
      res.status(status.UNAUTHORIZED).json({ error: (error as Jwt.VerifyErrors).message });
    }
  };
}

Container.provide([{ provide: TOKEN_VALIDATE, useClass: TokenValidate }]);
