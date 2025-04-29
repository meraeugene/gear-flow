"use server";
import { createServerSupabaseClient } from "@/lib/supabase/serverClient";

// Retrieves all rental records associated with the currently authenticated user
export async function getRentalStatus() {
  const supabase = await createServerSupabaseClient();

  // Get the currently authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  // Return an error if the user is not authenticated
  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  // Query the "user_rentals" view to get rentals for this user
  const { data, error } = await supabase
    .from("user_rentals")
    .select("*")
    .eq("renter_id", user.id) // Filter by the authenticated user's ID
    .order("created_at", { ascending: false }); // Sort with newest first

  if (error) {
    console.log(error);
    return { error: error.message };
  }

  // Return the retrieved rentals
  return { rentals: data };
}
