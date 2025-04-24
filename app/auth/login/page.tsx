"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import PasswordField from "@/components/forms/PasswordField";
import TextField from "@/components/forms/TextField";
import { login } from "../actions/authActions";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const result = await login(form);

    if (result?.error) {
      toast.error(result.error);
      setLoading(false);
      return;
    }

    if (result?.success) {
      useAuthStore.getState().setAuth(result.userId, result.role);
      router.push(result.redirectUrl);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center px-4">
      <div className="mt-8 flex min-w-[23em] flex-col items-center">
        <Image
          src="/assets/images/logo.png"
          width={65}
          height={65}
          alt="logo"
        />

        <div className="w-full">
          <div className="mt-3 mb-8 flex w-full flex-col items-center justify-center gap-1">
            <h1 className="text-xl font-medium">Welcome Back</h1>
            <p>Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="sample@email.com"
            />
            <PasswordField id="password" name="password" label="Password" />
            <button
              disabled={loading}
              className="flex h-[50px] cursor-pointer items-center justify-center rounded-sm bg-black px-2 font-semibold tracking-widest text-white uppercase transition hover:bg-gray-800"
            >
              {loading ? <Loader /> : "SIGN IN"}
            </button>
          </form>

          <Link
            href="/auth/forgot-password"
            className="mt-6 flex w-full cursor-pointer items-center justify-center text-center text-sm text-gray-500 hover:text-gray-700"
          >
            Forgot your password?
          </Link>

          <div className="mt-4 flex flex-col items-center gap-1 text-center">
            <span className="text-sm text-gray-700">
              Don’t have an account?
            </span>
            <Link
              href="/auth/register"
              className="text-sm font-semibold text-black hover:text-gray-800"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
