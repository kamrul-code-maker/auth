"use client";

import { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  // ✅ Dummy effect to simulate verification delay
  useEffect(() => {
    const timer = setTimeout(() => {
      // Randomly succeed or fail for dummy simulation
      if (Math.random() > 0.3) {
        setSuccess("Your email has been verified! (dummy)");
      } else {
        setError("Verification failed! (dummy)");
      }
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {loading && <BeatLoader />}
        <FormSuccess message={success} />
        {!loading && !success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
