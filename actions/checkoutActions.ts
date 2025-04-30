"use server";
import { RentalData } from "@/types";
import { createServerSupabaseClient } from "@/lib/supabase/serverClient";

// Creates a rental and its corresponding transaction record
export async function createRentalAndTransaction({
  unitId,
  startDate,
  endDate,
  deliveryMethod,
  totalPrice,
  paymentMethod,
  proofUrl,
}: {
  unitId: string;
  startDate: string;
  endDate: string;
  deliveryMethod: string;
  totalPrice: number;
  paymentMethod: string;
  proofUrl?: string;
}) {
  const supabase = await createServerSupabaseClient();

  // Get the authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  // Step 1: Create a rental record
  const { data: rentalData, error: rentalError } = await supabase
    .from("rentals")
    .insert([
      {
        unit_id: unitId,
        renter_id: user.id,
        start_date: startDate,
        end_date: endDate,
        delivery_method: deliveryMethod, // (delivery or pickup only) - default pickup
        total_price: totalPrice,
        // status ('pending', 'ongoing', 'completed', 'cancelled') default -pending
      },
    ])
    .select(); // Return inserted rental data

  if (rentalError || !rentalData || rentalData.length === 0) {
    console.log(rentalError);
    return { error: rentalError?.message || "Failed to create rental." };
  }

  const rentalId = (rentalData[0] as RentalData).id;

  // Step 2: Create a transaction record for the rental
  const { data: transactionData, error: transactionError } = await supabase
    .from("transactions")
    .insert([
      {
        rental_id: rentalId,
        amount: totalPrice,
        payment_method: paymentMethod,
        proof_of_payment_url: proofUrl || null, // Optional GCash proof image
      },
    ])
    .select();

  if (transactionError || !transactionData || transactionData.length === 0) {
    return {
      error: transactionError?.message || "Failed to create transaction.",
    };
  }

  return {
    success:
      "Thank you! Your rental is confirmed. Check your dashboard for details.",
    redirectUrl: "/account/rentals",
  };
}
