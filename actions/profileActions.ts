"use server";

import { createServerSupabaseClient } from "@/lib/supabase/serverClient";

// Updates the address of the currently authenticated user
export const insertAddress = async (address: string) => {
  const supabase = await createServerSupabaseClient();

  // Get the currently authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  // Update the user's address in the database
  const { data, error } = await supabase
    .from("users")
    .update({ address })
    .eq("auth_user_id", user.id);

  if (error) {
    return {
      error:
        error.message || "Something went wrong while updating the address.",
    };
  }

  return {
    data,
    success: "Address successfully updated!",
    redirectUrl: "/",
  };
};

// Edits the user's profile including name, phone, address, and profile picture
export const editProfile = async (formData: FormData) => {
  const supabase = await createServerSupabaseClient();

  // Expected fields from the form
  const fields = [
    "firstName",
    "lastName",
    "phoneNumber",
    "address",
    "profilePictureUrl",
  ];

  // Extract values from the form and trim them
  const formValues = Object.fromEntries(
    fields.map((key) => [key, formData.get(key)?.toString().trim() || ""]),
  );

  const { firstName, lastName, phoneNumber, address, profilePictureUrl } =
    formValues;

  // Get the currently authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  // Prepare the fields to update
  const updateData: { [key: string]: any } = {
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
    address: address,
  };

  // Include profile picture if provided
  if (profilePictureUrl) {
    updateData.profile_picture = profilePictureUrl;
  }

  // Update the user's profile in the database
  const { data, error: updateError } = await supabase
    .from("users")
    .update(updateData)
    .eq("auth_user_id", user.id);

  if (updateError) {
    return {
      error: updateError.message || "Failed to update profile.",
    };
  }

  return {
    data,
    success: "Profile updated successfully.",
    redirectUrl: "/account",
  };
};
