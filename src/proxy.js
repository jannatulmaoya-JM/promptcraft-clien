
import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { cookies, headers } from "next/headers"; 

export async function proxy(request) {
   const session = await auth.api.getSession({
    headers: await headers()
   }) 

   if(!session){
    return NextResponse.redirect(new URL('/signin', request.url))
   }
return NextResponse.next();
}

export default proxy;

export const config = {
    matcher: ['/profile']
}