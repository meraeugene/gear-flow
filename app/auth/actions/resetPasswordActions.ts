"use server";

import { createClient } from "@/utils/supabase/server";

export const sendResetPasswordLink = async (formData: FormData) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  const email = formData.get("email")?.toString().trim();

  if (!email) {
    return { error: "Please provide your email address." };
  }

  // Check if the email exists in your users table
  const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("email")
    .eq("email", email);

  if (fetchError || !existingUser) {
    return { error: "Email is not registered." };
  }

  // Send password reset email
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    return { error: error.message };
  }

  return { success: "A password reset link has been sent to your email." };
};

export const updatePassword = async (formData: FormData) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  const password = formData.get("password")?.toString().trim();

  if (!password) {
    return { error: "Please provide your new password." };
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success: "Password successfully updated!",
    redirectUrl: "/auth/login",
  };
};
