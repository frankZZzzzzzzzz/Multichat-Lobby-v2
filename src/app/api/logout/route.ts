"use server"

import { logout } from "@/actions/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const userID = body.userID;

  if (!userID)
    return Response.json(
      { error: "Missing userID" },
      { status: 400 }
    );

  await logout(userID);

  return Response.json({ ok: true })
}