import z from "zod";

export const categoryCreateSchema = z.object({
  title: z
    .string({ error: "Title is required" })
    .nonempty("Title is required")
    .min(2, { message: "Title must be at least 2 characters long" })
    .max(30, { message: "Title must be at most 30 characters long" }),
});
