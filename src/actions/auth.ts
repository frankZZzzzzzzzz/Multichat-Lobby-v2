import "server-only"

import { cookies } from 'next/headers';

import { verifyCredentials } from '@/services/users';
import { createSession, destroySession } from '@/services/sessions';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

function sessionCookieName(userID: string){
  return `session_${userID}`
}
async function setCookie(key: string, token: string, expiresAt: Date | null = null){
  const cookieStore = await cookies();
  const Optionals = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
  } as ResponseCookie;
  
  if (expiresAt == null)
    Optionals.maxAge = 60*60*24;
  else
    Optionals.expires = expiresAt;
  
  cookieStore.set(key, token, Optionals);
}

export async function login(email: string, password: string){
  const userID = await verifyCredentials(email, password)
  if (!userID)
    return ({ error: "Invalid Credentials" });

  const sessionToken = createSession(userID);
  await setCookie(sessionCookieName(userID), sessionToken);
  return ({ userID, ok: true });
}

export async function logout(userID: string){
  const cookieStore = await cookies();
  const name = `session_${userID}`;
  const sessionToken = cookieStore.get(name)?.value;

  if (sessionToken)
    destroySession(sessionToken);
  
  cookieStore.delete(name);
  
  return ({ ok: true });
}

export async function logoutAll(){
  const cookieStore = await cookies();
  const allSessions = cookieStore.getAll().filter(({ name }) => name.startsWith("session_"));
  for (const session of allSessions){
    destroySession(session.value);
    cookieStore.delete(session.name);
  }
}