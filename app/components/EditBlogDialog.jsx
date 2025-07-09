// components/EditBlogDialog.jsx
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription, // Keep DialogDescription for actual description text
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const EditBlogDialog = ({ open, onOpenChange, blogData, onBlogUpdated }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    breaking: false,
    mainPicture: null,
    existingMainPictureUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (blogData) {
      setFormData({
        title: blogData.title || '',
        content: blogData.content || '',
        category: blogData.category || '',
        breaking: blogData.breaking || false,
        mainPicture: null,
        existingMainPictureUrl: blogData.MainPicture || '',
      });
      setError(null);
    }
  }, [blogData, open]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      mainPicture: e.target.files[0],
    }));
  };

  const handleEditBlog = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!blogData || !blogData._id) {
      setError("Blog data is missing. Cannot update.");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("breaking", formData.breaking.toString());

      if (formData.mainPicture instanceof File && formData.mainPicture.size > 0) {
        formDataToSend.append("MainPicture", formData.mainPicture);
      }

      const res = await axios.put(
        `/api/blog/update/${blogData._id}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("Blog updated:", res.data);
      onOpenChange(false);
      if (onBlogUpdated) {
        onBlogUpdated(res.data.blog);
      }
    } catch (err) {
      console.error("Error updating blog:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to update blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-gray-800 p-6 rounded-lg shadow-xl max-w-lg mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4 text-amber-600">
            Edit Blog Post
          </DialogTitle>
          {/* Keep description for text only, if needed */}
          <DialogDescription className="text-muted-foreground text-sm">
             Update the details of your blog post below.
          </DialogDescription>
        </DialogHeader>

        {/* Move the form directly inside DialogContent, after DialogHeader */}
        <form onSubmit={handleEditBlog} className="space-y-6 mt-4">
          {/* Blog Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              required
            />
          </div>

          {/* Blog Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="Write your blog content here..."
              value={formData.content}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 resize-y min-h-[150px]"
              rows="8"
              required
            ></textarea>
          </div>

          {/* Blog Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <input
              id="category"
              type="text"
              name="category"
              placeholder="e.g., Technology, Travel, Food"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              required
            />
          </div>

          {/* Breaking News Checkbox */}
          <div className="flex items-center">
            <input
              id="breaking"
              type="checkbox"
              name="breaking"
              checked={formData.breaking}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="breaking"
              className="ml-2 block text-sm text-gray-900"
            >
              Mark as Breaking News
            </label>
          </div>

          {/* Main Picture */}
          <div>
            <label
              htmlFor="mainPicture"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Main Picture (Upload new or keep existing)
            </label>
            {formData.existingMainPictureUrl && !formData.mainPicture && (
              <div className="mb-2">
                <p className="text-sm text-gray-500">Current Image:</p>
                <img
                  src={formData.existingMainPictureUrl}
                  alt="Current Blog Main"
                  className="w-32 h-24 object-cover rounded-md mt-1 border border-gray-200"
                />
              </div>
            )}
            <input
              id="mainPicture"
              type="file"
              onChange={handleFileChange}
              className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept="image/*"
            />
            {formData.mainPicture && (
              <p className="text-sm text-gray-500 mt-1">
                New file selected: {formData.mainPicture.name}
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
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBlogDialog;  