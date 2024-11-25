import { supabase } from "@/lib/supabaseClient";

export async function POST(request){
console.log('✌️request we are in the pitch creation route--->');

 
        const {title,description,category,link,pitch,user_id}=await request.json();


        const { data, error } = await supabase
      .from('pitches')
      .insert([{ title, description,category,link,pitch,user_id }]);

        // Check for errors
        // if (error) {
        // return new Response(JSON.stringify({ error: error.message }), {
        //     status: 500,
        // });
        // }

        if (error) {
            console.error('Supabase Error:', error);
            return new Response(JSON.stringify({ error: error.message }), {
              status: 500,
            });
          }

        // Success response
        return new Response(JSON.stringify({ data }), {
        status: 200,
        });

        
    
   

}