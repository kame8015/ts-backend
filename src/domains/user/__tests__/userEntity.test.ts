import { validate } from "class-validator";
import { User } from "../userEntity";

describe("UserEntity", () => {
  test("should validate with correct name and email", async () => {
    const user = new User("test", "test@example.com");
    const errors = await validate(user);
    expect(errors.length).toBe(0);
  });

  test("should not validate with empty name", async () => {
    const user = new User("", "test@example.com");
    const errors = await validate(user);
    expect(errors.length).toBeGreaterThan(0);
  });

  test("should not validate with invalid email", async () => {
    const user = new User("test", "test");
    const errors = await validate(user);
    expect(errors.length).toBeGreaterThan(0);
  });
});
