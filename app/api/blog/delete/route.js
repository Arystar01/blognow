
import { NextResponse } from "next/server";
import User from "@/models/UserModel";
import blog from "@/models/BlogModel";
import { connectDB } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

//  creating post function for adding a blog
export async function POST(req, res) {
  try {
    await connectDB();
    const {userId}= auth();
    const {blogId}= await req.json();
    const existingUser= await User.findOne({clerkID:userId});
    if(!existingUser){
      return NextResponse.json({message:"user not found"})
    }
    const blogToDelete= await blog.findById(blogId);
    if(!blogToDelete){
      return NextResponse.json({message:"blog not found"})
    }
    if(blogToDelete.authorClerkId.toString() !== userId){
      return NextResponse.json({message:"you are not the author of this blog"})
    }
    await blogToDelete.deleteOne();
    existingUser.MyBlogs.pull(blogId);
    await existingUser.save();
    return NextResponse.json({message:"blog deleted successfully"});
  }
  catch (error) {
    console.log(error);

  }
}