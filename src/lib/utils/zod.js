import { object, string, z } from "zod"
 
export const signInSchema = object({
  email: z.email({ required_error: "E-mail is required" },"Invalid email")
    .min(1, "Email is required"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
})