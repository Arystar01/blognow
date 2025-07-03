import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db.js";
import Blog from "@/models/BlogModel.js";
import Comment from "@/models/CommentModel.js";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(request, { params }) {
    await connectDB();
    try {
        const { blogId, commentId } = params;
        const userId= auth();
        const blog = await Blog.findById(blogId);
        const comment = await Comment.findById(commentId);
        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }
        if (!comment){
            return NextResponse.json({ message: "Comment not found" }, { status: 404 });
        }
        if (comment.author.clerkID !== userId){
            return NextResponse.json({ message: "You are not authorized to delete this comment" }, { status: 403 });
        }
        
        await Comment.findByIdAndDelete(commentId);
        blog.comments.pull(commentId);
        await blog.save();
        return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });     
    } catch (error) {
        console.log("Error deleting comment:", error);  
    }
}