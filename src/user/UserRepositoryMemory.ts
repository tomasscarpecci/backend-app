import { Repository } from "../shared/repository";
import { User } from "./User.Entity";
/*Esta capa era de cuando trabajamos en memoria y no base de datos, la guarde por las dudas pero no le den bola porque no sirve*/
export class UserRepository implements Repository <User> {

  private users: User[] = []/*[
  { Nombre: "Tomas", Apellido: "Vuelta", Mail:"tomivuelta@gmail.com", Clave:"1111", id: 1},
  { Nombre: "Tomas", Apellido: "Scarpecci",Mail:"tomiscarpecci@gmail.com", Clave:"2222", id: 2},
  { Nombre: "Jazmin", Apellido: "Aquilante",Mail:"jazaquilante@gmail.com", Clave: "3333", id: 3},
  { Nombre: "Juan", Apellido: "Perez",Mail:"jperz@gmail.com", Clave:"4444", id: 4}
  ];*/
  private lastIdGenerated: number = this.users.length;

  public async getAllUsers(): Promise<User[] | undefined> {
    return this.users;
  }

  public async getUserById(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async createUser(item: User): Promise<User | undefined> {
    const newUser: User = { ...item, id: ++this.lastIdGenerated };
    this.users.push(newUser);
    return newUser;
  }

  public async updateUser(id: number, item: User): Promise<User | undefined> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }
    const user = this.users[userIndex];
    this.users[userIndex] = { ...user, ...item };
    return this.users[userIndex];
  }

  public async deleteUser(id: number): Promise<User | undefined> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }
    const deletedUsers = this.users[userIndex];
    this.users.splice(userIndex, 1);
    return deletedUsers;
  }

}