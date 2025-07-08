'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { FaWhatsapp, FaTelegram, FaInstagramSquare } from 'react-icons/fa';
import BlogCart from '../../components/BlogCart';
import axios from 'axios';

import EditProfileDialog from '../../components/EditProfileDialog';
import CreateBlogDialog from '../../components/CreateBlogDialog';
import EditBlogDialog from '../../components/EditBlogDialog';
import DeleteDialogBlog from '../../components/DeleteDialogBlog';

const Page = () => {
  const { user, isLoaded } = useUser();
  const userClerk = isLoaded && user ? user.id : null;
  const params = useParams();
  const clerkID = params.clerkID;

  const [userProfile, setuserProfile] = useState(null);
  const [authProfile, setAuthProfile] = useState(false);
  const [blogList, setBlogList] = useState([]);

  const [openProfile, setOpenProfile] = useState(false);
  const [openCreateBlog, setOpenCreateBlog] = useState(false);
  const [openEditBlog, setOpenEditBlog] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const [blogToEdit, setBlogToEdit] = useState(null);
  const [blogIdToDelete, setBlogIdToDelete] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get(`/api/user/profile/${clerkID}`);
      const data = res.data.user;
      if (data) setuserProfile(data);
      setAuthProfile(clerkID === userClerk);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }, [clerkID, userClerk]);

  const fetchBlogs = useCallback(async () => {
    try {
      const res = await axios.get(`/api/blog/byuser/${clerkID}`);
      setBlogList(res.data.blogs);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    }
  }, [clerkID]);

  useEffect(() => {
    if (clerkID && isLoaded) {
      fetchUser();
      fetchBlogs();
    }
  }, [clerkID, isLoaded, fetchUser, fetchBlogs]);

  const handleProfileUpdated = (updatedUser) => {
    setOpenProfile(false);
    setuserProfile(updatedUser);
  };

  const handleBlogCreated = () => {
    setOpenCreateBlog(false);
    fetchBlogs();
  };

  const handleOpenEditBlogDialog = (blog) => {
    setBlogToEdit(blog);
    setOpenEditBlog(true);
  };

  const handleBlogUpdated = (updatedBlog) => {
    setOpenEditBlog(false);
    setBlogList((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog._id === updatedBlog._id ? updatedBlog : blog
      )
    );
  };

  const confirmDeleteBlog = (blogId) => {
    setBlogIdToDelete(blogId);
    setOpenConfirmDelete(true);
  };

  const handleDeleteBlog = async () => {
    if (!blogIdToDelete) return;

    try {
      await axios.delete(`/api/blog/delete/${blogIdToDelete}`);
      setBlogList((prev) =>
        prev.filter((blog) => blog._id !== blogIdToDelete)
      );
      setOpenConfirmDelete(false);
      setBlogIdToDelete(null);
    } catch (error) {
      alert(`Failed to delete blog: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 via-blue-100 to-purple-100">
      {/* Navbar */}
      <div className="fixed top-24 left-0 right-0 z-50 flex justify-between items-center px-8 text-center text-2xl bg-black text-white w-full h-20 shadow-md">
        <div className="font-semibold text-xl md:text-2xl">BLOG PROFILE</div>
        <div className="flex items-center gap-4">
          <span className="mr-2 text-base hidden sm:inline text-gray-300">
            Share your love
          </span>
          <div className="flex gap-4 text-xl md:text-2xl">
            <FaWhatsapp className="cursor-pointer hover:text-green-500 transition-colors duration-200" />
            <FaTelegram className="cursor-pointer hover:text-blue-400 transition-colors duration-200" />
            <FaInstagramSquare className="cursor-pointer hover:text-pink-500 transition-colors duration-200" />
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="pt-20 w-full px-4 sm:px-8 mx-auto">
        <div className="flex justify-center">
          <div className="flex flex-col items-center max-w-4xl justify-center mt-12 sm:mt-16 bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <img
                src={
                  userProfile?.profilePicture ||
                  'https://placehold.co/150x150/cccccc/333333?text=Profile'
                }
                alt="profile pic"
                className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 rounded-full object-cover border-4 border-blue-500 shadow-md"
              />
            </div>
            <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 text-center">
              {userProfile?.firstname} {userProfile?.lastname}
            </div>
            <div className="italic text-base sm:text-lg text-gray-600 text-center max-w-lg">
              {userProfile?.bio || 'No bio available.'}
            </div>
          </div>
        </div>

        {/* Authenticated User Buttons */}
        {authProfile && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setOpenCreateBlog(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Create Blog
            </button>
            <button
              onClick={() => setOpenProfile(true)}
              className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              Edit Profile
            </button>
          </div>
        )}

        {/* Blogs Section */}
        <div className="text-center mt-12 mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 border-b-2 border-blue-500 pb-2 inline-block">
            My Blogs
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogList.length === 0 ? (
            <p className="col-span-full text-center text-gray-600 text-lg py-10">
              No blogs published yet.
            </p>
          ) : (
            blogList.map((blog) => (
              <div key={blog._id} className="relative group">
                <BlogCart
                  _id={blog._id}
                  title={blog.title}
                  content={blog.content}
                  author={
                    blog.authorUsername || userProfile?.firstname || 'Unknown'
                  }
                  category={blog.category}
                  date={blog.createdAt}
                  ProfilePicture={
                    blog.authorProfilePicture || userProfile?.profilePicture
                  }
                  breaking={blog.breaking}
                  MainPicture={blog.MainPicture}
                />
                {authProfile && (
                  <div className="absolute bottom-3 right-3 flex gap-2 z-10 text-2xl">
                    <button
                      className="bg-gradient-to-r from-blue-200 to-purple-300 text-gray-800 hover:opacity-90 text-xs md:text-xl font-semibold py-1 px-3 rounded-full shadow-sm transition-all"
                      onClick={() => handleOpenEditBlogDialog(blog)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="bg-gradient-to-r   from-blue-200 to-purple-300 text-gray-800 hover:opacity-90 text:xs  md:text-xl  font-semibold py-1 px-3 rounded-full shadow-sm transition-all"
                      onClick={() => confirmDeleteBlog(blog._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Dialogs */}
      <EditProfileDialog
        open={openProfile}
        onOpenChange={setOpenProfile}
        initialData={userProfile}
        onProfileUpdated={handleProfileUpdated}
      />
      <CreateBlogDialog
        open={openCreateBlog}
        onOpenChange={setOpenCreateBlog}
        onBlogCreated={handleBlogCreated}
      />
      <EditBlogDialog
        open={openEditBlog}
        onOpenChange={setOpenEditBlog}
        blogData={blogToEdit}
        onBlogUpdated={handleBlogUpdated}
      />
      <DeleteDialogBlog
        open={openConfirmDelete}
        onOpenChange={setOpenConfirmDelete}
        onConfirm={handleDeleteBlog}
        title="Confirm Blog Deletion"
        description="Are you sure you want to delete this blog post? This action cannot be undone."
      />
    </div>
  );
};

export default Page;
