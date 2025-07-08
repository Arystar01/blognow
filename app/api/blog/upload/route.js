// pages/api/blog/create.js (or pages/api/upload.js)

import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs'; // For file system operations (reading temp file)
import path from 'path';
import { v2 as cloudinary } from 'cloudinary'; // Cloudinary SDK
import dbConnect from '../../../lib/db.js'; // Adjust the path to your dbConnect function
import Blog from '@/models/BlogModel.js';
export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Use HTTPS
});


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  await dbConnect(); // Connect to MongoDB

  try {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form:', err);
        return res.status(500).json({ message: 'Error parsing form data' });
      }

      const mainPictureFile = files.MainPicture?.[0]; // Access the first file if multiple
      let imageUrl = ''; // Initialize image URL

      if (mainPictureFile) {
        try {
          // Read the file from the temporary path created by formidable
          const fileBuffer = await fs.readFile(mainPictureFile.filepath);

          // Upload to Cloudinary
          const result = await cloudinary.uploader.upload(mainPictureFile.filepath, {
            folder: 'blog-images', // Optional: folder name in Cloudinary
            // resource_type: 'auto', // Cloudinary automatically detects file type
          });
          imageUrl = result.secure_url; // This is the public HTTPS URL

          // Clean up the temporary file created by formidable
          await fs.unlink(mainPictureFile.filepath);

        } catch (uploadError) {
          console.error('Error uploading image to Cloudinary:', uploadError);
          return res.status(500).json({ message: 'Failed to upload image.', error: uploadError.message });
        }
      }

      // Extract other fields. Formidable returns single values as arrays of strings.
      // Adjust this based on how your `fields` object is structured (can vary slightly by formidable version)
      const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
      const content = Array.isArray(fields.content) ? fields.content[0] : fields.content;
      const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;
      // Convert 'true'/'false' string to boolean
      const breaking = Array.isArray(fields.breaking) ? fields.breaking[0] === 'true' : fields.breaking === 'true';

      // **Important:** Get author details from authenticated user (e.g., Clerk)
      // This is placeholder; you'll integrate with your Clerk authentication here.
      // For example, if you send Clerk User ID in headers from frontend:
      // const authorClerkId = req.headers['x-clerk-user-id'];
      // const authorUsername = req.headers['x-clerk-user-username']; // or fetch from DB
      // const authorProfilePicture = req.headers['x-clerk-user-profile-picture']; // or fetch from DB

      // Placeholder values for author details
      const authorClerkId = 'clerk_user_id_123'; // Replace with actual Clerk user ID
      const authorUsername = 'JohnDoe'; // Replace with actual username
      const authorProfilePicture = 'https://example.com/default-profile.jpg'; // Replace with actual profile pic URL

      // Save blog data to MongoDB
      try {
        const newBlog = await Blog.create({
          title,
          content,
          category,
          breaking,
          MainPicture: imageUrl, // Store the Cloudinary URL
          authorClerkId: authorClerkId,
          authorUsername: authorUsername,
          authorProfilePicture: authorProfilePicture,
        });

        res.status(201).json({ message: 'Blog created successfully!', blog: newBlog });
      } catch (dbErr) {
        console.error('Error saving blog to DB:', dbErr);
        // If DB save fails but image uploaded, you might want to delete from Cloudinary
        if (imageUrl) {
          // This would require the public ID, which is usually part of the URL or a separate field from upload result.
          // For simplicity, omitting auto-delete here, but consider it for robustness.
          // console.log("Consider deleting Cloudinary image if DB save fails:", imageUrl);
        }
        res.status(500).json({ message: 'Failed to save blog data to database.', error: dbErr.message });
      }
    });
  } catch (error) {
    console.error('Unhandled error in API route:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}