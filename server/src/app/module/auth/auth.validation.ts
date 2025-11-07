import z from "zod";

export const loginSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .nonempty("Email is required")
    .email({ message: "Invalid email address" }),
  password: z
    .string({ error: "Password is required" })
    .nonempty("Password is required")
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(30, { message: "Password must be at most 30 characters long" })
    .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .regex(/(?=.*\d)/, "Password must contain at least one digit")
    .regex(
      /(?=.*[!@#$%^&*])/,
      "Password must contain at least one special character"
    ),
});
