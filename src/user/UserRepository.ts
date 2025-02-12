import { Repository } from "../shared/repository";
import { User } from "./User.Entity";
import { db } from "../shared/db/conn";

const users= db.collection<User>('users');

export class UserRepository implements Repository <User> {

  private lastIdGenerated: number = 0;

  private async initializeLastIdGenerated() {
    this.lastIdGenerated = await users.estimatedDocumentCount();
  }

  public async getAllUsers(): Promise<User[] | undefined> {
    return await users.find().toArray();
  }

  public async getUserById(id: number): Promise<User | undefined> {
    return (await users.findOne({id: id}))||undefined;
  }

  public async createUser(item: User): Promise<User | undefined> {
    if (this.lastIdGenerated === 0) {
      await this.initializeLastIdGenerated();
    }
    const newUser: User = { ...item, id: ++this.lastIdGenerated };
    users.insertOne(newUser);
    return newUser;
  }

  public async updateUser(id: number, item: User): Promise<User | undefined> {
    return (await users.findOneAndUpdate({id: id}, {$set: item}, {returnDocument: 'after'}))||undefined
  }

  public async deleteUser(id: number): Promise<User | undefined> {
    return (await users.findOneAndDelete({id: id})) || undefined
  }

}

/*import { db } from "../shared/db/conn.js";

const users= db.collection<User>('users'); */