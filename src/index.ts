import express from 'express';
import { UserService } from './services/UserService'
import { User } from './entities/User';

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

app.get('/user',  (request, response) => {
  const users = userService.getUsers();
  response.json(users);
})

// USER CONTROLLER
app.post('/user', (request, response) => {
  const userBody = request.body;
  const user: User = new User(userBody.firstName, userBody.lastName)
  console.log('user', );
  userService.createUser(user);
  response.json(user)
})

app.put('/user', (request, response) => {
   const user = request.body;
  userService.updateUser(user);
  response.json(user)
})

app.delete('/user/:id', (request, response) => {
  const id = +request.params.id;
  const result = userService.deleteUser(id);
  response.json(result);
})
// END USER CONTROLLER

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});