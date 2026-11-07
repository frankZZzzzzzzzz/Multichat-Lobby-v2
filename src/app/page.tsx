import { redirect } from "next/navigation";

export default function Page() {
  const hasLoggedIn = true;

  if (hasLoggedIn)
    redirect("/home");
  else
    redirect("/login");
}
