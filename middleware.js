import {getToken} from "next-auth/jwt";
import {NextResponse} from "next/server";

export async function middleware(req){

    const token = await getToken({
        req,
        secret: process.env.JWT_SECRET,
        secureCookie: false
    })

    console.log("================================== cek token midleware======================")
console.log(req.nextUrl.pathname)
console.log(token)
    if(req.nextUrl.pathname.startsWith('/auth') && token){
        return NextResponse
            .redirect(
                new URL([
                    req.nextUrl.origin,'/'
                ].join('')),
                req.url
            );
    }

    if(
        req
            .nextUrl
            .pathname
            .startsWith('/user') &&
        !token
    ){
        return NextResponse
            .redirect(
                new URL([
                    req.nextUrl.origin,'auth/login'
                ].join('/')),
                req.url
            );
    }
}


export const config = {
    matcher:[
        '/user/:path*',
        '/user',
        '/product/:path*',
        '/product',
        '/about',
        '/about/:path'
    ]
}