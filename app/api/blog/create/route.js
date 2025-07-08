import { NextResponse } from "next/server";
import User from "@/models/UserModel";
import Blog from "@/models/BlogModel";
import { connectDB } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from 'cloudinary'; // Import Cloudinary SDK

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Use HTTPS
});

export async function POST(req) {
  try {
    await connectDB();

    const { userId } =  await auth(); // Clerk's auth() is synchronous in App Router route handlers
    console.log("userId:", userId);

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const category = formData.get("category")?.toLowerCase();

    // Convert 'breaking' from string ('true'/'false') to boolean
    const breaking = formData.get("breaking") === 'true';

    const MainPictureFile = formData.get("MainPicture"); // This will be a File object or null/undefined

    let imageUrl = ''; // Initialize imageUrl

    // --- Cloudinary Upload Logic ---
    if (MainPictureFile instanceof File && MainPictureFile.size > 0) {
      try {
        
        const arrayBuffer = await MainPictureFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: 'blog-main-pictures', // Optional: specify a folder in Cloudinary
              resource_type: 'auto', // Automatically detect image/video/raw
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          ).end(buffer);
        });

        imageUrl = uploadResult.secure_url; // Get the secure URL of the uploaded image

      } catch (uploadError) {
        console.error("Error uploading image to Cloudinary:", uploadError);
        return NextResponse.json(
          { message: "Failed to upload image", error: uploadError.message },
          { status: 500 }
        );
      }
    }
    // --- End Cloudinary Upload Logic ---

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
      MainPicture: imageUrl, // Store the Cloudinary URL here
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
