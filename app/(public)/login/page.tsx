"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:5000/api/auth/sign-in/email", {
      method: "POST",
      credentials: "include", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setError("Invalid credentials");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form autoComplete="off" onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white p-2">
          Login
        </button>
      </form>
    </div>
  );
}
