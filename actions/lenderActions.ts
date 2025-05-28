"use server";

import { createServerSupabaseClient } from "@/lib/supabase/serverClient";

// Fetches a paginated list of lenders from the 'lender_summary' view,
// ordered by the number of units they own (descending by default)
export async function getAllLenders(
  currentPage: number = 1,
  itemsPerPage: number = 10,
) {
  const supabase = await createServerSupabaseClient();

  const from = (currentPage - 1) * itemsPerPage;
  const to = currentPage * itemsPerPage - 1;

  const { data, error, count } = await supabase
    .from("lender_summary")
    .select("*", { count: "exact" })
    .order("unit_count", { ascending: false }) // Most active lenders first
    .range(from, to);

  if (error) {
    console.error(error);
    return { error: error.message };
  }

  return {
    data,
    totalCount: count,
  };
}

// Fetches a specific lender's profile and a paginated list of their public units
export async function getLenderUnitsWithProfile(
  lenderId: string,
  currentPage = 1,
  itemsPerPage = 6,
) {
  try {
    const supabase = await createServerSupabaseClient();

    // Step 1: Get the lender's public units
    const {
      data: unitsData,
      error: unitsError,
      count: totalUnitsCount,
    } = await supabase
      .from("public_units")
      .select("*", { count: "exact" })
      .eq("owner_id", lenderId)
      .order("created_at", { ascending: true }) // Most recent first
      .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

    if (unitsError) {
      console.error(unitsError);
      return { error: unitsError.message };
    }

    // Step 2: Get the lender's public profile
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select(
        "first_name, last_name, email, address, phone_number, profile_picture",
      )
      .eq("auth_user_id", lenderId)
      .single();

    if (userError) {
      console.error(userError);
      return { error: userError.message };
    }

    return {
      userUnits: unitsData,
      owner: userData,
      totalUnitsCount,
    };
  } catch (error) {
    console.log(error);
    return { error: "Error in getLenderUnitsWithProfile" };
  }
}
