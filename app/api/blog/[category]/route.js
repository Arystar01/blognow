import { NextResponse } from "next/server";
import Blog from "@/models/BlogModel";
import { connectDB } from "@/lib/db";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const category = params.category?.toLowerCase(); // Normalize if stored as lowercase
    console.log("Category requested:", category);

    const dailyBlogs = await Blog.find({ category });
    const breakingBlogs = await Blog.find({ category, breaking: true });

    return NextResponse.json({ dailyBlogs, breakingBlogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching category blogs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
