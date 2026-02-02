import { cookies } from "next/headers";

export async function hasTutorProfile() {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    "http://localhost:5000/api/tutors/profile/me",
    {
      headers: {
        Cookie: cookieHeader,
      },
      cache: "no-store",
    }
  );

  return res.ok; // 200 = profile exists, 404 = not exists
}
