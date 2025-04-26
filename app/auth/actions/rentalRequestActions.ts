"use server";

import { RentalStatus } from "@/types";
import { createClient } from "@/utils/supabase/server";

export const getRentalRequestsForMyUnits = async (
  currentPage: number = 1,
  itemsPerPage: number = 10,
) => {
  const supabase = await createClient();

  const from = (currentPage - 1) * itemsPerPage;
  const to = currentPage * itemsPerPage - 1;

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  const { data, error, count } = await supabase
    .from("rental_requests_with_details")
    .select("*", { count: "exact" })
    .order("transaction_date", { ascending: false })
    .range(from, to)
    .eq("unit->>owner_id", user.id); // Filter only rental requests where the logged-in user is the owner of the unit (unit is a JSON object)

  //The ->> operator in PostgreSQL (and Supabase, which uses PostgreSQL) is used to extract a text value from a JSON or JSONB column or expression.

  if (error) {
    console.error("Error updating rental status:", error);
    return { error: error.message };
  }

  return { data, totalCount: count };
};

export const updateRentalStatus = async (
  rentalId: string,
  newStatus: RentalStatus,
) => {
  const supabase = await createClient();

  const { data: rentalData, error: fetchError } = await supabase
    .from("rentals")
    .select("status")
    .eq("id", rentalId)
    .single();

  if (fetchError) {
    console.error("Error fetching rental data:", fetchError);
    return { error: fetchError.message };
  }

  const validTransitions: Record<RentalStatus, RentalStatus[]> = {
    pending: ["ongoing", "cancelled"],
    ongoing: ["completed"],
    completed: [],
    cancelled: [],
  };

  if (
    !validTransitions[rentalData.status as RentalStatus].includes(newStatus)
  ) {
    console.error("Invalid status transition");
    return { error: "Invalid status transition" };
  }

  const { data, error } = await supabase
    .from("rentals")
    .update({ status: newStatus })
    .eq("id", rentalId)
    .single();

  if (error) {
    console.error("Error updating rental status:", error);
    return { error: error.message };
  }

  return { data };
};
