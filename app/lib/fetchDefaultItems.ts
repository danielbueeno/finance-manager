import { createClient } from "@/app/utils/supabase/server";

export async function fetchDefaultItemsByBoardId(board_id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("default_items")
    .select("*")
    .eq("board_id", board_id);

  if (error) {
    console.error("Error fetching default items:", error.message);
    throw new Error("Failed to fetch default items");
  }

  return data ?? [];
}
