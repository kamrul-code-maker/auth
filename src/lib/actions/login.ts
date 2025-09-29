"use server"

import { signIn } from "@/auth";
import { loginSchema } from "../schemas"
import { LoginSchemaType } from "../schemas/validations"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: LoginSchemaType) => {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    return {success: "Succefully Logged In "}
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":

                    return { error: "invalid  credentials" }

                default:
                    return { error: "Something went wrong " }
            }
        }
        throw error;
    }
}