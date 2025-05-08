"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import PasswordField from "@/components/forms/PasswordField";
import { updatePassword } from "@/actions/resetPasswordActions";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="flex h-screen flex-col items-center justify-center px-4">
      <div className="mt-8 flex w-full flex-col items-center md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5">
        <div className="h-full w-full">
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
        </div>
      </div>
    </div>
  );
}
