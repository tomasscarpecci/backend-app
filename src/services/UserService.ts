import { User } from "../entities/User";



export class UserService {

  private users: User[] = [
  { firstName: "tomi", lastName: "Vuelta", nickName:"toto", id: 1},
  { firstName: "tomi 2", lastName: "Vuelta 2",nickName:"toto", id: 2},
  { firstName: "tomi 3", lastName: "Vuelta 3",nickName:"toto", id: 3},
  { firstName: "tomi 4", lastName: "Vuelta 4",nickName:"toto", id: 4}
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