"use server";
import { auth, unstable_update } from "@/auth"; // adjust path
import type { Session } from "next-auth";

export const updateSession = async ({ data }: { data: Partial<Session["user"]>; }) => {
    const session = await auth();
    if (session) {
        await unstable_update({
            ...session,
            user: {
                ...session.user,
                ...data,
            },
        });
    }
};
