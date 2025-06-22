import { createClient } from "@/app/utils/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { id } = await context.params;

  await supabase.from("default_items").delete().eq("board_id", id);
  return NextResponse.json({ message: "Deleted existing items" });
}
