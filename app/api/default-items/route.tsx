export const runtime = "nodejs";

import { createClient } from "@/app/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get the user's boards
  const { data: boards, error: boardError } = await supabase
    .from("board")
    .select("id")
    .eq("user_id", user.id);

  if (boardError || !boards) {
    return NextResponse.json(
      { error: "Failed to fetch boards" },
      { status: 500 }
    );
  }

  const boardIds = boards.map((b) => b.id);

  if (boardIds.length === 0) {
    return NextResponse.json([]); // No boards = no default items
  }

  // Get default items from those boards
  const { data: defaultItems, error } = await supabase
    .from("default_items")
    .select("*")
    .in("board_id", boardIds)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching default items:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch default items" },
      { status: 500 }
    );
  }

  return NextResponse.json(defaultItems);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const items = await req.json(); // expects an array

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!Array.isArray(items)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // Optional: validate that user owns the board_id
  const boardIds = [...new Set(items.map((i) => i.board_id))];

  const { data: boards } = await supabase
    .from("board")
    .select("id")
    .in("id", boardIds)
    .eq("user_id", user?.id);

  const validBoardIds = boards?.map((b) => b.id) ?? [];

  const filteredItems = items.filter((i) => validBoardIds.includes(i.board_id));

  const { error } = await supabase.from("default_items").insert(filteredItems);

  if (error) {
    console.error("Insert error:", error.message);
    return NextResponse.json(
      { error: "Failed to insert items" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Default items saved" });
}
