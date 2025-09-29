// login actions 


"use server"

import { signIn } from "@/auth";
import { loginSchema } from "../schemas"
import { LoginSchemaType } from "../schemas/validations"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerficationToken } from "../tokens";
import { sendVerificationEmail } from "../email";

export const login = async (values: LoginSchemaType) => {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password } = validatedFields.data;
    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist!" }
    }



    // Todo the comments code don't want to that 
    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerficationToken(existingUser.email);

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        );

        return { success: "Confirmation email sent!" };
    }


    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false, // 🚀 redirect বন্ধ করলাম
        })
        return { success: "Succefully Logged In " }
    } catch (error) {
        console.log(error)
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "invalid  credentials" }
                case "AccessDenied":
                    return { error: "Email is not verified" }

                default:
                    return { error: "Something went wrong " }
            }
        }
        if (error instanceof Error) {
            return { error: error.message };
        }
        throw error;
    }
}