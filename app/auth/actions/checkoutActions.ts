"use server";
import { RentalData } from "@/types";
import { createClient } from "@/utils/supabase/server";

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
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User is not logged in." };
  }

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
    .select();

  if (rentalError || !rentalData || rentalData.length === 0) {
    console.log(rentalError);
    return { error: rentalError?.message || "Failed to create rental." };
  }

  const rentalId = (rentalData[0] as RentalData).id;

  const { data: transactionData, error: transactionError } = await supabase
    .from("transactions")
    .insert([
      {
        rental_id: rentalId,
        amount: totalPrice,
        payment_method: paymentMethod,
        proof_of_payment_url: proofUrl || null,
      },
    ])
    .select();

  if (transactionError || !transactionData || transactionData.length === 0) {
    return {
      error: transactionError?.message || "Failed to create transaction.",
    };
  }

  // const { error: unitUpdateError } = await supabase
  //   .from("units")
  //   .update({ is_available: false })
  //   .eq("id", unitId);

  // if (unitUpdateError) {
  //   console.log("Unit update error:", unitUpdateError.message);
  //   return { error: "Failed to update unit availability." };
  // }

  return {
    success:
      "Thank you! Your rental is confirmed. Check your dashboard for details.",
    redirectUrl: "/account/rentals",
  };
}
