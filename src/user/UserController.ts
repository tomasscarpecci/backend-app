import { User } from "./User.Entity";
import { UserService } from "../user/UserService";
import { EntityManager } from '@mikro-orm/core';
import { NextFunction, Request, Response } from 'express';
import { ObjectId } from '@mikro-orm/mongodb';
import { Newcategory } from "./Newscategory.Entity";

/*
  En los Controllers se deben utilizar funciones flecha (arrow functions), porque dichas funciones
  se pasan en los routers de la siguiente manera: router.get('/', userController.getAllUsers);
  con lo cual el "this" dentro del controller pierde el contexto si la funcion es una funcion convencional de javascript. (Para mas info, diferencias entre funciones y funciones flecha)
*/


export default class UserController {

    private em: EntityManager;
      
        constructor(em: EntityManager) {
          this.em = em;
        }

  //Middleware para sanetizar las entradas

  public sanitizeUserInput = (req: Request, res: Response, next:NextFunction): void => {
    req.body.sanitizedInput = { 
      Nombre: req.body.Nombre, 
      Apellido: req.body.Apellido, 
      Mail: req.body.Mail, 
      Clave: req.body.Clave
      }
      next()
  };

  public getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
    const users = await this.em.find(
      User, {}, { populate: ['newscategories'] }
    )
    res.status(200).json({ message: 'found all users', data: users })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
  };

  public getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id;
        const objectId = new ObjectId(id);
        const user = await this.em.findOneOrFail(User, { _id: objectId }, { populate: ['newscategories'] });
        res.status(200).json({ message: 'found user', data: user });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
  };


  public createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Request Body:", req.body);
    const { newscategories, ...userData } = req.body;
    const user = this.em.create(User, userData);
    if (Array.isArray(newscategories) && newscategories.length > 0) {
      const categoryIds = newscategories.map((id: any) => new ObjectId(id));
      const categories = await this.em.find(Newcategory, { _id: { $in: categoryIds } });
      if (categories.length !== newscategories.length) {
        res.status(404).json({ message: 'One or more categories not found' });
        return;
      }
      user.newscategories.set(categories);
    }
    await this.em.persistAndFlush(user);
    res.status(201).json({ message: 'User created', data: user });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

  
public updateUser = async (req: Request, res: Response): Promise<void> => {
    res.status(500).json({message: 'Not implemented'})
  };


  
public deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const objectId = new ObjectId(id);
    const user = await this.em.findOne(User, { _id: objectId }, { populate: ['newscategories.users'] });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    for (const category of user.newscategories) {
      if (category.users.isInitialized()) {
        category.users.remove(user);
      } else {
        await this.em.populate(category, ['users']);
        category.users.remove(user);
      }
      this.em.persist(category);
    }
    await this.em.removeAndFlush(user);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


}

/*const userInput: User = new User(userBody.Nombre, userBody.Apellido, userBody.Mail, userBody.Clave);
 */