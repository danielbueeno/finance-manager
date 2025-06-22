import { fetchDefaultItemsByBoardId } from "@/app/lib/fetchDefaultItems";
import { createClient } from "@/app/utils/supabase/server";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, start_date, end_date, board_id } = body;

  if (!name || !start_date || !end_date || !board_id) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // 1. Create the new period
  const { data: periodData, error: periodError } = await supabase
    .from("period")
    .insert([{ name, start_date, end_date, board_id }])
    .select()
    .single();

  if (periodError || !periodData) {
    console.error("Error creating period:", periodError);
    return NextResponse.json(
      { error: "Failed to create period" },
      { status: 500 }
    );
  }

  // 2. Fetch default items
  let defaultItems;
  try {
    defaultItems = await fetchDefaultItemsByBoardId(board_id);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }

  // 3. Create period_items
  const periodItems = defaultItems.map((item) => ({
    name: item.name,
    amount: item.amount,
    type: item.type,
    period_id: periodData.id,
  }));

  const { data: insertedItems, error: insertItemsError } = await supabase
    .from("period_item")
    .insert(periodItems)
    .select();

  if (insertItemsError) {
    console.error("Error inserting period items:", insertItemsError);
    return NextResponse.json(
      { error: "Period created, but failed to add items" },
      { status: 500 }
    );
  }

  // 4. Return period data with inserted items
  return NextResponse.json(
    {
      ...periodData,
      items: insertedItems,
    },
    { status: 201 }
  );
}

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get all periods for user's boards, including period_items
  const { data, error } = await supabase
    .from("period")
    .select(
      `
        *,
        items:period_item(*)
      `
    )
    .in(
      "board_id",
      (
        await supabase.from("board").select("id").eq("user_id", user.id)
      ).data?.map((b) => b.id) ?? []
    )
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching periods:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch periods" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}
