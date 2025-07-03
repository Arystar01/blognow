import { NextResponse } from "next/server";
import User from "@/models/UserModel";
import Blog from "@/models/BlogModel";
import { connectDB } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    await connectDB();

    const { userId } = await auth(); // ✅ Awaited now
    console.log("userId:", userId);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData(); // ✅ You're sending FormData
    const title = formData.get("title");
    const content = formData.get("content");
   const category = formData.get("category")?.toLowerCase();

    const breaking = formData.get("breaking");
    const MainPicture = formData.get("MainPicture");

    const existingUser = await User.findOne({ clerkID: userId });
    if (!existingUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const newBlog = await Blog.create({
      title,
      content,
      category,
      authorClerkId: userId,
      authorUsername: existingUser.username,
      authorFirstName: existingUser.firstname,
      authorLastName: existingUser.lastname,
      authorProfilePicture: existingUser.profilePicture,
      MainPicture,
      breaking,
    });

    existingUser.MyBlogs.push(newBlog._id);
    await existingUser.save();

    return NextResponse.json(
      { message: "Blog created successfully", newBlog },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
