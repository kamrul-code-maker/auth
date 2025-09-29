"use server";

import { getUserByEmail } from "@/data/user";
import { ResetSchema } from "../schemas";
import { ResetSchemaType } from "../schemas/validations";
import { sendPasswordResetEmail } from "../email";
import { generatePasswordResetToken } from "../tokens";




export const resetPassword = async (values: ResetSchemaType) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid emaiL!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: "Reset email sent!" };
}