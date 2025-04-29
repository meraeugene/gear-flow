"use server";

import { RentalRecord, RentalStatus } from "@/types";
import { createServerSupabaseClient } from "@/lib/supabase/serverClient";

// Retrieves rental requests for the units owned by the currently authenticated user
export const getRentalRequestsForMyUnits = async (
  currentPage: number = 1,
  itemsPerPage: number = 10,
) => {
  const supabase = await createServerSupabaseClient();

  // Calculate the range of items to retrieve based on the current page and items per page
  const from = (currentPage - 1) * itemsPerPage;
  const to = currentPage * itemsPerPage - 1;

  // Get the currently authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  // Return an error if the user is not authenticated
  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  // Query the "rental_requests_with_details" view to get rental requests for the user's units
  const { data, error, count } = await supabase
    .from("rental_requests_with_details")
    .select("*", { count: "exact" })
    .order("transaction_date", { ascending: false }) // Sort the results by transaction date, with the most recent first
    .range(from, to) // pagination
    .eq("unit->>owner_id", user.id); // Filter only rental requests where the logged-in user is the owner of the unit (unit is a JSON object)

  //The ->> operator in PostgreSQL (and Supabase, which uses PostgreSQL) is used to extract a text value from a JSON or JSONB column or expression.

  if (error) {
    console.error("Error updating rental status:", error);
    return { error: error.message };
  }

  return { data, totalCount: count };
};

// update the status of a rental, ensuring valid status transitions and updating related data.
export const updateRentalStatus = async (
  rentalId: string,
  newStatus: RentalStatus,
) => {
  const supabase = await createServerSupabaseClient();

  // Get the currently authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  // If the user is not authenticated, return an error
  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  // Fetch the current rental status and unit_id based on the rentalId
  const { data: rental, error: fetchError } = await supabase
    .from("rentals")
    .select("status, unit_id")
    .eq("id", rentalId)
    .single<RentalRecord>();

  // If there’s an error or the rental is not found, return an error
  if (fetchError || !rental) {
    console.error(fetchError ?? "Rental not found");
    return { error: fetchError?.message ?? "Rental not found" };
  }

  // Define valid transitions for rental statuses
  const validTransitions: Record<RentalStatus, RentalStatus[]> = {
    pending: ["ongoing", "cancelled"], // From "pending", you can go to "ongoing" or "cancelled"
    ongoing: ["completed"], // From "ongoing", you can only go to "completed"
    completed: [], // No further transitions from "completed"
    cancelled: [], // No further transitions from "cancelled"
  };

  // Check if the desired status transition is valid
  if (!validTransitions[rental.status]?.includes(newStatus)) {
    return { error: "Invalid status transition" };
  }

  // Create an array of update queries to be executed based on the new status
  const updates = [
    supabase.from("rentals").update({ status: newStatus }).eq("id", rentalId),
  ];

  // If the status is "ongoing", update transaction status to "paid" and set the unit as unavailable
  if (newStatus === "ongoing") {
    updates.push(
      supabase
        .from("transactions")
        .update({ status: "paid" })
        .eq("rental_id", rentalId),
      supabase
        .from("units")
        .update({ is_available: false })
        .eq("id", rental.unit_id),
    );
  }

  // If the status is "cancelled", update transaction status to "failed" and set the unit as available again
  if (newStatus === "cancelled") {
    updates.push(
      supabase
        .from("transactions")
        .update({ status: "failed" })
        .eq("rental_id", rentalId),
      supabase
        .from("units")
        .update({ is_available: true })
        .eq("id", rental.unit_id),
    );
  }

  // If the status is "completed", set the unit as available again
  if (newStatus === "completed") {
    updates.push(
      supabase
        .from("units")
        .update({ is_available: true })
        .eq("id", rental.unit_id),
    );
  }

  // Execute all the update queries in parallel
  const results = await Promise.all(updates);

  // Check if any of the update operations resulted in an error
  const error = results.find((r) => r.error)?.error;

  // If there's an error, log it and return the error message
  if (error) {
    console.error("Error during update:", error);
    return { error: error.message };
  }

  // Return the updated rental data (rentalId and new status)
  return { data: { rentalId, status: newStatus } };
};
