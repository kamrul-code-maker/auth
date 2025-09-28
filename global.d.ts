// global.d.ts
declare module '*.css';
declare module '*.scss';


declare global {
  var prisma: import("@prisma/client").PrismaClient | undefined;
}

export {};