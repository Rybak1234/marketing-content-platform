"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const err = await login(email, password);
    setLoading(false);
    if (err) setError(err);
    else router.push("/dashboard");
  }

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center bg-gradient-to-br from-gray-50 to-teal-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <div className="text-4xl mb-2">📝</div>
          <h1 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h1>
          <p className="text-gray-500 text-sm">Accede a ContentHub</p>
        </div>
        {error && <div className="bg-red-50 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder="tu@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-teal-600 text-white py-2.5 rounded-xl font-medium hover:bg-teal-700 transition disabled:opacity-50">
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">¿No tienes cuenta? <Link href="/register" className="text-teal-600 hover:text-teal-800 font-medium">Regístrate</Link></p>
        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-500">
          <p className="font-semibold mb-1">Credenciales demo:</p>
          <p>Admin: admin@contenthub.com / admin123</p>
          <p>Editor: editor@contenthub.com / editor123</p>
        </div>
      </div>
    </div>
  );
}
