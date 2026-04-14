"use client";

import { useAuth } from "./AuthProvider";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function UserMenu() {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (loading) return <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />;

  if (!user) {
    return (
      <div className="flex gap-2 text-sm">
        <Link href="/login" className="text-gray-600 hover:text-teal-700 transition">Iniciar Sesión</Link>
        <Link href="/register" className="bg-teal-600 text-white px-3 py-1.5 rounded-md hover:bg-teal-700 transition">Registro</Link>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-sm">
        <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-xs">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-gray-600 hidden sm:block">{user.name}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
            <span className="text-[10px] bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded-full uppercase font-bold">{user.role}</span>
          </div>
          {user.role === "admin" && (
            <Link href="/admin" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setOpen(false)}>
              Panel Admin
            </Link>
          )}
          <Link href="/dashboard" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setOpen(false)}>
            Dashboard
          </Link>
          <button onClick={() => { logout(); setOpen(false); }} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50">
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}
