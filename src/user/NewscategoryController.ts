import { EntityManager } from '@mikro-orm/core';
import { Newcategory } from "./Newscategory.Entity";
import { NextFunction, Request, Response } from 'express';
import { ObjectId } from '@mikro-orm/mongodb';
import { New } from './New.Entity';
import { User } from './User.Entity';

/*
  En los Controllers se deben utilizar funciones flecha (arrow functions), porque dichas funciones
  se pasan en los routers de la siguiente manera: router.get('/', userController.getAllUsers);
  con lo cual el "this" dentro del controller pierde el contexto si la funcion es una funcion convencional de javascript. (Para mas info, diferencias entre funciones y funciones flecha)
*/

export default class NewscategoryController {
  
  
  private em: EntityManager;

  constructor(em: EntityManager) {
    this.em = em;
  }

  public getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const categories = await this.em.find(Newcategory, {}, {populate:['news']}); // Encuentra todas las categorías
      res.json ({message: 'found all categories' ,categories});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching categories' });
    }
  };

  public getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const objectId = new ObjectId(id);
      const newCategory = await this.em.findOne(Newcategory, { _id: objectId }, { populate: ['news'] });
      if (!newCategory) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }
      res.status(200).json({ message: 'Category found', data: newCategory });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  };

  public create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, news, users } = req.body;
    const newCategory = this.em.create(Newcategory, { name });
    if (news && Array.isArray(news)) {
      for (const newsId of news) {
        const newsObjectId = new ObjectId(newsId);
        const newsEntity = await this.em.findOne(New, { _id: newsObjectId });
        if (!newsEntity) {
          res.status(404).json({ message: `News with id ${newsId} not found` });
          return;
        }
        newCategory.news.add(newsEntity);
      }
    }
    if (users && Array.isArray(users)) {
      for (const userId of users) {
        const userObjectId = new ObjectId(userId);
        const userEntity = await this.em.findOne(User, { _id: userObjectId });
        if (!userEntity) {
          res.status(404).json({ message: `User with id ${userId} not found` });
          return;
        }
        newCategory.users.add(userEntity);
      }
    }
    await this.em.persistAndFlush(newCategory);
    res.status(201).json({ message: 'Category New created', data: newCategory });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};



  public update = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const { news, users, ...updateData } = req.body;
    const newCategory = await this.em.findOne(Newcategory, { _id: objectId }, { populate: ['news', 'users'] });
    if (!newCategory) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    this.em.assign(newCategory, updateData);
    if (news && Array.isArray(news)) {
      for (const newsId of news) {
        const newsObjectId = new ObjectId(newsId);
        const newsEntity = await this.em.findOne(New, { _id: newsObjectId });
        if (!newsEntity) {
          res.status(404).json({ message: `News with id ${newsId} not found` });
          return;
        }
        newCategory.news.add(newsEntity);
      }
    }
    if (users && Array.isArray(users)) {
      for (const userId of users) {
        const userObjectId = new ObjectId(userId);
        const userEntity = await this.em.findOne(User, { _id: userObjectId });
        if (!userEntity) {
          res.status(404).json({ message: `User with id ${userId} not found` });
          return;
        }
        newCategory.users.add(userEntity);
      }
    }
    await this.em.flush();
    res.status(200).json({ message: 'Category updated successfully', data: newCategory });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};



  public delete = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id; 
    const objectId = new ObjectId(id);
    const newCategory = await this.em.findOne(Newcategory, { _id: objectId }, { populate: ['news', 'users'] });
    if (!newCategory) {
      res.status(404).json({ message: 'Category New not found' });
      return;
    }
    newCategory.news.removeAll();
    newCategory.users.removeAll();
    await this.em.flush();
    await this.em.removeAndFlush(newCategory);
    res.status(200).json({ message: 'Category New deleted successfully', data: newCategory });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


};

 /* public getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const newCategory = await this.em.findOne(Newcategory, { id }, { populate: ['news'] });

      if (!newCategory) {
        res.status(404).json({ message: 'Category not found' });
        return;
      }

      res.status(200).json({ message: 'found category', data: newCategory });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
  */
