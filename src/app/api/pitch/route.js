import { supabase } from "@/lib/supabaseClient";

export async function GET(request) {
  // Fetching data from the Supabase 'pitches' table
  const { data: pitches, error } = await supabase
    .from("pitches")
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
    `);

  // Error handling
  if (error) {
    console.error("Error fetching pitches:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  console.log("Fetched pitches:", pitches);

  // Returning the fetched data as the response
  return new Response(
    JSON.stringify({ data: pitches }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
