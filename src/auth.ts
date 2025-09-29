// auth.ts 
import prisma from "./lib/prisma"
import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getUserById } from "./data/user"
import { UserRole } from "@prisma/client"

export const {
    handlers: { GET, POST }, auth, signIn, signOut
} = NextAuth({
    pages:{
        signIn:"/auth/login",
        error:"/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        // async signIn({ user }) {
        //     if (!user?.id) {
        //         throw new Error("User ID is missing");
        //     }
        //     const existingUser = await getUserById(user.id);
        //     if (!existingUser || !existingUser.emailVerified) {
        //         throw new Error("Your email is not verified. Please verify your email to login.");
        //     }
        //     return true;
        // },
        async session({ token, session }) {

            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            if (token.role && session.user) {
                session.user.role = token.role as UserRole;
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;
            token.role = existingUser.role;
            console.log(token)

            return token;
        }
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig
})