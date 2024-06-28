export interface Repository <T> {
  getAllUsers(): Promise<T[]|undefined>
  getUserById(id: number): Promise<T|undefined>
  createUser(item: T): Promise<T|undefined>
  updateUser(id: number, item: T): Promise<T|undefined>
  deleteUser(id: number): Promise<T|undefined>
}