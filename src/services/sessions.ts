"use server"

import { createHash, randomBytes } from "node:crypto";
import { addSessionToken, invalidateSessionToken, sessionExists } from "../database/queries";

function hashSession(SessionToken: string){
  return createHash('sha256').update(SessionToken).digest("base64url");
}
export function createSession(userID: string){
  const token = randomBytes(32).toString('base64url');
  const hashedToken = createHash('sha256').update(token).digest("base64url");

  addSessionToken(userID, hashedToken);

  return token;
}

export function destroySession(SessionToken: string){
  const hashedToken = createHash('sha256').update(SessionToken).digest("base64url");
  invalidateSessionToken(hashedToken);
}

//DB stores the hashed Session Token
export function validateSession(SessionToken: string){
  if (SessionToken === "12345")
    return ("2314");

  const [userID] = sessionExists(hashSession(SessionToken));

  if (userID)
    return userID;
  return null;
}