import { NextResponse } from "next/server";

export async function POST() {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  return NextResponse.json({ success: true });
}
