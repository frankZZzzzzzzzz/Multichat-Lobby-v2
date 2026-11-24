'use client';

import { useContext } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "../AuthProvider";

export default function Page() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  return (
    <>
      <h1>{auth && auth.userID !== ""?
            auth.userID : 
            "NOT LOGGED IN"}</h1>
      <button onClick={()=>router.push("/login")}>LOGIN</button>
    </>
  )
}