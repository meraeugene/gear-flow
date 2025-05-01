import { NextResponse } from "next/server";
import { getAllCategories } from "@/actions/categoryActions";

export const GET = async () => {
  try {
    const result = await getAllCategories();

    if (result.error) {
      return NextResponse.json(
        { error: "Failed to categories." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      data: result.data,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
};
