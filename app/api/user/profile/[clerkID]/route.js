import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/UserModel";

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Use HTTPS
});

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { clerkID } = await params;
    // console.log("Fetching user for:", clerkID);

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


export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { clerkID } =  await params; // Get clerkID from the URL parameters

    const formData = await req.formData(); // Parse incoming FormData
    const bio = formData.get("bio"); // Get bio from formData
    const gender = formData.get("gender"); // Get gender from formData
    const profilePictureFile = formData.get("profilePicture"); // Get the File object

    let updatedProfilePictureUrl = '';
    const updateFields = {}; // Object to hold fields to update in MongoDB

    // Add bio and gender to updateFields if they exist
    if (bio !== null) { // Check for null as formData.get returns null if field is not present
      updateFields.bio = bio;
    }
    if (gender !== null) {
      updateFields.gender = gender;
    }

    // --- Cloudinary Upload Logic for Profile Picture ---
    if (profilePictureFile instanceof File && profilePictureFile.size > 0) {
      try {
        const arrayBuffer = await profilePictureFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: 'user-profile-pictures', // Optional: specify a folder in Cloudinary
              resource_type: 'auto', // Automatically detect image/video/raw
              public_id: `clerk_${clerkID}_profile_pic`, // Optional: Use Clerk ID for predictable public_id
              overwrite: true // Important: Overwrite if a picture with this public_id already exists
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          ).end(buffer);
        });

        updatedProfilePictureUrl = uploadResult.secure_url;
        updateFields.profilePicture = updatedProfilePictureUrl; // Add Cloudinary URL to updateFields

      } catch (uploadError) {
        console.error("Error uploading profile picture to Cloudinary:", uploadError);
        return NextResponse.json(
          { message: "Failed to upload profile picture", error: uploadError.message },
          { status: 500 }
        );
      }
    }
    // --- End Cloudinary Upload Logic ---

    // Find the user and update the fields
    const updatedUser = await User.findOneAndUpdate(
      { clerkID },
      updateFields, // Use the dynamically built updateFields object
      { new: true, runValidators: true } // `new: true` returns the updated doc; `runValidators` ensures schema validation
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error in PUT user:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}