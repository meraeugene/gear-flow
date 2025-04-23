"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/Loader";
import { toast } from "sonner";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import TextField from "@/components/forms/TextField";
import PasswordField from "@/components/forms/PasswordField";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useRouter } from "next/navigation";
import { signup } from "../actions/authActions";

export default function SignupPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const data = {
      firstName: form.get("firstName")?.toString().trim() || "",
      lastName: form.get("lastName")?.toString().trim() || "",
      email: form.get("email")?.toString().trim() || "",
      password: form.get("password")?.toString() || "",
      confirmPassword: form.get("confirmPassword")?.toString() || "",
      phoneNumber,
    };

    const { password, confirmPassword } = data;

    // CLIENT VALIDATION
    if (Object.values(data).some((field) => !field)) {
      toast.error("Please fill in all fields.");
      return setLoading(false);
    }

    if (!isValidPhoneNumber(phoneNumber || "")) {
      toast.error("Please enter a valid phone number.");
      return setLoading(false);
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return setLoading(false);
    }

    if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(
        password,
      )
    ) {
      toast.error(
        "Password must be at least 8 characters and include 1 uppercase letter, 1 number, and 1 special character.",
      );
      return setLoading(false);
    }

    form.set("phoneNumber", phoneNumber || "");
    const result = await signup(form);

    if (result?.error) {
      toast.error(result.error);
      return setLoading(false);
    }

    if (result?.success) {
      toast.success(result.success);
      setLoading(false);
      router.push(result.redirectUrl);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="max-w-[28em]">
        <div className="mb-8 flex w-full flex-col items-center justify-center gap-2 border-b border-gray-300 pb-4">
          <Image
            src="/assets/images/logo.png"
            width={65}
            height={65}
            alt="logo"
          />
          <h1 className="mt-1 text-xl font-medium">Create a New Account</h1>
          <p>You're just one step away.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* First & Last Name */}
          <div className="flex items-center gap-4">
            <TextField id="firstName" name="firstName" label="First Name" />
            <TextField id="lastName" name="lastName" label="Last Name" />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label
              htmlFor="phoneNumber"
              className="mb-1 text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <PhoneInput
              id="phoneNumber"
              name="phoneNumber"
              international
              countryCallingCodeEditable={false} // Makes the country code uneditable
              value={phoneNumber}
              onChange={setPhoneNumber}
              className="w-full border border-gray-300 px-2 py-3 focus:ring-2 focus:ring-gray-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="sample@email.com"
          />

          {/* Password */}
          <PasswordField id="password" name="password" label="Password" />
          {/* Confirm Password */}
          <PasswordField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
          />

          <button
            disabled={loading}
            className={`mt-2 flex h-[50px] cursor-pointer items-center justify-center rounded-sm font-semibold tracking-widest text-white uppercase transition-colors duration-200 ${
              loading
                ? "cursor-not-allowed bg-gray-600"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {loading ? <Loader /> : "Sign up"}
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-1 text-center">
          <span className="text-sm text-gray-700">
            Already have an account?
          </span>{" "}
          <Link
            href="/auth/login"
            className="text-sm font-semibold text-black transition-colors duration-200 hover:text-gray-800"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
