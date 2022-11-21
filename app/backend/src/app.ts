import { userRoute } from '@api/routes';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRoute);

export { app };
