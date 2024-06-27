import express, { response } from 'express';
import { configureApp } from './app.js';

const app = express();
configureApp(app);
const port = 3000;

app.use((_,res)=>{
  return res.status(404).send({message:'Resource not found'})
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});