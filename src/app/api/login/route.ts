"use server"

import { login } from "@/actions/auth";

export async function POST(request: Request){
  const data = await request.json();
  const { email, password } = data;

  const result = await login(email, password);
  if ("error" in result)
    return Response.json({ error: result.error}, { status: 401 });

  return Response.json({ ok: true });
}