import { NextResponse } from "next/server";
import blog from "@/models/BlogModel";
import { connectDB } from "@/lib/db";

export async function GET(req, res) {
  try {
    await connectDB();
    const blogId = req.url.split("/").pop();
    const blog = await blog.findById(blogId);
    return NextResponse.json(blog);
  } catch (error) {
    console.log(error);
  }
}