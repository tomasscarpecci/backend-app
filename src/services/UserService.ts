import { User } from "../entities/User";



export class UserService {

  private users: User[] = [
  { Nombre: "Tomas", Apellido: "Vuelta", Mail:"tomivuelta@gmail.com", id: 1},
  { Nombre: "Tomas", Apellido: "Scarpecci",Mail:"tomiscarpecci@gmail.com", id: 2},
  { Nombre: "Jazmin", Apellido: "Aquilante",Mail:"jazaquilante@gmail.com", id: 3},
  { Nombre: "Juan", Apellido: "Perez",Mail:"jperz@gmail.com", id: 4}
  ];
  private lastIdGenerated: number = this.users.length;

  createUser(user: User) {
    user.id = ++this.lastIdGenerated;
    this.users.push(user);
  }

  getUserIndex(userId: number) {
    const userIndex = this.users.findIndex((user) => { return user.id === userId });
    if (userIndex > -1) {
      return userIndex
    } {
      return -1;
    }
  }

  updateUser(userInd: number, user: User ){
    this.users[userInd] = {...this.users[userInd], ...user};
    return this.users[userInd];
  }

  
  putUser(userInd: number, user: User ){
    user.id = this.users[userInd].id;
    this.users[userInd] = user;
    return this.users[userInd];
  }


  getUsers() {
    return this.users;
  }

  getUser(userId: number){
    const user = this.users.find((user) => { return user.id === userId });
    if (!user) {
      return 'Usuario NO encontrado';
    } {
      return user;
    }
  }

  deleteUser(userId: number) {
    const userIndex = this.users.findIndex((user) => { return user.id === userId });
    if (userIndex > -1) {
      this.users.splice(userIndex, 1);
      return 'Usuario eliminado con éxito';
    } {
      return 'Usuario NO encontrado';
    }
  }
}