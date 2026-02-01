import { NextResponse } from "next/server";

export async function POST() {
  await fetch("http://localhost:5000/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  return NextResponse.json({ success: true });
}
