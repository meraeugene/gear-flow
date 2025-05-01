import {
  getAdminUserStats,
  getUserDashboardStats,
} from "@/actions/statsAction";
import { getAuthUser } from "@/actions/authActions";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Fetch the authenticated user first
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch both admin and user stats
    const adminStats = await getAdminUserStats();
    const userStats = await getUserDashboardStats();

    // Handle errors for stats fetching
    if (adminStats.error || userStats.error) {
      return NextResponse.json(
        { error: "Failed to fetch stats" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      user,
      adminStats,
      userStats,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
};
