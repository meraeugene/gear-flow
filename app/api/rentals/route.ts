import { NextResponse } from "next/server";
import { getRentalStatus } from "@/actions/rentalActions";

export const GET = async () => {
  try {
    const rentals = await getRentalStatus();

    if (rentals.error) {
      return NextResponse.json(
        { error: "Failed to rentals." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      rentals: rentals.data,
    });
  } catch (error) {
    console.error("Error fetching rentals:", error);
    return NextResponse.json(
      { error: "Failed to fetch rentals" },
      { status: 500 },
    );
  }
};
