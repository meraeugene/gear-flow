"use server";

import { createServerSupabaseClient } from "@/lib/supabase/serverClient";

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
  const supabase = await createServerSupabaseClient();

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

export async function getUnitById(unitId: string) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("units")
    .select("*")
    .eq("id", unitId)
    .single();

  if (error) {
    return { error: error.message };
  }

  return { data };
}

export async function updateUnit(
  unitId: string,
  {
    name,
    price,
    description,
    image_url,
    category_id,
  }: {
    name: string;
    price: number;
    description: string;
    image_url: string;
    category_id: string;
  },
) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("units")
    .update({
      name,
      price_per_day: price,
      description,
      image_url,
      category_id,
    })
    .eq("id", unitId);

  if (error) {
    return { error: error.message };
  }

  return { success: "Unit updated successfully!" };
}

export async function deleteUnit(unitId: string) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.from("units").delete().eq("id", unitId);
  if (error) return { error: error.message };
  return { message: "Unit deleted successfully" };
}

export async function getAuthUserUnits() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  const { data, error } = await supabase
    .from("auth_user_units")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    return { error: error.message };
  }

  return { data };
}

export async function getAllOtherUnits(
  currentPage: number = 1,
  itemsPerPage: number = 12,
) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase
    .from("public_units")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (user) {
    query = query.neq("owner_id", user.id);
  }

  const {
    data,
    error,
    count: totalUnitsCount,
  } = await query.range(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage - 1,
  );

  if (error) {
    console.log(error);
    return { error: error.message };
  }

  return {
    data,
    totalUnitsCount,
  };
}

export async function getNewArrivals() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase.from("new_arrivals").select("*").limit(3);

  if (user) {
    query = query.neq("owner_id", user.id);
  }

  const { data, error, count: totalUnitsCount } = await query;

  if (error) {
    console.log(error);
    return { error: error.message };
  }

  return {
    data,
    totalUnitsCount,
  };
}

export async function searchUnits(keyword: string) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase
    .from("searchable_units")
    .select("*")
    .ilike("name", `%${keyword}%`)
    .limit(10);

  // If user is logged in, exclude their own units
  if (user) {
    query = query.neq("owner_id", user.id);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return { error: error.message };
  }

  return { data };
}

export async function getUnitDetailsWithRelated(
  unitId: string,
  categoryId: string,
  limit = 6,
) {
  try {
    const supabase = await createServerSupabaseClient();

    // Step 1: Fetch the main unit from the view
    const { data: unit, error: unitError } = await supabase
      .from("unit_details")
      .select("*")
      .eq("unit_id", unitId)
      .single();

    if (unitError) {
      console.log(unitError);
      return { error: unitError.message };
    }

    // Step 2: If unavailable, fetch its rental end date
    let rentalEndDate = null;
    if (!unit.is_available) {
      const { data: rentalData, error: rentalError } = await supabase
        .from("rentals")
        .select("end_date")
        .eq("unit_id", unitId)
        .eq("status", "ongoing")
        .single();

      if (!rentalError) rentalEndDate = rentalData?.end_date;
    }

    // Step 3: Get auth user and fetch their user data
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Step 4: Fetch related units
    let query = supabase
      .from("related_units")
      .select("*")
      .neq("unit_id", unitId)
      .eq("category_id", categoryId)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (user) {
      query = query.neq("owner_id", user.id);
    }

    const { data: relatedUnits, error: relatedUnitsError } = await query;

    if (relatedUnitsError) {
      console.log(relatedUnitsError);
      return { error: relatedUnitsError.message };
    }

    return {
      unit,
      rentalEndDate,
      relatedUnits,
    };
  } catch (error) {
    console.log(error);
    return { error: "Error in getUnitDetailsWithRelated" };
  }
}
