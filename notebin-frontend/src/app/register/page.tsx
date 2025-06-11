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
      setMessage(`Success!!`);
      setTimeout(() => router.push("/"), 1000);
    } catch (e: any) {
      setMessage(`Error: ${e.message}`);
    }
  }

return (
  <div className="max-w-sm mx-auto mt-10 space-y-4 p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-gray-800 text-center">Welcome !!!</h2>
    
    <input
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
      placeholder="Username"
      value={username}
      onChange={e => setUser(e.target.value)}
    />
    
    <input
      type="password"
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
      placeholder="Password"
      value={password}
      onChange={e => setPass(e.target.value)}
    />
    
    <button 
      className="w-full px-4 py-2 bg-amber-300 text-gray-800 rounded-md hover:bg-amber-600 transition-colors"
      onClick={handleRegister}
    >
      Register
    </button>
    
    {message && <p className="text-center text-gray-600">{message}</p>}
  </div>
);
}
