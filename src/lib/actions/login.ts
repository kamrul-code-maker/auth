// login actions 


"use server"

import { signIn } from "@/auth";
import { loginSchema } from "../schemas"
import { LoginSchemaType } from "../schemas/validations"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateTwoFactorToken, generateVerficationToken } from "../tokens";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "../email";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const login = async (values: LoginSchemaType, callbackUrl?: string | null): Promise<{ error?: string; success?: string; twoFactor?: boolean }> => {
    const validatedFields = loginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password, code } = validatedFields.data;
    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist!" }
    }



    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerficationToken(existingUser.email);

        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        );

        return { success: "Confirmation email sent!" };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(
                existingUser.email
            );


            if (!twoFactorToken) {
                return { error: "Invalid code!" };
            }

            if (twoFactorToken.token !== code) {
                return { error: "Invalid code!" };
            }


            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if (hasExpired) {
                return { error: "Code expired!" };
            }


            await prisma?.twoFactorToken.delete({
                where: { id: twoFactorToken.id }
            });

            const existingConfirmation = await getTwoFactorConfirmationByUserId(
                existingUser.id
            );

            if (existingConfirmation) {
                await prisma?.twoFactorConfirmation.delete({
                    where: { id: existingConfirmation.id }
                });
            }

            await prisma?.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                }
            });
        } else {
            const twoFactorToken = await generateTwoFactorToken(existingUser.email)
            await sendTwoFactorTokenEmail(
                twoFactorToken.email,
                twoFactorToken.token,
            );

            return { twoFactor: true };
        }
    }


    try {
        await signIn("credentials", {
            email,
            password,
            redirect: false, // 🚀 redirect বন্ধ করলাম
            // redirect: true, // এখানে false দিবেন যাতে আপনি নিজে redirect handle করতে পারেন
            // redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
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