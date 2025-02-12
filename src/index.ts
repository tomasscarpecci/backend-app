/*import express, { response } from 'express';
import { configureApp } from './app';

const app = express();
configureApp(app);
const port = 3000;

app.use((_,res)=>{
  return res.status(404).send({message:'Resource not found'})
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});*/


import express, { response } from 'express';
import { configureApp } from './app';

const app = express();
const port = 3000;

configureApp(app).then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Failed to configure app:', err);
});

/* app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' });
}); */
