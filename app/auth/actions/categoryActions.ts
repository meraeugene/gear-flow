"use server";

import { createClient } from "@/utils/supabase/server";

export async function getAllCategories() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    return { error: error.message };
  }

  return { data };
}

export async function addCategory({
  name,
  description,
  image_url,
}: {
  name: string;
  description: string;
  image_url: string;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  const { data: userData, error: roleError } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (roleError || !userData || userData.role !== "admin") {
    return { error: "Not authorized. Admin access only." };
  }

  const { data, error } = await supabase
    .from("categories")
    .insert([
      {
        name,
        description,
        image_url,
      },
    ])
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  return {
    data,
    message: "Category added successfully.",
  };
}
