"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  slug: string;
  status: string;
  category: string;
  tags: string[];
  createdAt: string;
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/posts").then((r) => r.json()).then(setPosts);
  }, []);

  const filtered = filter === "all" ? posts : posts.filter((p) => p.status === filter);
  const statusColors: Record<string, string> = { published: "bg-green-100 text-green-700", draft: "bg-yellow-100 text-yellow-700", scheduled: "bg-blue-100 text-blue-700" };

  async function deletePost(id: string) {
    if (!confirm("¿Eliminar esta publicación?")) return;
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (res.ok) setPosts((prev) => prev.filter((p) => p._id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión de Publicaciones</h1>
        <Link href="/dashboard/new" className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition">+ Nueva Publicación</Link>
      </div>

      <div className="flex gap-2 mb-4">
        {["all", "published", "draft", "scheduled"].map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`text-xs px-3 py-1.5 rounded-full transition ${filter === s ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {s === "all" ? "Todos" : s === "published" ? "Publicados" : s === "draft" ? "Borradores" : "Programados"} ({s === "all" ? posts.length : posts.filter((p) => p.status === s).length})
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Título</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Categoría</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Estado</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Fecha</th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((p) => (
              <tr key={p._id}>
                <td className="px-4 py-3">
                  <Link href={`/dashboard/${p._id}/edit`} className="font-medium text-teal-600 hover:text-teal-800">{p.title}</Link>
                </td>
                <td className="px-4 py-3 text-gray-500">{p.category}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[p.status] || "bg-gray-100"}`}>{p.status}</span>
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">{new Date(p.createdAt).toLocaleDateString("es")}</td>
                <td className="px-4 py-3">
                  <button onClick={() => deletePost(p._id)} className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-2 py-1 rounded transition">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="text-center text-gray-400 py-8 text-sm">No hay publicaciones</p>}
      </div>
    </div>
  );
}
