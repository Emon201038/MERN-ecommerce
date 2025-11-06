import z from "zod";

export const createUserZodSchema = z.object({
  fullName: z
    .string({ error: "Full name is required" })
    .nonempty("Full name is required")
    .min(3, { message: "Full name must be at least 3 characters long" })
    .max(30, { message: "Full name must be at most 30 characters long" }),
  email: z
    .string({ error: "Email is required" })
    .nonempty("Email is required")
    .email({ message: "Invalid email address" }),
  phone: z
    .string({ error: "Phone number is required" })
    .nonempty("Phone number is required")
    .min(11, { message: "Phone number must be at least 11 characters long" }),
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
