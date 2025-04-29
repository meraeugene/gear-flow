"use server";

import { createServerSupabaseClient } from "@/lib/supabase/serverClient";

export async function getAllUsers() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  const { data, error } = await supabase
    .from("users")
    .select(
      "auth_user_id, first_name, last_name, email, role, address, phone_number, is_banned, created_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    return { error: error.message };
  }

  return {
    data,
  };
}

// Ban a user
export async function banUser(userId: string) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  const { data, error } = await supabase
    .from("users")
    .update({ is_banned: true })
    .eq("auth_user_id", userId);

  if (error) {
    return { error: error.message };
  }

  return {
    success: `User has been banned.`,
    data,
  };
}

// Unban a user
export async function unbanUser(userId: string) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  const { data, error } = await supabase
    .from("users")
    .update({ is_banned: false })
    .eq("auth_user_id", userId);

  if (error) {
    return { error: error.message };
  }

  return {
    success: `User has been unbanned.`,
    data,
  };
}

// Delete a user
export async function deleteUser(userId: string) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("auth_user_id", userId);

  if (error) {
    return { error: error.message };
  }

  return {
    success: `User has been deleted.`,
    data,
  };
}
