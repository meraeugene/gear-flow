"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import TextField from "@/components/forms/TextField";
import { sendResetPasswordLink } from "../../../actions/resetPasswordActions";

export default function Page() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.get("email")?.toString().trim();

    const result = await sendResetPasswordLink(formData);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success(result?.success || "Reset link sent!");
    }

    setLoading(false);
  };

  return (
    <div className="mx-auto flex h-screen w-[90%] flex-col items-center justify-center px-4">
      <div className="mt-8 flex flex-col items-center">
        <Image
          src="/assets/images/logo.png"
          width={65}
          height={65}
          alt="logo"
        />

        <div className="w-full">
          <div className="mt-3 mb-8 flex w-full flex-col items-center justify-center gap-1 text-center">
            <h1 className="text-xl font-medium">Reset Password</h1>
            <p className="text-sm md:text-base">
              Enter your email and we&apos;ll send you a reset link.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
            />
            <button
              disabled={loading}
              className="flex h-[50px] cursor-pointer items-center justify-center rounded-sm bg-black px-2 font-semibold tracking-widest text-white uppercase transition hover:bg-gray-800"
            >
              {loading ? <Loader /> : "Send Reset Link"}
            </button>
          </form>
          <Link
            href="/auth/login"
            className="mt-6 flex w-full cursor-pointer items-center justify-center text-center text-sm text-gray-500 hover:text-gray-700"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
