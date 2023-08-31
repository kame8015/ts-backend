import { IsEmail } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("users")
export class User {
  @PrimaryColumn("varchar")
  id: string;

  @Column("varchar")
  name: string;

  @IsEmail()
  @Column("varchar", { nullable: true })
  email?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(name: string, email?: string, id?: string) {
    this.id = id ? id : uuidv4();
    this.name = name;
    this.email = email;
  }
}
