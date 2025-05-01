import { NextResponse } from "next/server";
import { getAuthUserUnits } from "@/actions/unitActions";

export const GET = async () => {
  try {
    const userUnits = await getAuthUserUnits();

    if (userUnits.error) {
      return NextResponse.json(
        { error: "Failed to user units." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      userUnits: userUnits.data,
    });
  } catch (error) {
    console.error("Error fetching user units:", error);
    return NextResponse.json(
      { error: "Failed to fetch user units" },
      { status: 500 },
    );
  }
};
