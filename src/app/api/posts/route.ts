import { NextRequest, NextResponse } from "next/server";
import { postStore } from "@/lib/store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const category = searchParams.get("category");

  const filter: Record<string, string> = {};
  if (status) filter.status = status;
  if (category) filter.category = category;

  return NextResponse.json(postStore.findAll(filter));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const post = postStore.create({
    title: body.title,
    content: body.content,
    excerpt: body.excerpt,
    coverImage: body.coverImage || "",
    category: body.category,
    tags: body.tags || [],
    status: body.status || "draft",
    publishAt: body.publishAt || null,
  });
  return NextResponse.json(post, { status: 201 });
}
