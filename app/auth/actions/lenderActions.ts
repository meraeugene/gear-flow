"use server";

import { createClient } from "@/utils/supabase/server";

export async function getAllLenders(
  currentPage: number = 1,
  itemsPerPage: number = 10,
) {
  const supabase = await createClient();

  const from = (currentPage - 1) * itemsPerPage;
  const to = currentPage * itemsPerPage - 1;

  const { data, error, count } = await supabase
    .from("lender_summary")
    .select("*", { count: "exact" })
    .order("unit_count", { ascending: false })
    .range(from, to);

  if (error) {
    console.error(error);
    return { error: error.message };
  }

  return {
    data,
    totalCount: count,
  };
}
