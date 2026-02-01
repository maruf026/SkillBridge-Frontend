export async function getCurrentUser() {
  try {
    const res = await fetch("http://localhost:5000/api/auth/me", {
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) return null;

    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

