"use client";

import { useEffect, useState } from "react";

interface Stats {
  totalPosts: number;
  totalUsers: number;
  byStatus: Record<string, number>;
  byCategory: Record<string, number>;
  recentPosts: { _id: string; title: string; slug: string; status: string; category: string; createdAt: string }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats").then((r) => r.json()).then(setStats);
  }, []);

  if (!stats) return <div className="flex items-center justify-center min-h-[40vh]"><div className="animate-spin w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full" /></div>;

  const statusColors: Record<string, string> = { published: "bg-green-100 text-green-700", draft: "bg-yellow-100 text-yellow-700", scheduled: "bg-blue-100 text-blue-700" };
  const statusLabels: Record<string, string> = { published: "Publicado", draft: "Borrador", scheduled: "Programado" };

  const kpis = [
    { label: "Total Posts", value: stats.totalPosts, icon: "📝", color: "bg-teal-50 text-teal-700" },
    { label: "Publicados", value: stats.byStatus?.published || 0, icon: "✅", color: "bg-green-50 text-green-700" },
    { label: "Borradores", value: stats.byStatus?.draft || 0, icon: "📄", color: "bg-yellow-50 text-yellow-700" },
    { label: "Usuarios", value: stats.totalUsers, icon: "👥", color: "bg-blue-50 text-blue-700" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Panel de Administración</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className={`rounded-xl p-5 ${kpi.color}`}>
            <div className="text-2xl mb-1">{kpi.icon}</div>
            <p className="text-3xl font-bold">{kpi.value}</p>
            <p className="text-sm opacity-70">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Posts por Categoría</h2>
          <div className="space-y-3">
            {Object.entries(stats.byCategory || {}).map(([cat, count]) => (
              <div key={cat} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{cat}</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{count}</span>
                  <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-teal-500" style={{ width: `${Math.min(100, (count / stats.totalPosts) * 100)}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Posts por Estado</h2>
          <div className="space-y-3">
            {Object.entries(stats.byStatus || {}).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[status] || "bg-gray-100 text-gray-600"}`}>
                  {statusLabels[status] || status}
                </span>
                <span className="font-bold text-gray-900">{count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 lg:col-span-2">
          <h2 className="font-semibold text-gray-900 mb-4">Publicaciones Recientes</h2>
          <div className="divide-y divide-gray-100">
            {stats.recentPosts?.map((post) => (
              <div key={post._id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">{post.title}</p>
                  <p className="text-xs text-gray-400">{post.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[post.status] || "bg-gray-100"}`}>
                    {statusLabels[post.status] || post.status}
                  </span>
                  <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString("es")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
