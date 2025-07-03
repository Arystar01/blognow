import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db";
import User from "@/models/UserModel";
import Blog from "@/models/BlogModel";

export async function GET(req, context) {
    await connectDB();
  const { clerkID } = context.params; // ✅ This avoids the sync error

  const user = await User.findOne({ clerkID }).populate("MyBlogs");
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ blogs: user.MyBlogs }, { status: 200 });
}
