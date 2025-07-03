import { NextResponse } from "next/server";
import { connectDB } from '@/lib/db';
import Blog from '@/models/BlogModel';
export async function GET(req, { params }) {
    try {
        await connectDB();
        const blog = await Blog.findById(params.blogId);
        if (!blog) {
            return NextResponse.json({ message: "Blog not found" }, { status: 404 });
        }
        return NextResponse.json({ blog }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

