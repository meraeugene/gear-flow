import { NextResponse } from "next/server";
import { getAllUsers } from "@/actions/usersActions";

export const GET = async () => {
  try {
    const result = await getAllUsers();

    if (result.error) {
      return NextResponse.json({ error: "Failed to users." }, { status: 500 });
    }

    return NextResponse.json({
      data: result.data,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
};
