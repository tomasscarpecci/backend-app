/*
import express, { Application } from 'express';
import userRoutes from './user/UserRoutes';
import { initORM } from './shared/db/orm.js'
import { MikroORM, RequestContext } from '@mikro-orm/core'

export const configureApp = (app: Application): void => {
  // Middleware para parsear el body de las requests como JSON
  app.use(express.json());
  // Middleware para parsear el body de las requests con URL encoding
  app.use(express.urlencoded({ extended: true }));
  
  const orm = await MikroORM.init(initORM);


  //luego de los middlewares base
  app.use((req, res, next) => {
    RequestContext.create(orm.em, next)
  })
  //antes de las rutas y middlewares de negocio

  // Configuración de rutas
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.get('/example', (req, res) => {
    res.send('Hello example!');
  });

  app.use('/users', userRoutes);
};
*/

import express, { Application } from 'express';
import UserController from './user/UserController.js';
import userRoutes from './user/UserRoutes';
import NewscategoryRoutes from './user/NewscategoryRoutes';
import NewscategoryController from './user/NewscategoryController';
import newRoutes from './user/NewRoutes';
import NewController from './user/NewController';
import editorialRoutes from './user/EditorialRoutes';
import EditorialController from './user/EditorialController';
import { initORM } from './shared/db/orm';
import { MikroORM, RequestContext } from '@mikro-orm/core';

export const configureApp = async (app: Application): Promise<void> => {
  // Middleware para parsear el body de las requests como JSON
  app.use(express.json());

  // Middleware para parsear el body de las requests con URL encoding
  app.use(express.urlencoded({ extended: true }));

  // Inicializar MikroORM
  const orm = await MikroORM.init(initORM)
  console.log('MikroORM initialized successfully');

  // Middleware de RequestContext
  app.use((req, res, next) => {
  try {
    RequestContext.create(orm.em, next);
  } catch (error) {
    console.error('Error creating RequestContext:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
  });


  // Configuración de rutas
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.get('/example', (req, res) => {
    res.send('Hello example!');
  });

  const newCategoryController = new NewscategoryController(orm.em);
  const newController = new NewController(orm.em);
  const editorialController = new EditorialController(orm.em);
  const userController = new UserController(orm.em)

  app.use('/users', userRoutes(userController));
  app.use('/news/category', NewscategoryRoutes(newCategoryController));
  app.use('/news', newRoutes(newController));
  app.use('/editorial', editorialRoutes(editorialController));


};


/*app.use((req, res, next) => {
    RequestContext.create(orm.em, next);
  });
  
  */
