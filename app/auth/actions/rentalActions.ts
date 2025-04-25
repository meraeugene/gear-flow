"use server";
import { createClient } from "@/utils/supabase/server";

export async function getRentalStatus() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User is not logged in." };
  }

  const { data, error } = await supabase
    .from("rentals")
    .select(
      `
      *,
      unit:unit_id (
        id,
        name,
        image_url,
        description,
        owner_id,
        owner:owner_id (
          first_name,
          last_name,
          profile_picture,
          address,
          phone_number,
          email
        )
      )
    `,
    )
    .eq("renter_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return { error: error.message };
  }

  const rentals = data?.map((rental) => ({
    ...rental,
    unit: {
      id: rental.unit?.id,
      name: rental.unit?.name,
      image_url: rental.unit?.image_url,
      description: rental.unit?.description,
    },
    owner: rental.unit?.owner ?? null,
  }));

  return { rentals };
}
