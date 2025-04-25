"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isValidPhoneNumber } from "libphonenumber-js";

export const signup = async (formData: FormData) => {
  const supabase = await createClient();

  const formValues = Object.fromEntries(
    [
      "firstName",
      "lastName",
      "phoneNumber",
      "email",
      "password",
      "confirmPassword",
    ].map((key) => [key, formData.get(key)?.toString().trim() || ""]),
  );

  if (Object.values(formValues).some((val) => !val)) {
    return { error: "Please input the required fields." };
  }

  const { firstName, lastName, email, phoneNumber, password, confirmPassword } =
    formValues;

  if (!isValidPhoneNumber(phoneNumber || "")) {
    return { error: "Invalid phone number." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

  if (!passwordRegex.test(password)) {
    return {
      error:
        "Password must be at least 8 characters long and include 1 uppercase letter, 1 number, and 1 special character.",
    };
  }

  // Create a new user using Supabase Auth
  const { data, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    return { error: signUpError.message };
  }

  // Call the RPC function to insert the user into private.users table
  // const { data: insertData, error: insertError } = await supabase.rpc(
  //   "signup_user",
  //   {
  //     user_id: data.user?.id,
  //     first_name: firstName,
  //     last_name: lastName,
  //     email,
  //     phone_number: phoneNumber,
  //   },
  // );

  // Insert user into public.users table
  const { data: insertData, error: insertError } = await supabase
    .from("users") // Specify the "users" table in the "public" schema
    .insert([
      {
        auth_user_id: data.user?.id,
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
      },
    ]);

  if (insertError) {
    const isDuplicateEmail =
      insertError.code === "23505" &&
      insertError.message?.includes("users_email");

    return {
      error: isDuplicateEmail
        ? "Email is already registered. Please use a different email."
        : insertError.message || "Something went wrong.",
    };
  }

  return {
    insertData,
    success: "Signup success. Please verify your account via your email.",
    redirectUrl: "/auth/login",
  };
};

export const login = async (formData: FormData) => {
  const supabase = await createClient();
  const formValues = Object.fromEntries(
    ["email", "password"].map((key) => [
      key,
      formData.get(key)?.toString().trim() || "",
    ]),
  );

  if (Object.values(formValues).some((val) => !val)) {
    return { error: "Please input the required fields." };
  }

  const { email, password } = formValues;

  // Check if the user exists and is not banned before signing in
  const { data: userCheck, error: checkError } = await supabase
    .from("users")
    .select("is_banned")
    .eq("email", email)
    .single();

  if (checkError) {
    if (checkError.code === "PGRST116") {
      return { error: "Account does not exist or has been deleted." };
    }
    return { error: checkError.message };
  }

  if (!userCheck) {
    return { error: "Account does not exist or has been deleted." };
  }

  if (userCheck?.is_banned) {
    return { error: "Your account has been banned. Please contact support." };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "User not found after login." };

  const { data: userDetails, error: userDetailsError } = await supabase
    .from("users")
    .select("auth_user_id, role") // Add other fields if needed
    .eq("auth_user_id", user.id)
    .single();

  if (userDetailsError) {
    return { error: userDetailsError.message };
  }

  return {
    userId: userDetails.auth_user_id,
    role: userDetails.role,
    success: true,
    redirectUrl: "/",
  };
};

export const signOut = async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout failed:", error.message);
    return;
  }

  revalidatePath("/", "layout");
  redirect("/auth/login");
};

export const getAuthUser = async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: authError?.message ?? "No user found." };
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("auth_user_id", user.id)
    .single();

  if (error) {
    return { error: error.message };
  }

  return { user: data, error: null };
};
