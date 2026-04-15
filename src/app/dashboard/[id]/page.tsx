"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

interface Post {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  status: string;
  publishAt?: string;
}

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`/api/posts/${params.id}`)
      .then((r) => r.json())
      .then(setPost);
  }, [params.id]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const form = new FormData(e.currentTarget);
    const tagsRaw = (form.get("tags") as string) || "";

    const body = {
      title: form.get("title"),
      content: form.get("content"),
      excerpt: form.get("excerpt"),
      coverImage: form.get("coverImage") || "",
      category: form.get("category"),
      tags: tagsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      status: form.get("status"),
      publishAt: form.get("publishAt") || null,
    };

    const res = await fetch(`/api/posts/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      toast.success('Publicación actualizada');
      router.push("/dashboard");
      router.refresh();
    } else {
      setSaving(false);
      toast.error("Error al actualizar");
    }
  }

  async function handleDelete() {
    if (!confirm("¿Eliminar esta publicación?")) return;
    setDeleting(true);

    const res = await fetch(`/api/posts/${params.id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success('Publicación eliminada');
      router.push("/dashboard");
      router.refresh();
    } else {
      setDeleting(false);
      toast.error("Error al eliminar");
    }
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center text-gray-400">
        Cargando...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Editar Publicación</h1>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
        >
          {deleting ? "Eliminando..." : "Eliminar"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input
            name="title"
            required
            defaultValue={post.title}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Extracto</label>
          <input
            name="excerpt"
            required
            defaultValue={post.excerpt}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <select
              name="category"
              required
              defaultValue={post.category}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            >
              <option value="Marketing">Marketing</option>
              <option value="Redes Sociales">Redes Sociales</option>
              <option value="SEO">SEO</option>
              <option value="Email Marketing">Email Marketing</option>
              <option value="Branding">Branding</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              name="status"
              defaultValue={post.status}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
              <option value="scheduled">Programado</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Etiquetas (separadas por coma)
          </label>
          <input
            name="tags"
            defaultValue={post.tags.join(", ")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL de Imagen de Portada
          </label>
          <input
            name="coverImage"
            type="url"
            defaultValue={post.coverImage}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Publicar el (para programados)
          </label>
          <input
            name="publishAt"
            type="datetime-local"
            defaultValue={
              post.publishAt ? new Date(post.publishAt).toISOString().slice(0, 16) : ""
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
          <textarea
            name="content"
            required
            rows={14}
            defaultValue={post.content}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-y"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-teal-600 text-white px-6 py-2.5 rounded-lg hover:bg-teal-700 transition text-sm font-medium disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard")}
            className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition text-sm"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
