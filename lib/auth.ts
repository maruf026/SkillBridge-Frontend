import { cookies } from "next/headers";

export async function getCurrentUser() {
  try {
    // FIX: You MUST await cookies() in Next.js 15+
    const cookieStore = await cookies(); 

    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`, // Standard better-auth endpoint is get-session
      {
        headers: {
          Cookie: cookieHeader,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    // Better-auth usually returns { session, user }
    return data?.user ?? null; 
  } catch (error) {
    console.error("getCurrentUser error:", error);
    return null;
  }
}