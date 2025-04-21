"use server";

import { createClient } from "@/utils/supabase/server";

export async function createUnit({
  name,
  price,
  image,
  description,
  categoryId,
}: {
  name: string;
  price: number;
  image: string;
  description: string;
  categoryId: string;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  const { data, error } = await supabase.from("units").insert([
    {
      owner_id: user.id,
      name,
      description,
      category_id: categoryId,
      price_per_day: price,
      image_url: image,
    },
  ]);

  if (error) {
    console.log(error);
    return { error: error.message };
  }

  return {
    success: "Unit successfully added!",
    data,
  };
}

export async function getUserUnits() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  const { data, error } = await supabase
    .from("units")
    .select(
      `
      id,
      name,
      price_per_day,
      image_url,
      is_available,
      description,
      created_at,
      category:category_id!inner(name)
      `,
    )
    .eq("owner_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.log(error);
    return { error: error.message };
  }

  const unitsWithCategory = data.map((unit: any) => ({
    ...unit,
    category: unit.category?.name || "Uncategorized",
  }));

  return {
    data: unitsWithCategory,
  };
}

export async function getAllOtherUnits() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  const { data, error } = await supabase
    .from("units")
    .select(
      `
      id,
      name,
      price_per_day,
      image_url,
      is_available,
      description,
      created_at,
      category:category_id!inner(name),
      owner:owner_id!inner(first_name, last_name)
      `,
    )
    .neq("owner_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return { error: error.message };
  }

  const unitsWithOwnerAndCategory = data.map((unit: any) => ({
    ...unit,
    category: unit.category?.name || "Uncategorized",
  }));

  return {
    data: unitsWithOwnerAndCategory,
  };
}
