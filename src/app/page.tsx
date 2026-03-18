import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  status: string;
  createdAt: string;
}

async function getPublishedPosts(): Promise<Post[]> {
  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  const res = await fetch(`${base}/api/posts?status=published`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  const posts = await getPublishedPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          Portal de Contenido
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Crea y publica contenido digital desde un solo lugar. Diseñado para equipos de marketing.
        </p>
      </section>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📄</div>
          <p className="text-gray-400 text-lg mb-4">No hay publicaciones aún</p>
          <Link
            href="/dashboard/new"
            className="inline-block bg-teal-600 text-white px-5 py-2.5 rounded-lg hover:bg-teal-700 transition"
          >
            Crear primera publicación
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post._id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition"
            >
              {post.coverImage && (
                <div className="h-44 bg-gray-100 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-5">
                <span className="text-xs font-semibold text-teal-600 uppercase tracking-wide">
                  {post.category}
                </span>
                <h2 className="text-lg font-bold text-gray-900 mt-1 mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-3 mb-3">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
