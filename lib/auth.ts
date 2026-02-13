import { cookies } from "next/headers";

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    // This is the "Blog Form" way of getting all cookies
    const allCookies = cookieStore.toString(); 

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/get-session`, {
      method: "GET",
      headers: {
        // Pass the cookies exactly like your blog form
        "Cookie": allCookies, 
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data?.user ?? null;
  } catch (error) {
    console.error("Auth Error:", error);
    return null;
  }
}