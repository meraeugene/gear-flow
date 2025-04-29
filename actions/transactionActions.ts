"use server";
import { createServerSupabaseClient } from "@/lib/supabase/serverClient";

export async function getUserTransaction() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  const { data, error } = await supabase
    .from("user_transactions")
    .select("*")
    .eq("renter_id", user.id)
    .order("transaction_date", { ascending: false });

  if (error) {
    console.log(error);
    return { error: error.message };
  }

  return { transactions: data };
}
