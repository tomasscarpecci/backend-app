import { User } from "./UserEntity.js";
import { UserService } from "../user/UserService.js";
import { NextFunction, Request, Response } from 'express';

/*
  En los Controllers se deben utilizar funciones flecha (arrow functions), porque dichas funciones
  se pasan en los routers de la siguiente manera: router.get('/', userController.getAllUsers);
  con lo cual el "this" dentro del controller pierde el contexto si la funcion es una funcion convencional de javascript. (Para mas info, diferencias entre funciones y funciones flecha)
*/


export default class UserController {

  constructor() {
    this.userService = new UserService();
  }

  private userService: UserService;

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
    const userInput: User = new User(userBody.Nombre, userBody.Apellido, userBody.Mail, userBody.Clave);
    console.log('user', );
    const user = this.userService.createUser(userInput);
    res.json(user);
  }

  public updateUser = (req: Request, res: Response): void => {
    const id = +req.params.id;
    const input = {id, ...req.body.sanitizedInput}
    const userUpdated = this.userService.putUser(id, input)
    res.json(userUpdated)
  }

  public deleteUser = (req: Request, res: Response): void => {
    const id = +req.params.id;
    const result = this.userService.deleteUser(id);
    res.json(result);
  }

}
