import * as z from "zod";


// ✅ login schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  code: z.optional(z.string())
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



export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

// ✅ Zod schema
export const SettingsSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email").optional(),
  password: z.string().optional(),
  newPassword: z.string().optional(),
  role: z.nativeEnum(UserRole).optional(),
  isTwoFactorEnabled: z.boolean().optional(),
});
