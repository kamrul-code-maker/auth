import { UserRole } from "@prisma/client";
import type { NextConfig } from "next";
import { DefaultSession } from "next-auth";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;


export type ExtendedUser = DefaultSession["user"] & {
  id:string; 
  role:UserRole
}

declare module "next-auth"{
  interface Session {
    user:ExtendedUser
  }
}