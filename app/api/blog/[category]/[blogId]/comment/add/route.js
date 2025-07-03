import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db.js";
import Blog from "@/models/BlogModel.js";
import Comment from "@/models/CommentModel.js";

export async function POST(request, { params }) {
await connectDB();
try {
    const { blogId } = params;
    const { userId, content } = await request.json();
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }
    const comment = new Comment({
      userId,
      content,
      blogId: blogId,
    });
    await comment.save();
    blog.comments.push(comment._id);
    await blog.save();
    return NextResponse.json({ message: "Comment added successfully", comment }, { status: 201 });
} catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json({ message: "Error adding comment" }, { status: 500 });
}
}
;