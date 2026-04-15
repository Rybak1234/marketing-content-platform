import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import UserMenu from "@/components/UserMenu";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Marketing Content Platform",
  description: "Portal de publicaciones para equipos de marketing",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 min-h-screen">
        <AuthProvider>
          <Toaster position="top-right" toastOptions={{ style: { borderRadius: '12px', padding: '12px 16px', fontSize: '14px' } }} />
          <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
              <Link href="/" className="text-lg font-bold text-teal-700">
                📝 ContentHub
              </Link>
              <div className="flex items-center gap-4 text-sm">
                <Link href="/" className="text-gray-600 hover:text-teal-700 transition">
                  Inicio
                </Link>
                <Link href="/dashboard" className="text-gray-600 hover:text-teal-700 transition">
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/new"
                  className="bg-teal-600 text-white px-3 py-1.5 rounded-md hover:bg-teal-700 transition"
                >
                  + Nueva Publicación
                </Link>
                <UserMenu />
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
