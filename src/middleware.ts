// middleware.ts


import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes";
import { auth } from "./auth"   // শুধু auth import করো, পুরো config নয়


// import authConfig from "./auth.config";
// import NextAuth from "next-auth";
// const { auth } = NextAuth(authConfig)




export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRotue = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)


    if (isApiAuthRoute) {
        return null
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return null
    }

    if (!isLoggedIn && !isPublicRotue) {
        return Response.redirect(new URL("/auth/login", nextUrl))
    }
    return null

})

// optinally, don;t invoke midde or some paths 
export const config = {
    // mathcer:[|"/auth/login", "/auth/register"]
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
} 