import { User } from "./UserEntity.js";
import { UserService } from "../user/UserService.js";
import { NextFunction, Request, Response } from 'express';

/*
  En los Controllers se deben utilizar funciones flecha (arrow functions), porque dichas funciones
  se pasan en los routers de la siguiente manera: router.get('/', userController.getAllUsers);
  con lo cual el "this" dentro del controller pierde el contexto si la funcion es una funcion convencional de javascript. (Para mas info, diferencias entre funciones y funciones flecha)
*/

 

export default class UserController {

  private userService: UserService;

  constructor() {
    this.userService = new UserService();
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
  }

  public getAllUsers = (req: Request, res: Response): void => {
    const users = this.userService.getUsers();
    res.json({message:'Listado de Usuarios',users});
  }

  public getUserById = (req: Request, res: Response): void => {
    const id = +req.params.id;
    const result = this.userService.getUser(id);
    res.json(result);
  }

  public createUser = (req: Request, res: Response): void => {
    const userBody = req.body.sanitizedInput;
    const user: User = new User(userBody.Nombre, userBody.Apellido, userBody.Mail, userBody.Clave);
    console.log('user', );
    this.userService.createUser(user);
    res.json(user);
  }

  public updateUser = (req: Request, res: Response): void => {
    const id = +req.params.id;
    const userIndex = this.userService.getUserIndex(id);
    if (userIndex == -1){
      res.json('No lo encontre')
    }
    const input = {id, ...req.body.sanitizedInput}
    const userUpdated = this.userService.putUser(userIndex, input)
    res.json(userUpdated)
  }

  public deleteUser = (req: Request, res: Response): void => {
    const id = +req.params.id;
    const result = this.userService.deleteUser(id);
    res.json(result);
  }

  public patchUser = (req: Request, res: Response): void => {
    const id = +req.params.id;
    const userIndex = this.userService.getUserIndex(id);
    if (userIndex == -1){
      res.json('No lo encontre')
    }
    const userUpdated = this.userService.updateUser(userIndex, req.body)
    res.json(userUpdated)
  }
}

//Lo de abajo, iba en el updateUser
//const input = {id, Nombre: req.body.Nombre, Apellido: req.body.Apellido, Mail: req.body.Mail, Clave: req.body.Clave}

//Lo de abajo, iba en el createUser
//const userBody = req.body;
//const user: User = new User(userBody.Nombre, userBody.Apellido, userBody.Mail, userBody.Clave);