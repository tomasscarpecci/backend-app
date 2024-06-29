import { Repository } from "../shared/repository.js";
import { User } from "./UserEntity.js";
import { db } from "../shared/db/conn.js";

const users= db.collection<User>('users')

export class UserRepository implements Repository <User> {

  private usersArray: User[] = [
  { Nombre: "Tomas", Apellido: "Vuelta", Mail:"tomivuelta@gmail.com", Clave:"1111", id: 1},
  { Nombre: "Tomas", Apellido: "Scarpecci",Mail:"tomiscarpecci@gmail.com", Clave:"2222", id: 2},
  { Nombre: "Jazmin", Apellido: "Aquilante",Mail:"jazaquilante@gmail.com", Clave: "3333", id: 3},
  { Nombre: "Juan", Apellido: "Perez",Mail:"jperz@gmail.com", Clave:"4444", id: 4}
  ];
  private lastIdGenerated: number = this.usersArray.length;

  public async getAllUsers(): Promise<User[] | undefined> {
    return await users.find().toArray();
  }

  public async getUserById(id: number): Promise<User | undefined> {
    return (await users.findOne({id: id}))||undefined;
  }

  public async createUser(item: User): Promise<User | undefined> {
    const newUser: User = { ...item, id: ++this.lastIdGenerated };
    users.insertOne(newUser);
    return newUser;
  }

  public async updateUser(id: number, item: User): Promise<User | undefined> {
    const userIndex = this.usersArray.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }
    const user = this.usersArray[userIndex];
    this.usersArray[userIndex] = { ...user, ...item };
    return this.usersArray[userIndex];
  }

  public async deleteUser(id: number): Promise<User | undefined> {
    const userIndex = this.usersArray.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }
    const deletedUsers = this.usersArray[userIndex];
    this.usersArray.splice(userIndex, 1);
    return deletedUsers;
  }

}