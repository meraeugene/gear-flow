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

export async function getAllOtherUnits(
  currentPage: number = 1,
  itemsPerPage: number = 12,
) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  const {
    data,
    error,
    count: totalUnitsCount,
  } = await supabase
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
      { count: "exact" },
    )
    .neq("owner_id", user.id)
    .order("created_at", { ascending: false })
    .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1); // Pagination

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
    totalUnitsCount,
  };
}

export async function getUnitsByCategory(
  categoryId: string,
  currentPage: number = 1,
  itemsPerPage: number = 12,
) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  const {
    data,
    error,
    count: totalUnitsCount,
  } = await supabase
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
      { count: "exact" },
    )
    .neq("owner_id", user.id)
    .eq("category.id", categoryId)
    .order("created_at", { ascending: false })
    .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1); // Pagination

  if (error) {
    console.log(error);
    return { error: error.message };
  }

  const units = data.map((unit: any) => ({
    ...unit,
    category: unit.category?.name || "Uncategorized",
  }));

  return {
    data: units,
    totalUnitsCount,
  };
}

export async function getUnitById(unitId: string) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  const { data, error }: { data: any; error: any } = await supabase
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
      category:category_id(id, name),
      owner:owner_id!inner(first_name, last_name)
      `,
    )
    .eq("id", unitId)
    .single();

  if (error) {
    return { error: error.message };
  }

  return {
    data,
  };
}

export async function getNewArrivals() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  const {
    data,
    error,
    count: totalUnitsCount,
  } = await supabase
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
    .neq("owner_id", user.id) // Exclude current user's units
    .order("created_at", { ascending: false }) // Newest first
    .limit(3); // Limit to 3 newest units

  if (error) {
    return { error: error.message };
  }

  const newArrivalsWithCategory = data.map((unit: any) => ({
    ...unit,
    category: unit.category?.name || "Uncategorized",
  }));

  return {
    data: newArrivalsWithCategory,
    totalUnitsCount,
  };
}

export async function getRelatedUnits(
  unitId: string,
  categoryId: string,
  limit: number = 6,
) {
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
    .neq("id", unitId) // Exclude the current unit
    .eq("category_id", categoryId) // Same category
    .neq("owner_id", user.id) // Exclude own units
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    return { error: error.message };
  }

  const relatedUnits = data.map((unit: any) => ({
    ...unit,
    category: unit.category?.name || "Uncategorized",
  }));

  return {
    data: relatedUnits,
  };
}

export async function searchUnits(keyword: string) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Not authenticated." };
  }

  const { data, error } = await supabase
    .from("units")
    .select("id, name, image_url, price_per_day, category:category_id(name)")
    .ilike("name", `%${keyword}%`)
    .neq("owner_id", user.id)
    .limit(10);

  if (error) return { error: error.message };

  console.log(error);

  const searchUnits = data?.map((unit: any) => ({
    ...unit,
    category: unit.category?.name || "Uncategorized",
  }));

  return { searchUnits };
}
