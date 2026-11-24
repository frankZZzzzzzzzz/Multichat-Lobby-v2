import { cookies } from "next/headers";

import { validateSession } from "@/services/sessions";
import { SessionValidationResult } from "@/types/authentication";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  if (!sessionToken){
    return Response.json({
      valid: false
    } as SessionValidationResult,
    { status: 401 });
  }
  const validationResult = validateSession(sessionToken);

  if (!validationResult){
    return Response.json({
      valid: false
    } as SessionValidationResult,
    { status: 401 });
  }

  return Response.json({
    valid: true,
    userID: validationResult
  } as SessionValidationResult);
}