import { NextResponse } from "next/server";
import User from "@/models/UserModel";
import blog from "@/models/BlogModel"; // Renamed 'blog' to 'Blog' for convention
import { connectDB } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

// To handle a DELETE request to /api/blog/delete/[blogId]
export async function DELETE(req, { params }) { // Destructure params from the second argument
  try {
    await connectDB();
    const { userId } =  await auth(); // Get the authenticated user's ID from Clerk

    // 1. Check if user is authenticated
    if (!userId) {
      return NextResponse.json(
        { message: "Authentication required." },
        { status: 401 }
      );
    }

    // 2. Extract blogId from URL parameters
    const { blogId } = await  params;
    if (!blogId) {
      return NextResponse.json(
        { message: "Blog ID is required." },
        { status: 400 } // Bad Request
      );
    }

    // 3. Find the blog to delete
    const blogToDelete = await blog.findById(blogId);

    if (!blogToDelete) {
      return NextResponse.json(
        { message: "Blog not found." },
        { status: 404 } // Not Found
      );
    }

    // 4. Verify if the authenticated user is the author of the blog
    // Ensure authorClerkId is stored as a String in your BlogModel
    if (blogToDelete.authorClerkId.toString() !== userId) {
      return NextResponse.json(
        { message: "Unauthorized: You are not the author of this blog." },
        { status: 403 } // Forbidden
      );
    }

    // 5. Delete the blog
    await blog.deleteOne({ _id: blogId }); // Using deleteOne with query is often more robust

    // 6. Update the user's MyBlogs array
    const existingUser = await User.findOne({ clerkID: userId });

    if (existingUser) { // User might not exist if data is inconsistent, handle gracefully
      existingUser.MyBlogs.pull(blogId); // Remove the blog ID from the array
      await existingUser.save();
    } else {
        console.warn(`User with clerkID ${userId} not found when deleting blog ${blogId}. Blog ID not removed from MyBlogs.`);
        // You might consider logging this as a warning or deciding if this warrants an error.
        // For now, it proceeds with blog deletion, which is the primary goal.
    }


    return NextResponse.json(
      { message: "Blog deleted successfully." },
      { status: 200 } // OK
    );

  } catch (error) {
    console.error("Error deleting blog:", error); // Log the full error for debugging
    return NextResponse.json(
      { message: "Internal server error.", error: error.message },
      { status: 500 } // Internal Server Error
    );
  }
}