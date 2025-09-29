// auth.config.ts
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "./lib/schemas"
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs"

import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export default {
    providers: [
        GitHub({
            clientId:process.env.AUTH_GITHUB_ID, 
            clientSecret: process.env.AUTH_GITHUB_SECRET
        }),
        Google({
            clientId:process.env.AUTH_GOOGLE_ID, 
            clientSecret: process.env.AUTH_GOOGLE_SECRET
        }), 
        Credentials({
            async authorize(credentials) {
                const validatedFields = loginSchema.safeParse(credentials);

                if (validatedFields.success) {
                    const { email, password } = validatedFields.data;
                    const user = await getUserByEmail(email)

                    if (!user || !user.password) return null;
                    const passwordMatch = await bcrypt.compare(
                        password, user.password
                    )
                    if (passwordMatch) return user;


                }
                return null

            }
        })
    ]
} satisfies NextAuthConfig