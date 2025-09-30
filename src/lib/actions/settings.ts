"use server";

import bcrypt from "bcryptjs";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import prisma from "../prisma";
import { generateVerficationToken } from "../tokens";
import { sendVerificationEmail } from "../email";

import { SettingsSchemaType } from "../schemas/validations";
import { unstable_update } from "@/auth";
import { updateSession } from "../auth-session";




// ✅ Main settings function
export const settings = async (values: SettingsSchemaType) => {
  const user = await currentUser();

  if (!user?.id) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  // OAuth user হলে কিছু ফিল্ড ignore করুন
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    delete values.newPassword;
    values.isTwoFactorEnabled = undefined;
  }

  // Email update করলে verification email পাঠানো
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerficationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Verification email sent!" };
  }

  // Password change
  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(values.password, dbUser.password);
    if (!passwordsMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    delete values.newPassword; // ✅ Prisma update থেকে remove
  }

  // Prisma update (valid fields only)
  const { newPassword, ...updateData } = values;

  const updatedUser = await prisma.user.update({
    where: { id: dbUser.id },
    data: updateData,
  });

  await updateSession({
    data: {
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
    }
  });
  return { success: "Settings Updated!" };
};
