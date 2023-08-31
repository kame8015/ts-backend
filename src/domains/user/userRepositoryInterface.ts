import { User } from "./userEntity";

export interface UserRepositoryInterface {
  findAll(): Promise<User[]>;
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  update(user: User): Promise<void>;
  deleteById(id: string): Promise<void>;
}
