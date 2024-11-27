"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({
      redirect: true, // Redirects to sign-in page
      callbackUrl: "/login",
    });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {session?.user?.name}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
