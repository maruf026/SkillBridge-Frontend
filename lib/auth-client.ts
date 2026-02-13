// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   fetchOptions: {
//     credentials: "include", // Essential for cross-domain cookies
//   },
// });


import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
  basePath: "/api/auth",
  fetchOptions: {
    credentials: "include",
  },
});