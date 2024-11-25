import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q"); // Extract 'q' from the query string

  if (!query || query.trim() === "") {
    return NextResponse.json({ error: "Search query cannot be empty." }, { status: 400 });
  }

  try {
    // Search in the 'pitches' table
    const { data, error } = await supabase
      .from("pitches") // Replace 'pitches' with your table name
      .select(`
        id,
        title,
        description,
        category,
        user_id,
        link,
        pitch,
        users (
          name,
          email,
          avatar_url
        )
      `)
      .ilike("title", `%${query}%`); // Case-insensitive search for 'title'

    if (error) {
      throw error;
    }

    return NextResponse.json({ results: data });
  } catch (error) {
    console.error("Error in search API:", error.message);
    return NextResponse.json({ error: "Failed to fetch search results." }, { status: 500 });
  }
}
