import express, { response } from 'express';
import { UserService } from './services/UserService'
import { User } from './entities/User';
import { request } from 'http';

const app = express();
const port = 3000;

// Middleware para parsear el body de las requests como JSON
app.use(express.json());

// Middleware para parsear el body de las requests con URL encoding
app.use(express.urlencoded({ extended: true }));

const userService: UserService = new UserService();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/example', (req, res) => {
  res.send('Hello example!');
});

// USER CONTROLLER

// METODO GET --> Obtener listado de usuarios

app.get('/user',  (request, response) => {
  const users = userService.getUsers();
  response.json({message:'Listado de Usuarios',users});
})

// METODO GET ONE --> Obtener un usuario con id = :id

app.get('/user/:id', (request, response) => {
  const id = +request.params.id;
  const result = userService.getUser(id);
  response.json(result);
})

//METODO POST --> Crear nuevos usuarios

app.post('/user', (request, response) => {
  const userBody = request.body;
  const user: User = new User(userBody.Nombre, userBody.Apellido, userBody.Mail)
  console.log('user', );
  userService.createUser(user);
  response.json(user);
})

//METODO PUT --> Modificar Usuario con id = :id (recurso completo e idempotente)

app.put('/user/:id', (request, response) => {
  const id = +request.params.id;
  const userIndex = userService.getUserIndex(id);
  if (userIndex == -1){
    response.json('No lo encontre')
  }
  const input = {id, Nombre: request.body.Nombre, Apellido: request.body.Apellido, Mail: request.body.Mail}
  const userUpdated = userService.putUser(userIndex, input)
  response.json(userUpdated)
  
} )

//METODO PATCH --> Modificar Usuario con id = :id (recurso parcial)

app.patch('/user/:id', (request, response) => {
  const id = +request.params.id;
  const userIndex = userService.getUserIndex(id);
  if (userIndex == -1){
    response.json('No lo encontre')
  }
  const userUpdated = userService.updateUser(userIndex, request.body)
  response.json(userUpdated)
  
} )

//METODO DELETE --> Borrar Usuario con id = :id

app.delete('/user/:id', (request, response) => {
  const id = +request.params.id;
  const result = userService.deleteUser(id);
  response.json(result);
})


// END USER CONTROLLER

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});