import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from "@nestjs/common";
import { User } from "src/domains/user/userEntity";
import { UserService } from "../usecases/userService";

@Controller("users") // Assuming the base route is '/users'
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUsers(@Res() res) {
    const users = await this.userService.getUsers();
    res.send(users);
  }

  @Post()
  async createUser(@Body() user: User, @Res() res) {
    if (user.name == null) {
      res.status(400).send({ message: "Name is required" });
    }
    const resUser = await this.userService.createUser(user.name, user.email);
    res.status(201).send(resUser);
  }

  @Get(":id")
  async getUser(@Param("id") id, @Res() res) {
    const user = await this.userService.getUser(id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  }

  @Put(":id")
  async updateUser(@Param("id") id, @Body() user: User, @Res() res) {
    const existingUser = await this.userService.getUser(id);
    if (existingUser) {
      existingUser.name = user.name;
      existingUser.email = user.email;
      await this.userService.updateUser(existingUser);
      res.send(existingUser);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  }

  @Delete(":id")
  async deleteUser(@Param("id") id, @Res() res) {
    const user = await this.userService.getUser(id);
    if (user) {
      await this.userService.deleteUser(id);
      res.send(user);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  }
}
