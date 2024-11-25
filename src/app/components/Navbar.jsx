"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, signIn, useSession } from "next-auth/react";
import logo from "../../../public/logo.png";

const Navbar = () => {
  const { data: session } = useSession();

  const handleSignOut = async () => {
      document.cookie = "next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie =
      "__Secure-next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    await signOut({ callbackUrl: "/" }); // Redirect to home on logout
  };

  const handleSignIn = async () => {
    await signIn("github", { callbackUrl: "/" }); // Default GitHub sign-in
  };

  const handleSignInWithOtherAccount = async () => {
    await signIn("github", { callbackUrl: "/", prompt: "login" }); // Forces reauthentication
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="py-2 mx-[60px] flex justify-between">
        <Link href={"/"} className="flex items-center">
          <Image src={logo} alt="Logo" width={120} height={22} priority />
        </Link>

        <div className="nav-links flex items-center gap-5">
          {session?.user ? (
            <>
              {/* User logged in links */}
              <Link href={"/startup/create"}>
                <span>Create</span>
              </Link>

              <button onClick={handleSignOut}>Sign Out</button>

              <Link href={`/user/${session.user.id}`}>
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <>
              {/* User logged out links */}
              <button onClick={handleSignIn}>Sign In</button>

              <button onClick={handleSignInWithOtherAccount}>
                Sign In with Another Account
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;




// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import logo from "../../../public/logo.png";
// import { signOut, signIn, auth } from "../../../auth";

// const Navbar = async () => {
//   const session = await auth();

//   return (
//     <header className="bg-white shadow-sm">
//       <nav className="py-2 mx-[60px] flex justify-between">
//         <Link href={"/"} className="flex items-center">
//           <Image src={logo} alt="Logo" width={120} height={22} priority />
//         </Link>

//         <div className="nav-links flex items-center gap-5">
//           {session && session?.user ? (
//             <>
//               {/* User logged in links */}
//               <Link href={"/startup/create"}>
//                 <span>Create</span>
//               </Link>

//               <form
//                 action={async () => {
//                   "use server";
//                   // Clear the session and cookies completely
//                   await signOut({ callbackUrl: "/" });
//                   document.cookie = "next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
//                   document.cookie =
//                     "__Secure-next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
//                 }}
//               >
//                 <button type="submit">Sign Out</button>
//               </form>

//               <Link href={`/user/${session.user.id}`}>
//                 <span>{session?.user?.name}</span>
//               </Link>
//             </>
//           ) : (
//             <>
//               {/* User logged out links */}
//               <form
//                 action={async () => {
//                   "use server";
//                   // Redirect user to GitHub sign-in explicitly
//                   await signIn("github", { callbackUrl: "/" });
//                 }}
//               >
//                 <button type="submit">Sign In</button>
//               </form>

//               <form
//                 action={async () => {
//                   "use server";
//                   // Redirect user to GitHub sign-in explicitly, ensuring a fresh session
//                   await signIn("github", {
//                     callbackUrl: "/",
//                     prompt: "login", // Forces GitHub to show login screen
//                   });
//                 }}
//               >
//                 <button type="submit">Sign In with Another Account</button>
//               </form>
//             </>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;







// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import logo from "../../../public/logo.png";
// import { signOut, signIn, auth } from "../../../auth";

// const Navbar = async () => {
//   const session = await auth();

//   return (
//     <header className="bg-white shadow-sm">
//       <nav className="py-2 mx-[60px] flex justify-between">
//         <Link href={"/"} className=" flex items-center">
//           <Image src={logo} alt="Logo" width={120} height={22} priority />
//         </Link>

//         <div className="nav-links flex items-center gap-5">
//           {session && session?.user ? (
//             <>
//               <Link href={"/startup/create"}>
//                 <span>Create</span>
//               </Link>

//               <form
//                 action={async () => {
//                   "use server";
//                   await signOut();
//                   document.cookie = "next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
//                   document.cookie = "__Secure-next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
//                 }}
//               >
//                 <button type="submit">Sign Out</button>
//               </form>

//               <Link href={`/user/${session.user.id}`}>
//                 <span>{session?.user?.name}</span>
//               </Link>
//             </>
//           ) : (
//             <>
              
//               <form
//                 action={async () => {
//                   "use server";
//                   await signIn("github"); // Modify to add other providers if needed
//                 }}
//               >
//                 <button type="submit" >
//                   Sign In
//                 </button>
//               </form>

//               <form
//                 action={async () => {
//                   "use server";
//                    // Ensure the current session is cleared
//                   await signIn("github"); // Modify to add other providers if needed
//                 }}
//               >
//                 <button type="submit" >
//                   SignIn with other account
//                 </button>
//               </form>
//             </>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;




// import React from "react";
// import Link from "next/link";
// import Image from "next/image";
// import logo from "../../../public/logo.png";
// // import {auth} from '@/auth'
// import { signOut, signIn, auth } from "../../../auth";

// const Navbar = async () => {
//   const session = await auth();
  
//   return (
//     <header className="bg-white shadow-sm">
//       <nav className="py-2 mx-[60px] flex justify-between ">
//         <Link href={"/"}>
//           <Image src={logo} alt="Logo" width={120} height={22} priority />
//         </Link>

//         <div className="nav-links flex items-center gap-5 ">
//           {session && session?.user ? (
//             <>
//               <Link href={"/startup/create"}>
//                 <span>Create</span>
//               </Link>

//               <form
//                 action={async () => {
//                   "use server";
//                   await signOut();
//                   document.cookie = "next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
//                   document.cookie = "__Secure-next-auth.session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
              
                    
//                 }}
//               >
//                 <button type="submit">Sign Out</button>
//               </form>

//               <Link href={`/user/${session.user.id}`}>
//                 <span>{session?.user?.name}</span>
//               </Link>
//             </>
//           ) : (
//             <>
//               <form
//                 action={async () => {
//                   "use server";
//                   await signIn("github");
//                 }}
//               >
//                 <button type="submit">LogIn</button>
//               </form>
//             </>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;
