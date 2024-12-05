"use client";
// import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Sidebar>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <p>
          Welcome, {session?.user?.username || session?.user?.email || "user"}
        </p>
      </Sidebar>
    </>
  );
}
