// register actions 


"use server";

import bcrypt from "bcrypt"
import { RegisterSchema } from "../schemas";
import { RegisterSchemaType } from "../schemas/validations";
import { getUserByEmail } from "@/data/user";
import prisma from "../prisma";
import { generateVerficationToken } from "../tokens";
import { sendVerificationEmail } from "../email";


export const register = async (values: RegisterSchemaType) => {
    const validatedFields = RegisterSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields " }
    }

    const { email, password, name } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return { error: "Email  already in use!" }
    }

    await prisma.user.create({
        data: {
            name, email, password: hashedPassword
        }
    })

    // TODO: send verfication token email

    const verficationToken = await generateVerficationToken(email);

    await sendVerificationEmail(
        verficationToken.email,
        verficationToken.token,
    );

    return { success: "Confirmation email sent!" };

}
