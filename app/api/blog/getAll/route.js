import { NextResponse } from "next/server";
import { connectDB } from '@/lib/db';
import Blog from '@/models/BlogModel';
export async function GET(req, res) {
    try {
        await connectDB();
        const blogs = await Blog.find({});
        //  populate the author field with user data, which contains, authorusername, authorlerkId

        return NextResponse.json({ blogs }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};
