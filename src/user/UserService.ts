import { User } from "./UserEntity";
import { createHash } from 'crypto';
import { UserRepository } from "./UserRepository.js";



export class UserService {

  private userRepository: UserRepository

  constructor(){
  this.userRepository = new UserRepository()
  }

  async createUser(user: User) {
    const hashedText = this.hashString(user.Clave);
    user.Clave = hashedText;
    const userNew = await this.userRepository.createUser(user);
    return userNew
  }
  
  async putUser(userId: number, user: User ){
    user.id= userId;
    const password = this.hasValue(user.Clave);
    if (password){
      const hashedText = this.hashString(user.Clave);
      user.Clave = hashedText;
    }
    return await this.userRepository.updateUser(user.id,user);
  }

  async getUsers() {
    const users= await this.userRepository.getAllUsers();
    return users
  }

  async getUser(userId: number){
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      return 'Usuario NO encontrado';
    } {
      return user;
    }
  }

  async deleteUser(userId: number) {
    const userDeleted = await this.userRepository.deleteUser(userId);
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

