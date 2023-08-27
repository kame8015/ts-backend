import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./domains/user/userEntity";
import { UserRepository } from "./infrastructures/userRepository";
import { UserController } from "./presentations/userController";
import { UserService } from "./usecases/userService";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: "./src/configs/.env",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get<string>("DATABASE_HOST"),
        port: configService.get<number>("DATABASE_PORT"),
        username: configService.get<string>("DATABASE_USER"),
        password: configService.get<string>("DATABASE_PASSWORD"),
        database: configService.get<string>("DATABASE_NAME"),
        entities: [User],
        synchronize: true,
        timezone: "Asia/Tokyo",
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    { provide: "UserRepositoryInterface", useClass: UserRepository },
  ],
})
export class AppModule {}
