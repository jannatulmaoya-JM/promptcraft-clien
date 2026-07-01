
// import { NextResponse } from "next/server";
// import { auth } from "@/lib/auth";
// import { cookies, headers } from "next/headers"; 

// export async function proxy(request) {
//    const session = await auth.api.getSession({
//     headers: await headers()
//    }) 

//    if(!session){
//     return NextResponse.redirect(new URL('/signin', request.url))
//    }
// return NextResponse.next();
// }

// export default proxy;

// export const config = {
//     matcher: ['/profile', ]
// }


// // '/dashboard/user/payment'


import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/dashboard/admin')) {
    if (session.user.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
 
  matcher: [
    '/profile/:path*', 
    '/dashboard/:path*', 
    '/api/prompts/add'
  ], 
};