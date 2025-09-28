
import prisma from "@/lib/prisma";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })
    } catch {
        return null;
    }
}