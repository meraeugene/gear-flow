"use server";
import { createClient } from "@/utils/supabase/server";

export async function getUserTransaction() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User is not logged in." };
  }

  const { data, error } = await supabase
    .from("transactions")
    .select(
      `
    *,
    rentals!inner(
      unit:units(
      id, 
      name,
      owner: owner_id (
        first_name,
        last_name,
        profile_picture,
        address,
        phone_number,
        email
      )
    ) 
  )
  `,
    )
    .eq("rentals.renter_id", user.id)
    .order("transaction_date", { ascending: false });

  if (error) {
    return { error: error.message };
  }

  return {
    transactions: data?.map((payment) => {
      return {
        id: payment.id,
        rental_id: payment.rental_id,
        amount: payment.amount,
        payment_method: payment.payment_method,
        status: payment.status,
        proof_of_payment_url: payment.proof_of_payment_url,
        transaction_date: payment.transaction_date,
        unit: payment.rentals.unit,
        owner: payment.rentals?.unit?.owner,
      };
    }),
  };
}
