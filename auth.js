import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { supabase } from "@/lib/supabaseClient";

export const authOptions = {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60, // Set session max age to 2 hours
    updateAge: 1 * 60 * 60, // Update session every hour
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        // Check if the user exists in Supabase
        const { data, error } = await supabase
          .from("users")
          .select("id")
          .eq("email", user.email)
          .single();

        if (error && error.code === "PGRST116") {
          // User does not exist, insert a new record
          const { data: newUser, error: insertError } = await supabase
            .from("users")
            .insert({
              email: user.email,
              name: user.name,
              avatar_url: user.image,
            })
            .select("id")
            .single();

          if (insertError) {
            console.error("Error inserting user into Supabase:", insertError.message);
            throw new Error("Failed to create user");
          }

          // Assign the new user's id to the token
          token.sub = newUser.id;
        } else if (data) {
          // User exists, assign the existing id to the token
          token.sub = data.id;
        } else {
          console.error("Unexpected error querying user in Supabase:", error.message);
          throw new Error("Failed to fetch user");
        }
      }
      return token;
    },

    async session({ session, token }) {
      // Add the persistent user id to the session
      session.user.id = token.sub;
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);













// import NextAuth from "next-auth"
// import GitHub from "next-auth/providers/github"
// import { supabase } from "@/lib/supabaseClient";
 
// export const authOptions = {
//   providers: [
//     GitHub({
//       clientId: process.env.AUTH_GITHUB_ID,
//       clientSecret: process.env.AUTH_GITHUB_SECRET,
//     })
//   ],
//   // session: {
//   //   strategy: "jwt", // Use JWT to store session data
//   //   maxAge: 30 * 24 * 60 * 60, // 30 days
//   //   updateAge: 24 * 60 * 60, // Update session after 24 hours
//   // },
//   session: {
//     strategy: "jwt", // Use JWT to store session data
//     maxAge: 2*60*60, // Set session max age to 2 hours
//     updateAge: 1 * 60 * 60, // Update session every hour
//   },

//   callbacks: {

//     // async jwt({ token, user,account }) {
      
//     //   if (user) {
//     //     token.sub = user.id;
//     //   }
//     //   return token;
//     // },

//     // async jwt({ token, account, user }) {
//     //   // On first time sign-in or when the account data changes, update the user in the DB
//     //   if (account && user) {
//     //     // Add or update the user in Supabase
//     //     const { data, error } = await supabase
//     //       .from('users')
//     //       .upsert({
//     //         email: user.email,
//     //         name: user.name,
//     //         avatar_url: user.image,
//     //       }, { onConflict: ['email'] })  // On conflict (same email), update the record

//     //     if (error) {
//     //       console.error("Error inserting/updating user in Supabase:", error.message);
//     //     } else {
//     //       token.id = data[0].id;  // Attach user id to the token
//     //     }
//     //   }
//     //   return token;  // Return the token with the added or updated user info
//     // },
//     async jwt({ token, account, user }) {
//       if (account && user) {
//         // Add or update the user in Supabase
//         const { data, error } = await supabase
//           .from('users')
//           .upsert({
//             email: user.email,
//             name: user.name,
//             avatar_url: user.image,
//           }, { onConflict: ['email'] }); // On conflict (same email), update the record
    
//         if (error) {
//           console.error("Error inserting/updating user in Supabase:", error.message);
//         } else if (data && data.length > 0) {
//           token.id = data[0].id;  // Attach user id to the token
//         } else {
//           console.error("No data returned from Supabase for upsert operation.");
//         }
//       }
//       return token;
//     },
    

//     async session({ session, token }) {
//       // Add custom fields to session if needed
//       session.user.id = token.sub;
//       return session;
//     },
//   },
// };


// export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)