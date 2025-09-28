import * as z from "zod";


// ✅ login schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


// ✅ Dummy password schema
export const NewPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});


// ✅ Dummy register schema
export const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


// ✅ Dummy reset schema
export const ResetSchema = z.object({
  email: z.string().email("Invalid email address"),
});
