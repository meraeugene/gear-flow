"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import PasswordField from "@/components/forms/PasswordField";
import { updatePassword } from "@/app/auth/actions/resetPasswordActions";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const code = searchParams.get("code");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const rawPassword = formData.get("password")?.toString() || "";

    if (
      !rawPassword.match(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      )
    ) {
      toast.error(
        "Password must be at least 8 characters, include an uppercase letter, a number, and a special character.",
      );
      setLoading(false);
      return;
    }

    const response = await updatePassword(formData);

    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success(response.success || "Password updated!");
      router.push(response.redirectUrl || "/auth/login");
    }

    setLoading(false);
  };

  const isLinkInvalid = error || !code;

  return (
    <div className="flex h-screen flex-col items-center justify-center px-4">
      <div className="mt-8 flex min-w-[23em] flex-col items-center">
        <div className="h-full w-full">
          {isLinkInvalid ? (
            <div className="flex flex-col gap-2 text-center">
              <div className="flex items-center justify-center">
                <Image
                  src="/assets/images/logo.png"
                  width={65}
                  height={65}
                  alt="logo"
                />
              </div>

              <h1 className="mt-4 text-xl font-semibold">
                Link Expired or Invalid
              </h1>
              <p className="text-gray-500">
                Email link is invalid or has expired. Please request a new one.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center">
                <Image
                  src="/assets/images/logo.png"
                  width={65}
                  height={65}
                  alt="logo"
                />
              </div>

              <div className="mt-3 mb-8 flex w-full flex-col items-center justify-center gap-1">
                <h1 className="text-xl font-medium">Reset Your Password</h1>
                <p>Enter your new password to continue.</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <PasswordField id="password" name="password" label="Password" />

                <button
                  disabled={loading}
                  className="flex h-[50px] cursor-pointer items-center justify-center rounded-sm bg-black px-2 font-semibold tracking-widest text-white uppercase transition hover:bg-gray-800"
                >
                  {loading ? <Loader /> : "Update Password"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
