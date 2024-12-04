"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({
      redirect: true, // Redirects to sign-in page
      callbackUrl: "/login",
    });
  };

  return (
    <nav>
      {session
        ? <button onClick={handleLogout}>Logout</button>
        : <link to="/login">Login</link>}
    </nav>
  );
}
