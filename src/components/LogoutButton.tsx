"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = () => {
    signOut({
      redirect: true, // Redirects to sign-in page
      callbackUrl: "/login",
    });
  };

  return <button onClick={handleLogout}>Logout</button>;
}
