"use client";

import { UserInfo } from "@/components/auth/user-info";
import { useSession } from "next-auth/react";



const ClientPage = () => {
  const session = useSession(); 
  console.log(session)
  return (
    <UserInfo label="📱 Client component (dummy)" />
  );
}

export default ClientPage;
