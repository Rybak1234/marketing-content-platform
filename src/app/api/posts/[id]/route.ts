import { NextRequest, NextResponse } from "next/server";
import { postStore } from "@/lib/store";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const post = postStore.findById(params.id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const post = postStore.update(params.id, {
    title: body.title,
    content: body.content,
    excerpt: body.excerpt,
    coverImage: body.coverImage,
    category: body.category,
    tags: body.tags,
    status: body.status,
    publishAt: body.publishAt,
  });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const post = postStore.delete(params.id);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ message: "Deleted" });
}
