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
import { UserService } from "../usecases/userService";

@Controller("users") // Assuming the base route is '/users'
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() body, @Res() res) {
    if (body.name == null) {
      res.status(400).send({ message: "Name is required" });
    }
    const user = await this.userService.createUser(body.name, body.email);
    res.status(201).send(user);
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
  async updateUser(@Param("id") id, @Body() body, @Res() res) {
    const existingUser = await this.userService.getUser(id);
    if (existingUser) {
      existingUser.name = body.name;
      existingUser.email = body.email;
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
