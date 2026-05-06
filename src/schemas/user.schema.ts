import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password too short"),
});