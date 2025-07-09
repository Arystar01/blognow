import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Comment from "@/models/CommentModel";
import { auth } from "@clerk/nextjs/server";
import User from "@/models/UserModel";
export async function POST(request, { params }) {
  try {
    await connectDB();
    const { blogId, content } = await request.json();
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    // console.log("User ID:", userId);
    // console.log(blogId, content);
    const user = await User.findOne({ clerkID: userId });
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }
    const author = user._id;


    if (!content || !author || !blogId) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Create a new comment
    const newComment = new Comment({
      author,
      blogId,
      content,
    });

    await newComment.save();

    return NextResponse.json(
      { message: "Comment added successfully", comment: newComment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
