import cors from "cors";
import express from "express";
import { todoRoute, userRoute } from "./api/routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRoute);
app.use(todoRoute);

export default app;
