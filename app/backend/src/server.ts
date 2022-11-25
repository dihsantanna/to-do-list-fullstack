import 'dotenv/config';
import path from 'path';
import { app } from './app';

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running! Port: ${PORT!}`));

app.get('/', (_req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})

module.exports = app;
