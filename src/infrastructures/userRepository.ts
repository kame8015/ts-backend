import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as moment from "moment-timezone";
import { User } from "src/domains/user/userEntity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async save(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  async update(user: User): Promise<void> {
    const existingUser = await this.userRepository.findOne({
      where: { id: user.id },
    });
    if (existingUser) {
      user.updatedAt = moment().tz("Asia/Tokyo").toDate(); // updatedAtのみを更新
      await this.userRepository.save(user);
    } else {
      throw new Error("User not found");
    }
  }

  async deleteById(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
