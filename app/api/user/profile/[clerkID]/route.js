import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/UserModel";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { clerkID } = params;
    console.log("Fetching user for:", clerkID);

    const user = await User.findOne({ clerkID });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error in GET user:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

