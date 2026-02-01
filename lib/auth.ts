import { cookies } from "next/headers";

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map(
        (cookie) => `${cookie.name}=${cookie.value}`
      )
      .join("; ");

    const res = await fetch("http://localhost:5000/api/auth/me", {
      headers: {
        Cookie: cookieHeader, 
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("getCurrentUser error:", error);
    return null;
  }
}
