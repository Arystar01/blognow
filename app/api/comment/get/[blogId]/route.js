import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Comment from "@/models/CommentModel";

// Dynamic GET: /api/comment/[blogId]
export async function GET(req, { params }) {
  const { blogId } = await params;

  if (!blogId) {
    return NextResponse.json(
      { message: "Blog ID is required" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const comments = await Comment.find({ blogId ,parentComment: null })
      .populate("author", "username profilePicture")
      .populate("replies", "content author createdAt likes")
      .sort({ createdAt: -1 });

    if (!comments || comments.length === 0) {
      return NextResponse.json(
        { message: "No comments found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
