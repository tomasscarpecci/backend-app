import { User } from "./UserEntity";
import { createHash } from 'crypto';
import { UserRepository } from "./UserRepository.js";



export class UserService {

  private userRepository: UserRepository

  constructor(){
  this.userRepository = new UserRepository()
  }

  createUser(user: User) {
    const hashedText = this.hashString(user.Clave);
    user.Clave = hashedText;
    const userNew = this.userRepository.createUser(user);
    return userNew
  }
  
  putUser(userId: number, user: User ){
    user.id= userId;
    const password = this.hasValue(user.Clave);
    if (password){
      const hashedText = this.hashString(user.Clave);
      user.Clave = hashedText;
    }
    return this.userRepository.updateUser(user.id,user);
  }

  getUsers() {
    const users= this.userRepository.getAllUsers();
    return users
  }

  getUser(userId: number){
    const user = this.userRepository.getUserById(userId);
    if (!user) {
      return 'Usuario NO encontrado';
    } {
      return user;
    }
  }

  deleteUser(userId: number) {
    const userDeleted = this.userRepository.deleteUser(userId);
    return userDeleted;
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

