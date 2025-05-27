"use server";

import { createServerSupabaseClient } from "@/lib/supabase/serverClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isValidPhoneNumber } from "libphonenumber-js";

export const signup = async (formData: FormData) => {
  const supabase = await createServerSupabaseClient();

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
    success: `Signup success. Please verify your account via the email: ${email}.`,
    redirectUrl: "/auth/login",
  };
};

// Server action to log in a user
export const login = async (formData: FormData) => {
  const supabase = await createServerSupabaseClient();

  // Extract and sanitize email and password from the form data
  const formValues = Object.fromEntries(
    ["email", "password"].map((key) => [
      key,
      formData.get(key)?.toString().trim() || "",
    ]),
  );

  // Validate that both fields are filled
  if (Object.values(formValues).some((val) => !val)) {
    return { error: "Please input the required fields." };
  }

  const { email, password } = formValues;

  // Check if a user with the provided email exists and whether they are banned
  const { data: userCheck, error: checkError } = await supabase
    .from("users")
    .select("is_banned")
    .eq("email", email)
    .single();

  if (checkError) {
    // Handle "no rows found" error gracefully
    if (checkError.code === "PGRST116") {
      return { error: "Account does not exist or has been deleted." };
    }
    return { error: checkError.message };
  }

  // If somehow userCheck is still undefined/null
  if (!userCheck) {
    return { error: "Account does not exist or has been deleted." };
  }

  // Block login if user is banned
  if (userCheck?.is_banned) {
    return { error: "Your account has been banned. Please contact support." };
  }

  // Attempt to sign in using Supabase Auth
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  // Retrieve the authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "User not found after login." };
  }

  // Fetch the user's role and auth ID from the database
  const { data: userDetails, error: userDetailsError } = await supabase
    .from("users")
    .select("auth_user_id, role")
    .eq("auth_user_id", user.id)
    .single();

  if (userDetailsError) {
    return { error: userDetailsError.message };
  }

  // Success: return user ID, role, and redirect path
  return {
    userId: userDetails.auth_user_id,
    role: userDetails.role,
    success: true,
    redirectUrl: "/",
  };
};

// Server action to handle user logout
export const signOut = async () => {
  // Create a Supabase client on the server
  const supabase = await createServerSupabaseClient();

  // Attempt to sign out the user via Supabase Auth
  const { error } = await supabase.auth.signOut();

  // Handle any errors during the logout process
  if (error) {
    console.error("Logout failed:", error.message);
    return;
  }

  // Revalidate the root layout to update session-based content
  revalidatePath("/", "layout");

  // Redirect the user to the login page
  redirect("/");
};

// Server-side action to fetch the authenticated user's full profile
export const getAuthUser = async () => {
  // Initialize a Supabase client using server-side context
  const supabase = await createServerSupabaseClient();

  // Attempt to retrieve the currently authenticated user's basic auth info
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  // Handle case where user is not authenticated or there's an error
  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  // Fetch full user profile from the "users" table using the auth_user_id
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("auth_user_id", user.id)
    .single(); // Expecting only one user record

  // Handle possible query error
  if (error) {
    return { error: error.message };
  }

  // Return the user's full data
  return { user: data, error: null };
};
