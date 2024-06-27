import { Repository } from "../shared/repository.js";
import { User } from "./UserEntity.js";

export class UserRepository implements Repository <User> {

  private users: User[] = [
  { Nombre: "Tomas", Apellido: "Vuelta", Mail:"tomivuelta@gmail.com", Clave:"1111", id: 1},
  { Nombre: "Tomas", Apellido: "Scarpecci",Mail:"tomiscarpecci@gmail.com", Clave:"2222", id: 2},
  { Nombre: "Jazmin", Apellido: "Aquilante",Mail:"jazaquilante@gmail.com", Clave: "3333", id: 3},
  { Nombre: "Juan", Apellido: "Perez",Mail:"jperz@gmail.com", Clave:"4444", id: 4}
  ];
  private lastIdGenerated: number = this.users.length;

  public getAllUsers(): User[] | undefined {
    return this.users
  }

  public getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id)
  }

  public createUser(item: User): User | undefined {
    const newUser: User = { ...item, id: ++this.lastIdGenerated };
    this.users.push(newUser);
    return newUser;
  }

  public updateUser(id: number, item: User): User | undefined {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }
    const user = this.users[userIndex];
    this.users[userIndex] = { ...user, ...item };
    return this.users[userIndex];
  }

  public deleteUser(id: number): User | undefined {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }
    const deletedUsers = this.users[userIndex];
    this.users.splice(userIndex, 1);
    return deletedUsers;
  }

}