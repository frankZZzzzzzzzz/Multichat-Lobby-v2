import "server-only"
import { verify } from 'argon2';

import { getHashedPassword,  } from '../database/queries';

export async function verifyCredentials(email: string, password: string){
  const hashedPassword = getHashedPassword(email);
  if (!(await verify(hashedPassword, password)))
    return null;

  
}
export async function createUser(username:string, password: string){
  return "NEED TO IMPLEMENT"
}