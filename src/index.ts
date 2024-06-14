import express, { response } from 'express';
import { configureApp } from './app.js';

const app = express();
configureApp(app);
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});