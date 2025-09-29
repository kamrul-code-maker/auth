import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4 } from 'uuid';

export const generateVerficationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email)

    if (existingToken) {
        await prisma?.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const verficationToken = await prisma?.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    if (!verficationToken) {
        throw new Error("Failed to create verification token");
    }
    return verficationToken


}