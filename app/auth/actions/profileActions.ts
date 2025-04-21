"use server";

import { createClient } from "@/utils/supabase/server";

export const insertAddress = async (address: string) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

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

export const editProfile = async (formData: FormData) => {
  const supabase = await createClient();

  const fields = [
    "firstName",
    "lastName",
    "phoneNumber",
    "address",
    "profilePictureUrl",
  ];
  const formValues = Object.fromEntries(
    fields.map((key) => [key, formData.get(key)?.toString().trim() || ""]),
  );

  const { firstName, lastName, phoneNumber, address, profilePictureUrl } =
    formValues;

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  // Prepare update object
  const updateData: { [key: string]: any } = {
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
    address: address,
  };

  if (profilePictureUrl) {
    updateData.profile_picture = profilePictureUrl;
  }

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
