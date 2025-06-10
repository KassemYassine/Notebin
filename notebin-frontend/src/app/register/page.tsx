"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../lib/api";

export default function RegisterPage() {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [message, setMessage] = useState<string|null>(null);
  const router = useRouter();

  async function handleRegister() {
    try {
      const user = await api<{ id: number }>("/users", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      setMessage(`Registered with ID = ${user.id}`);
      setTimeout(() => router.push("/"), 1000);
    } catch (e: any) {
      setMessage(`Error: ${e.message}`);
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-10 space-y-4">
      <h2 className="text-lg font-medium">Register</h2>
      <input
        className="input input-bordered w-full"
        placeholder="Username"
        value={username}
        onChange={e => setUser(e.target.value)}
      />
      <input
        type="password"
        className="input input-bordered w-full"
        placeholder="Password"
        value={password}
        onChange={e => setPass(e.target.value)}
      />
      <button className="btn btn-primary w-full" onClick={handleRegister}>
        Register
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
