
import * as z from "zod";
import { loginSchema, NewPasswordSchema, RegisterSchema, ResetSchema, SettingsSchema } from ".";

export type LoginSchemaType = z.infer<typeof loginSchema>;

export type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>;

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export type ResetSchemaType = z.infer<typeof ResetSchema>;

export type SettingsSchemaType = z.infer<typeof SettingsSchema>;


