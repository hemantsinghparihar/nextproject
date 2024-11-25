// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   // Extract token from cookies
//   const token = await getToken({ req, secret: process.env.AUTH_SECRET });

//   // If no token and the user is trying to access a protected route, redirect to login
//   if (!token && req.nextUrl.pathname.startsWith("/startup/create")) {
//     const loginUrl = new URL("/", req.url);
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next(); // Proceed if authenticated
// }

// export const config = {
//   matcher: ["/startup/create", "/user/:path*", "/profile"], // Specify protected routes
// };


import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // Extract token from cookies
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // List of protected routes (matches `matcher`)
  const protectedRoutes = ["/startup/create", "/user/:path*", "/profile"];

  // Check if the requested path matches a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route.replace(":path*", ""))
  );

  // If the route is protected and there's no token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/", req.url); // Change "/" to your login route if needed
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next(); // Proceed if authenticated
}

export const config = {
  matcher: ["/startup/create", "/user/:path*", "/profile"], // Specify protected routes
};
