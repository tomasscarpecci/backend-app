import { User } from "../entities/User";
import { createHash } from 'crypto';



export class UserService {

  private users: User[] = [
  { Nombre: "Tomas", Apellido: "Vuelta", Mail:"tomivuelta@gmail.com", Clave:"1111", id: 1},
  { Nombre: "Tomas", Apellido: "Scarpecci",Mail:"tomiscarpecci@gmail.com", Clave:"2222", id: 2},
  { Nombre: "Jazmin", Apellido: "Aquilante",Mail:"jazaquilante@gmail.com", Clave: "3333", id: 3},
  { Nombre: "Juan", Apellido: "Perez",Mail:"jperz@gmail.com", Clave:"4444", id: 4}
  ];
  private lastIdGenerated: number = this.users.length;

  createUser(user: User) {
    user.id = ++this.lastIdGenerated;
    const hashedText = this.hashString(user.Clave);
    user.Clave = hashedText;
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
    const password = this.hasValue(user.Clave);
    if (password){
      const hashedText = this.hashString(user.Clave);
      user.Clave = hashedText;
    }
    this.users[userInd] = {...this.users[userInd], ...user};
    return this.users[userInd];
  }

  
  putUser(userInd: number, user: User ){
    user.id = this.users[userInd].id;
    const password = this.hasValue(user.Clave);
    if (password){
      const hashedText = this.hashString(user.Clave);
      user.Clave = hashedText;
    }
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
   hashString(plainText: string): string {
    const hash = createHash('sha256');
    hash.update(plainText);
    return hash.digest('hex');
   }

  hasValue(attr: string): boolean {
    return attr !== null && attr !== undefined;
  }
}