import { NextResponse ,NextRequest } from "next/server";

export function middleware(req:NextRequest){
 const { pathname } = req.nextUrl;
const token= req.cookies.get('access_token_login')?.value;
    const resetCode = req.cookies.get("verifyCode");
    const email_reset_pass = req.cookies.get("reset_pass_email");
if(pathname==='/register'||pathname==='/login'){
  if(token){
    return NextResponse.redirect(new URL('profile',req.url))
  }
  else{
    
    return NextResponse.next();
  }
}
 if (pathname === "/verificationCode") {
        if (email_reset_pass) {
            return NextResponse.next();
        }
        else{

          return NextResponse.redirect(new URL("/login", req.url));
        } 
    }
    if (pathname === "/resetPassword") {
        if (email_reset_pass && resetCode) {
            return NextResponse.next();
        } else return NextResponse.redirect(new URL("/login", req.url));
    }
}
export const config = {
  matcher: [
    '/register',
    '/login',
    "/verificationCode",
    "/resetPassword",
  ],
}