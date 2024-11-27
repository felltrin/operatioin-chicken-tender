"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: credentials.email,
        password: credentials.password,
      });

      if (result?.error) {
        alert("Login failed: " + result.error);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={credentials.email}
        onChange={(e) =>
          setCredentials({
            ...credentials,
            email: e.target.value,
          })
        }
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({
            ...credentials,
            password: e.target.value,
          })
        }
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
