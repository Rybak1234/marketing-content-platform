import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import User from "@/models/User";
import { requireAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req);
  if (auth instanceof NextResponse) return auth;
  await dbConnect();

  const [totalPosts, totalUsers, posts] = await Promise.all([
    Post.countDocuments(),
    User.countDocuments(),
    Post.find().lean(),
  ]);

  const byStatus: Record<string, number> = {};
  const byCategory: Record<string, number> = {};
  for (const p of posts) {
    const s = (p as Record<string, unknown>).status as string || "draft";
    const c = (p as Record<string, unknown>).category as string || "Sin categoría";
    byStatus[s] = (byStatus[s] || 0) + 1;
    byCategory[c] = (byCategory[c] || 0) + 1;
  }

  const recentPosts = await Post.find().sort({ createdAt: -1 }).limit(10).select("title slug status category createdAt").lean();

  return NextResponse.json({ totalPosts, totalUsers, byStatus, byCategory, recentPosts });
}
