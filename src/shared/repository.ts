export interface Repository <T> {
  getAllUsers(): T[]|undefined
  getUserById(id: number): T|undefined
  createUser(item: T): T|undefined
  updateUser(id: number, item: T): T|undefined
  deleteUser(id: number): T|undefined
}