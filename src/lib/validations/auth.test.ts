import { describe, expect, it } from "vitest";
import { loginSchema, registerSchema } from "./auth";

describe("auth validation schemas", () => {
  it("normalizes valid register input", () => {
    const result = registerSchema.parse({
      name: "  Ada Lovelace  ",
      email: "ADA@example.COM ",
      password: "password123",
    });

    expect(result).toEqual({
      name: "Ada Lovelace",
      email: "ada@example.com",
      password: "password123",
    });
  });

  it("rejects short register passwords", () => {
    const result = registerSchema.safeParse({
      name: "Ada Lovelace",
      email: "ada@example.com",
      password: "short",
    });

    expect(result.success).toBe(false);
  });

  it("requires a password when logging in", () => {
    const result = loginSchema.safeParse({
      email: "ada@example.com",
      password: "",
    });

    expect(result.success).toBe(false);
  });
});
