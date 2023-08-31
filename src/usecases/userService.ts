import { Inject } from "@nestjs/common";
import { User } from "src/domains/user/userEntity";
import { UserRepositoryInterface } from "src/domains/user/userRepositoryInterface";

export class UserService {
  constructor(
    @Inject("UserRepositoryInterface")
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async createUser(name: string, email?: string): Promise<User> {
    const user = new User(name, email);
    await this.userRepository.save(user);
    return user;
  }

  async getUser(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async updateUser(user: User): Promise<void> {
    await this.userRepository.update(user);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
