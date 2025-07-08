
import { NextResponse } from "next/server";
import User from "@/models/UserModel";
import Blog from "@/models/BlogModel";
import { connectDB } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

import { uploadImageToCloudinary, deleteImageFromCloudinary } from "@/lib/cloudinary"; 

export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { userId } =  await auth(); // Get userId from Clerk
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { blogId } = params; // Get the blog ID from the URL parameters
    if (!blogId) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    const blogToUpdate = await Blog.findById(blogId);

    if (!blogToUpdate) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Ensure the authenticated user is the author of the blog
    if (blogToUpdate.authorClerkId.toString() !== userId) {
      return NextResponse.json({ error: "Forbidden: You are not the author of this blog" }, { status: 403 });
    }

    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const category = formData.get("category"); // Assuming category is also part of form data
    const breaking = formData.get("breaking") === 'true'; // Convert string 'true' to boolean true

    let newMainPictureUrl = blogToUpdate.MainPicture; // Default to existing picture
    let newMainPicturePublicId = blogToUpdate.MainPicturePublicId; // Default to existing public ID

    const mainPictureFile = formData.get("MainPicture"); // This will be a File object if uploaded

    // Handle MainPicture update if a new file is provided
    if (mainPictureFile && mainPictureFile.size > 0) {
      // Convert File to Buffer
      const arrayBuffer = await mainPictureFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload new image to Cloudinary
      const uploadResult = await uploadImageToCloudinary(buffer);

      if (uploadResult && uploadResult.secure_url) {
        // Delete old image from Cloudinary if it exists
        if (blogToUpdate.MainPicturePublicId) {
          try {
            await deleteImageFromCloudinary(blogToUpdate.MainPicturePublicId);
          } catch (deleteError) {
            console.warn(`Failed to delete old image ${blogToUpdate.MainPicturePublicId}:`, deleteError);
            // Don't block the update if old image deletion fails
          }
        }
        newMainPictureUrl = uploadResult.secure_url;
        newMainPicturePublicId = uploadResult.public_id;
      } else {
        // If upload fails, you might want to return an error or log it
        console.error("Cloudinary upload failed for new MainPicture.");
        // Optionally, return an error to the client
        // return NextResponse.json({ error: "Failed to upload new main picture" }, { status: 500 });
      }
    }

    // Update blog fields
    blogToUpdate.title = title || blogToUpdate.title; // Only update if provided
    blogToUpdate.content = content || blogToUpdate.content;
    blogToUpdate.category = category || blogToUpdate.category;
    blogToUpdate.breaking = breaking; // Always update breaking checkbox value
    blogToUpdate.MainPicture = newMainPictureUrl;
    blogToUpdate.MainPicturePublicId = newMainPicturePublicId; // Store public ID for deletion

    await blogToUpdate.save();

    return NextResponse.json(
      { message: "Blog updated successfully", blog: blogToUpdate },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
