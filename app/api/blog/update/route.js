
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
    const { title, content, category , MainPicture} = await req.json();
    const existingUser= await User.findOne({clerkID:userId});
    if(!existingUser){
      return NextResponse.json({message:"user not found"})
    }
    const newBlog= await blog.updateOne({
      title,
      content,
      category,
      authorClerkId :userId,
      authorUsername: existingUser.username,
      authorFirstName: existingUser.firstName,
      authorLastName: existingUser.lastName,
      authorProfilePicture: existingUser.profilePicture,
      MainPicture: MainPicture,
    });
    await newBlog.save();
    existingUser.MyBlogs.push(newBlog._id);
    await existingUser.save();
    return NextResponse.json({message:"blog created successfully",newBlog})



  }
  catch (error) {
    console.log(error);

  }
}