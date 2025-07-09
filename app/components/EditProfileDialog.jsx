// components/EditProfileDialog.jsx
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

const EditProfileDialog = ({ open, onOpenChange, initialData, onProfileUpdated }) => {
  const [formData, setFormData] = useState({
    bio: "",
    gender: "",
    profilePicture: null, // Holds the File object
    existingProfilePictureUrl: "", // To display current picture
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Effect to populate form when initialData changes (e.g., when dialog opens)
  useEffect(() => {
    if (initialData) {
      setFormData({
        bio: initialData.bio || "",
        gender: initialData.gender || "",
        profilePicture: null, // Always reset file input
        existingProfilePictureUrl: initialData.profilePicture || "",
      });
      setError(null); // Clear previous errors
    }
  }, [initialData, open]); // Re-run when initialData or open state changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      profilePicture: e.target.files[0], // Store the File object
    }));
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Ensure we have a clerkID to send the update request to
    if (!initialData?.clerkID) {
      setError("User ID is missing. Cannot update profile.");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("gender", formData.gender);
      if (formData.profilePicture instanceof File && formData.profilePicture.size > 0) {
        formDataToSend.append("profilePicture", formData.profilePicture);
      }

      const res = await axios.put(
        `/api/user/profile/${initialData.clerkID}`, // Use initialData.clerkID for the API route
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("Profile updated:", res.data);
      onOpenChange(false); // Close the dialog
      if (onProfileUpdated) {
        onProfileUpdated(res.data.user); // Pass the updated user data back to parent
      }
    } catch (err) {
      console.error("Error updating profile:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-gray-800 p-6 rounded-lg shadow-xl max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4 text-amber-600">
            Edit Profile
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Update your profile details below.
        </DialogDescription>
        <form onSubmit={handleEditProfile} className="space-y-6 mt-4">
          {/* Profile Picture */}
          <div>
            <label
              htmlFor="profilePicture"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Profile Picture
            </label>
            {formData.existingProfilePictureUrl && !formData.profilePicture && (
              <div className="mb-2">
                <p className="text-sm text-gray-500">Current Image:</p>
                <img
                  src={formData.existingProfilePictureUrl}
                  alt="Current Profile"
                  className="w-24 h-24 object-cover rounded-full mt-1 border border-gray-200"
                />
              </div>
            )}
            <input
              id="profilePicture"
              type="file"
              onChange={handleFileChange}
              className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept="image/*"
            />
            {formData.profilePicture && (
              <p className="text-sm text-gray-500 mt-1">
                New file selected: {formData.profilePicture.name}
              </p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 resize-y min-h-[80px]"
              rows="3"
            ></textarea>
          </div>

          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
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

export default EditProfileDialog;