import { createClient } from "@/app/utils/supabase/server";
import { NextResponse } from "next/server";
export const runtime = "nodejs";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await context.params;
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const periodId = id;

  // 1. Fetch the period to verify ownership
  const { data: period, error: fetchError } = await supabase
    .from("period")
    .select("board_id")
    .eq("id", periodId)
    .single();

  if (fetchError || !period) {
    console.log(periodId);
    return NextResponse.json({ error: "Period not found" }, { status: 404 });
  }

  const { data: board, error: boardError } = await supabase
    .from("board")
    .select("user_id")
    .eq("id", period.board_id)
    .single();

  if (boardError || !board || board.user_id !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 2. Delete the period
  const { error: deleteError } = await supabase
    .from("period")
    .delete()
    .eq("id", periodId);

  if (deleteError) {
    return NextResponse.json(
      { error: "Failed to delete period" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Period deleted" });
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await context.params;

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { incomes, expenses } = body;

  // 1. Confirm the period belongs to this user
  const { data: period, error: periodError } = await supabase
    .from("period")
    .select("board_id")
    .eq("id", id)
    .single();

  if (periodError || !period) {
    return NextResponse.json({ error: "Period not found" }, { status: 404 });
  }

  const { data: board, error: boardError } = await supabase
    .from("board")
    .select("user_id")
    .eq("id", period.board_id)
    .single();

  if (boardError || !board || board.user_id !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // 3. Replace all period_items for this period
  await supabase.from("period_item").delete().eq("period_id", id);

  const allItems = [...incomes, ...expenses].map((item) => ({
    name: item.name,
    amount: item.amount,
    type: item.type,
    period_id: id,
  }));

  if (allItems.length > 0) {
    const { error: insertError } = await supabase
      .from("period_item")
      .insert(allItems);

    if (insertError) {
      return NextResponse.json(
        { error: "Failed to update items" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "Period updated" });
}
