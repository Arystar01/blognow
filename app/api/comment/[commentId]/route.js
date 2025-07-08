import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Comment from "@/models/CommentModel";
import { auth } from "@clerk/nextjs/server";
import User from "@/models/UserModel";


export async function POST(req, {params}){
    
    const { commentId } =  await params;
    const { content,  blogId, parentComment } = await req.json();
    const {userId}= await auth();
    connectDB();
    try {
        const existingComment = await Comment.findById(commentId);
        if (!existingComment) {
            return NextResponse.json({ message: "Comment not found" }, { status: 404 });
        }
        if (!content || !userId || !blogId) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }
       const user = await User.findOne({ clerkID: userId });
 if(!user){
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const author = user._id; // Assuming the User model has an _id field
        
        const newComment = new Comment({
            content,
            author,
            blogId: blogId || existingComment.blogId, // Use existing blogId if not provided
            parentComment: existingComment._id // Set the parent comment to the existing comment
        });
        

        await newComment.save();
      existingComment.replies.push(newComment._id);

        await existingComment.save();
        return NextResponse.json({ message: "Comment added successfully", comment: newComment }, { status: 201 });
    }

     catch (error) {
        console.error("Error adding comment:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        
    }
}