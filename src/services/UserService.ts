import { User } from "../entities/User";



export class UserService {

  private users: User[] = [];
  private lastIdGenerated: number = 0;

  createUser(user: User) {
    user.id = ++this.lastIdGenerated;
    this.users.push(user);
  }

  updateUser(user:any) {
    console.log("Editando un usuario  " + user.name);
  }

  getUsers() {
    return this.users;
  }

  getUser(userId: number){
    const user = this.users.find((user) => { return user.id === userId });
    if (!user) {
      return 'no lo encontre';
    } {
      return user;
    }
  }

  deleteUser(userId: number) {
    const userIndex = this.users.findIndex((user) => { return user.id === userId });
    if (userIndex > -1) {
      this.users.splice(userIndex, 1);
      return 'usuario eliminado con éxito';
    } {
      return 'no lo encontre';
    }
  }
}