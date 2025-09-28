"use client";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: "ADMIN" | "USER";
}

// ✅ Dummy role simulation
const DUMMY_ROLE = "ADMIN"; // Change to "USER" to simulate forbidden

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  if (DUMMY_ROLE !== allowedRole) {
    return <FormError message="You do not have permission to view this content! (dummy)" />;
  }

  return <>{children}</>;
};
