"use server";

import { createServerSupabaseClient } from "@/lib/supabase/serverClient";

export const getAdminUserStats = async () => {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  try {
    // 1. Total users
    const { count: totalUsers } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    // 2. Banned users
    const { count: bannedUsers } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("is_banned", true);

    // 3. Admins count
    const { count: adminUsers } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("role", "admin");

    // 4. Active users (non-banned)
    const { count: activeUsers } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("is_banned", false);

    // 5. New users this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { count: newUsersThisMonth } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfMonth.toISOString());

    return {
      totalUsers,
      bannedUsers,
      adminUsers,
      activeUsers,
      newUsersThisMonth,
    };
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch user stats." };
  }
};

export const getUserDashboardStats = async () => {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  try {
    // Total Rentals
    const { count: totalRentals } = await supabase
      .from("rentals")
      .select("id", { count: "exact" })
      .eq("renter_id", user.id);

    // Active Rentals
    const { count: activeRentals } = await supabase
      .from("rentals")
      .select("id", { count: "exact" })
      .eq("renter_id", user.id)
      .in("status", ["ongoing", "pending"]);

    // Total Units
    const { count: totalUnits } = await supabase
      .from("units")
      .select("id", { count: "exact" })
      .eq("owner_id", user.id);

    // Completed Rentals (substituting 'returned' with 'completed')
    const { count: completedRentals } = await supabase
      .from("rentals")
      .select("id", { count: "exact" })
      .eq("renter_id", user.id)
      .eq("status", "completed");

    // Revenue

    // Revenue (monthly)
    const { data: revenueData, error: revenueError } = await supabase
      .from("owner_monthly_revenue")
      .select("month, revenue")
      .eq("owner_id", user.id)
      .order("month", { ascending: true });

    if (revenueError) {
      console.error(revenueError);
    }

    const formattedRevenue =
      revenueData?.map((item) => ({
        month: new Date(item.month).toLocaleString("default", {
          month: "short",
          year: "numeric",
        }),
        revenue: Number(item.revenue),
      })) || [];

    return {
      totalRentals,
      activeRentals,
      totalUnits,
      completedRentals,
      revenue: formattedRevenue,
    };
  } catch (error) {
    console.log(error);
    return { error: "Failed to fetch user dashboard stats." };
  }
};
