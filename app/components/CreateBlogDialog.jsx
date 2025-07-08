// components/CreateBlogDialog.jsx
"use client"; // This component needs to be a client component

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Adjust path if necessary

const CreateBlogDialog = ({ open, onOpenChange, onBlogCreated }) => {
  const [BlogData, setBlogData] = useState({
    title: "",
    content: "",
    category: "",
    breaking: false,
    MainPicture: null, // Holds the File object
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reset form data when dialog opens or closes
  useEffect(() => {
    if (!open) {
      setBlogData({
        title: "",
        content: "",
        category: "",
        breaking: false,
        MainPicture: null,
      });
      setError(null); // Clear previous errors
    }
  }, [open]);

  const handleChangeBlog = (e) => {
    const { name, value, type, checked } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChangeBlog = (e) => {
    setBlogData((prev) => ({
      ...prev,
      MainPicture: e.target.files[0], // Store the File object
    }));
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", BlogData.title);
      formDataToSend.append("content", BlogData.content);
      formDataToSend.append("category", BlogData.category);
      formDataToSend.append("breaking", BlogData.breaking.toString());
      if (BlogData.MainPicture instanceof File && BlogData.MainPicture.size > 0) {
        formDataToSend.append("MainPicture", BlogData.MainPicture);
      }

      const res = await axios.post("/api/blog/create", formDataToSend);
      console.log("Blog created:", res.data);
      onOpenChange(false); // Close the dialog
      if (onBlogCreated) {
        onBlogCreated(res.data.blog); // Pass the new blog data back to parent
      }
    } catch (err) {
      console.error("Error in handleCreateBlog:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-gray-800 p-6 rounded-lg shadow-xl max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4 text-amber-600">
            Create Blog
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Fill in the details for your new blog post.
        </DialogDescription>
        <form onSubmit={handleCreateBlog} className="space-y-6 mt-4">
          <div>
            <label
              htmlFor="blogTitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="blogTitle"
              type="text"
              value={BlogData.title}
              onChange={handleChangeBlog}
              name="title"
              placeholder="Blog Title"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              required
            />
          </div>
          <div>
            <label
              htmlFor="blogContent"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Content
            </label>
            <textarea
              id="blogContent"
              value={BlogData.content}
              onChange={handleChangeBlog}
              name="content"
              placeholder="Write your blog content here..."
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 resize-y min-h-[120px]"
              rows="6"
              required
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="blogCategory"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <input
              id="blogCategory"
              type="text"
              value={BlogData.category}
              onChange={handleChangeBlog}
              name="category"
              placeholder="Category (e.g., Tech, Travel)"
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              id="breakingNews"
              type="checkbox"
              checked={BlogData.breaking}
              onChange={handleChangeBlog}
              name="breaking"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="breakingNews"
              className="ml-2 block text-sm text-gray-900"
            >
              Mark as Breaking News
            </label>
          </div>
          <div>
            <label
              htmlFor="mainPicture"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Main Picture
            </label>
            <input
              id="mainPicture"
              type="file"
              onChange={handleFileChangeBlog}
              className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept="image/*"
            />
            {BlogData.MainPicture && (
              <p className="text-sm text-gray-500 mt-1">
                File selected: {BlogData.MainPicture.name}
              </p>
            )}
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <DialogFooter className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg transition-colors duration-200 shadow-md flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Publishing...
                </>
              ) : (
                "Publish Blog"
              )}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlogDialog;