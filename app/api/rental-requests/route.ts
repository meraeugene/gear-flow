import { NextResponse } from "next/server";
import { getRentalRequestsForMyUnits } from "@/actions/rentalRequestActions";

export const GET = async () => {
  try {
    const result = await getRentalRequestsForMyUnits();

    if (result.error) {
      return NextResponse.json(
        { error: "Failed to rental requests." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      data: result.data,
      totalCount: result.totalCount,
    });
  } catch (error) {
    console.error("Error fetching rental requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch rental requests" },
      { status: 500 },
    );
  }
};
