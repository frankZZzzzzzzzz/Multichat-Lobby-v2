'use client';

import { useState, useCallback, useContext } from "react"
import { useRouter } from "next/navigation";

import { AuthContext } from "../AuthProvider";

import styles from './page.module.css';
import { AuthenticationResult } from "@/types/authentication";

async function HandleLogin(e: React.SubmitEvent) : Promise<AuthenticationResult> {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const username = formData.get('username');
  const password = formData.get('password');

  if (typeof username !== 'string' || typeof password !== 'string') {
    throw new Error("Something went wrong on Login");
  }

  const response = await fetch("/api/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      username,
      password
    })
  });
  const data = await response.json();
  return data;
}
export default function LoginPage(){
  const auth = useContext(AuthContext);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: React.SubmitEvent) => {
      const result = await HandleLogin(e);
      if (result.success === false)
        setMessage(result.error);
      else{
        auth?.setUserID("USER INFINITY")
        if (window.history.length > 1) {
          router.back();
        } else {
          router.replace("/home");
        }
      }
    }, [auth, router, setMessage])


  return (
    <div className={styles.login_page}>
      {
        message != null ?
        <h1>{message}</h1> :
        <></>
      }
      <h1>Login</h1>
      <form className={styles.login_form} onSubmit={handleSubmit}>
        <label htmlFor="username">Username/Email</label>
        <input id="username" name="username" type="text" placeholder="Username/Email" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <div>
        <p>Don&apos;t have an account? <a href="/register">Register here</a>.</p>
        <p>Forgot your password? <a href="/reset-password">Reset it here</a>.</p>
      </div>
    </div>
  )
}