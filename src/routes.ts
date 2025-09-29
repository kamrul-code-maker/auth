/**
 * An array routes that are acccessible to the public 
 * These routes do not require authentication 
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
    "/auth/new-verification"
]


/**
 * An  Array or routes that are used for authentication 
 * These routes will redirect logged in users to /settings 
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
]


/** 
 * The prefix for APII authentication route 
 * Routes that start with this prfix are used for API authentication purposes 
 * @type {string} 
 */
export const apiAuthPrefix = "/api/auth"


/**
 * The defult redirect path after loggin in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"