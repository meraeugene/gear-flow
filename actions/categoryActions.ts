"use server";

import { createServerSupabaseClient } from "@/lib/supabase/serverClient";
// Server-side action to add a new category
export async function addCategory({
  name,
  description,
  image_url,
}: {
  name: string;
  description: string;
  image_url: string;
}) {
  // Create a Supabase client using server-side session context
  const supabase = await createServerSupabaseClient();

  // Get the currently authenticated user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  // If there's an auth error or no user, return an error
  if (authError || !user) {
    return { error: "User not authenticated." };
  }

  // Insert the new category into the "categories" table
  const { data, error } = await supabase
    .from("categories")
    .insert([
      {
        name,
        description,
        image_url,
      },
    ])
    .select() // Return the newly inserted row
    .single(); // Expecting only one inserted category

  // Handle potential insertion error
  if (error) {
    return { error: error.message };
  }

  // Return the newly created category and success message
  return {
    data,
    message: "Category added successfully.",
  };
}

// Server-side action to fetch all categories from the database
export async function getAllCategories() {
  // Create a Supabase client using server-side session context
  const supabase = await createServerSupabaseClient();

  // Fetch all categories and order them alphabetically by name
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  // If there's an error, return it
  if (error) {
    return { error: error.message };
  }

  // Return the fetched categories
  return { data };
}

// Server-side action to update a specific category by ID
export async function updateCategory(
  categoryId: string,
  data: { name: string; description: string; image_url: string },
) {
  // Create a Supabase client with the current session context
  const supabase = await createServerSupabaseClient();

  // Update the category in the "categories" table
  const { data: category, error } = await supabase
    .from("categories")
    .update({
      name: data.name, // New category name
      description: data.description, // New category description
      image_url: data.image_url, // New image URL
    })
    .eq("id", categoryId) // Target category by ID
    .single(); // Expect a single row result

  // Handle any errors that occurred during update
  if (error) return { error: error.message };

  // Return the updated category data
  return { data: category };
}

// Deletes a category by its ID
export async function deleteCategory(categoryId: string) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", categoryId); // Match category by ID

  if (error) return { error: error.message };

  return { message: "Category deleted successfully" };
}

// Fetches a single category by its ID
export async function getCategoryById(categoryId: string) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", categoryId) // Match category by ID
    .single(); // Expect exactly one result

  if (error) {
    return { error: error.message };
  }

  return { data };
}

// Fetches units associated with a category (with pagination and optional user filtering)
export async function getUnitsByCategory(
  categoryId: string,
  currentPage: number = 1,
  itemsPerPage: number = 12,
) {
  const supabase = await createServerSupabaseClient();

  // Get the currently authenticated user (to optionally exclude their units)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Query units from the category_units view
  let query = supabase
    .from("category_units")
    .select("*", { count: "exact" }) // Also return total count for pagination
    .eq("category_id", categoryId)
    .order("created_at", { ascending: false });

  // Exclude units owned by the logged-in user
  if (user) {
    query = query.neq("owner_id", user.id);
  }

  // Apply pagination using range
  const {
    data,
    error,
    count: totalUnitsCount,
  } = await query.range(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage - 1,
  );

  if (error) {
    console.log(error);
    return { error: error.message };
  }

  return {
    units: data,
    totalUnitsCount,
  };
}
