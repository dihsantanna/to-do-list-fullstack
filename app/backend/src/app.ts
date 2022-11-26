import cors from 'cors';
import express from 'express';
import { todoRoute, userRoute } from './api/routes';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'todo-api is running'
  });
});

app.use('/.netlify/functions/server', userRoute);
app.use('/.netlify/functions/server', todoRoute);

export { app };
