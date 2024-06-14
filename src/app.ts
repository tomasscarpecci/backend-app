import express, { Application } from 'express';
import userRoutes from './routes/UserRoutes';

export const configureApp = (app: Application): void => {
  // Middleware para parsear el body de las requests como JSON
  app.use(express.json());
  // Middleware para parsear el body de las requests con URL encoding
  app.use(express.urlencoded({ extended: true }));

  // Configuración de rutas
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.get('/example', (req, res) => {
    res.send('Hello example!');
  });
  
  app.use('/users', userRoutes);
};