import { Response, Router } from 'express';

const router = Router();

router.get('/', (_request, response: Response) => {
  return response.status(200).json({ message: 'Hello World' });
});

export { router };
