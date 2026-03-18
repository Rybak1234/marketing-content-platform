import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

async function getAllPosts(): Promise<Post[]> {
  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  const res = await fetch(`${base}/api/posts`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

const statusBadge: Record<string, string> = {
  draft: "bg-yellow-100 text-yellow-800",
  published: "bg-green-100 text-green-800",
  scheduled: "bg-blue-100 text-blue-800",
};

const statusLabel: Record<string, string> = {
  draft: "Borrador",
  published: "Publicado",
  scheduled: "Programado",
};

export default async function DashboardPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm">{posts.length} publicaciones</p>
        </div>
        <Link
          href="/dashboard/new"
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition text-sm font-medium"
        >
          + Nueva Publicación
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {["published", "draft", "scheduled"].map((s) => {
          const count = posts.filter((p) => p.status === s).length;
          return (
            <div key={s} className="bg-white rounded-xl border p-4">
              <p className="text-sm text-gray-500">{statusLabel[s]}</p>
              <p className="text-2xl font-bold text-gray-900">{count}</p>
            </div>
          );
        })}
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border">
          <p className="text-gray-400 text-lg">No hay publicaciones</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Título
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Categoría
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Estado
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Fecha
                </th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <p className="font-medium text-gray-900 text-sm">{post.title}</p>
                    <p className="text-xs text-gray-400 line-clamp-1">{post.excerpt}</p>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">{post.category}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusBadge[post.status]}`}
                    >
                      {statusLabel[post.status]}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString("es")}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/dashboard/${post._id}`}
                      className="text-teal-600 hover:text-teal-800 text-sm font-medium"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
