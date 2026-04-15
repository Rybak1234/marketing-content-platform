"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

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

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      toast.success('Publicación creada');
      router.push("/dashboard");
      router.refresh();
    } else {
      setSaving(false);
      toast.error("Error al crear la publicación");
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Nueva Publicación</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input
            name="title"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            placeholder="Título de la publicación"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Extracto</label>
          <input
            name="excerpt"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            placeholder="Breve descripción del artículo"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
            <select
              name="category"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            >
              <option value="">Seleccionar</option>
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
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            placeholder="react, marketing, tips"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL de Imagen de Portada
          </label>
          <input
            name="coverImage"
            type="url"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
            placeholder="https://res.cloudinary.com/..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Publicar el (para programados)
          </label>
          <input
            name="publishAt"
            type="datetime-local"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
          <textarea
            name="content"
            required
            rows={14}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-y"
            placeholder="Escribe el contenido de tu publicación aquí..."
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-teal-600 text-white px-6 py-2.5 rounded-lg hover:bg-teal-700 transition text-sm font-medium disabled:opacity-50"
          >
            {saving ? "Guardando..." : "Crear Publicación"}
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
