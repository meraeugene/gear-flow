"use server";

import { createClient } from "@/utils/supabase/server";

export async function getAllCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true }); // optional sorting

  if (error) {
    return { error: error.message };
  }

  return { data };
}
