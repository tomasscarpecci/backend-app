import { User } from "../entities/User.js";
import { UserService } from "../services/UserService.js";
import { Request, Response } from 'express';

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
    const userBody = req.body;
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
    const input = {id, Nombre: req.body.Nombre, Apellido: req.body.Apellido, Mail: req.body.Mail, Clave: req.body.Clave}
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



/*export const UserController = (app: any) => {
  const userService: UserService = new UserService(); 
  
  app.get('/user', (request: any, response: any) => {
    const users = userService.getUsers();
    response.json({message:'Listado de Usuarios',users});
  })

  // METODO GET ONE --> Obtener un usuario con id = :id

  app.get('/user/:id', (request: any, response: any) => {
    const id = +request.params.id;
    const result = userService.getUser(id);
    response.json(result);
  })

  //METODO POST --> Crear nuevos usuarios

  app.post('/user', (request: any, response: any) => {
    const userBody = request.body;
    const user: User = new User(userBody.Nombre, userBody.Apellido, userBody.Mail, userBody.Clave);
    console.log('user', );
    userService.createUser(user);
    response.json(user);
  })

  //METODO PUT --> Modificar Usuario con id = :id (recurso completo e idempotente)

  app.put('/user/:id', (request: any, response: any) => {
    const id = +request.params.id;
    const userIndex = userService.getUserIndex(id);
    if (userIndex == -1){
      response.json('No lo encontre')
    }
    const input = {id, Nombre: request.body.Nombre, Apellido: request.body.Apellido, Mail: request.body.Mail, Clave: request.body.Clave}
    const userUpdated = userService.putUser(userIndex, input)
    response.json(userUpdated)
    
  } )

  //METODO PATCH --> Modificar Usuario con id = :id (recurso parcial)

  app.patch('/user/:id', (request: any, response: any) => {
    const id = +request.params.id;
    const userIndex = userService.getUserIndex(id);
    if (userIndex == -1){
      response.json('No lo encontre')
    }
    const userUpdated = userService.updateUser(userIndex, request.body)
    response.json(userUpdated)
    
  } )

  //METODO DELETE --> Borrar Usuario con id = :id

  app.delete('/user/:id', (request: any, response: any) => {
    const id = +request.params.id;
    const result = userService.deleteUser(id);
    response.json(result);
  })
} */