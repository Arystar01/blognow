import { NextResponse } from "next/server";
import blog from "@/models/BlogModel";
import { connectDB } from "@/lib/db";

export async function GET(req, res) {
  try {
    await connectDB();
    const category = req.url.split("/").pop();
    const dailyBlogs = await blog.find({ category: category });
    const breakingBlogs = await blog.findOne({ breaking: true , category: category });
    return NextResponse.json({ dailyBlogs, breakingBlogs });
  } catch (error) {
    console.log(error);
  }
}