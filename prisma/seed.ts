import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding users...");

  // ===========================
  // Hash passwords
  // ===========================
  const userPassword = await bcrypt.hash("123456", 10);

  // ===========================
  // Admin User
  // ===========================
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      password: userPassword,
      role: UserRole.ADMIN,
    },
  });

  // ===========================
  // Normal User
  // ===========================
  await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      name: "Normal User",
      email: "user@example.com",
      password: userPassword,
      role: UserRole.USER,
    },
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
