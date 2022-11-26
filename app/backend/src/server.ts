import 'dotenv/config';
import serverless from 'serverless-http';
import { app } from './app';

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running! Port: ${PORT!}`));

module.exports.handler = serverless(app);
