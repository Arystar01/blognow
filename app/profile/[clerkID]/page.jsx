"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaWhatsapp, FaTelegram, FaInstagramSquare } from "react-icons/fa";
import BlogCart from "../../components/BlogCart";
import axios from "axios";

const Page = () => {
  const { user, isLoaded } = useUser();
  const userClerk = isLoaded && user ? user.id : null; // it will contain the login user id
  const params = useParams();
  const clerkID = params.clerkID;
  const [userProfile, setuserProfile] = useState(null);
  const [authProfile, setAuthProfile] = useState(false);
  const [blogList, setBlogList] = useState([]);
  const [openProfile, setopenProfile] = useState(false);
  const [openCreateBlog, setOpenCreateBlog] = useState(false);
  const [BlogData, setBlogData] = useState({
    title: "",
    content: "",
    category: "",
    breaking: false,
    MainPicture: "",
    // authorClerkId: userClerk,
    // authorUsername: userProfile?.firstname,
    // authorProfilePicture: userProfile?.profilePicture,
    // authorFirstName: userProfile?.firstname,
    // authorLastName: userProfile?.lastname,
  });
  const [formData, setFormData] = useState({
    bio: "",
    gender: "",
    profilePicture: null,
  });
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/user/profile/${clerkID}`);
      const data = res.data.user;
      if (data) {
        setuserProfile(data);
      }
      if (clerkID === userClerk) setAuthProfile(true);
      console.log(data);
    };
    if (clerkID) fetchUser();
  }, [clerkID, user]);
  useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`/api/blog/byuser/${clerkID}`);
      setBlogList(res.data.blogs);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    }
  };

  if (clerkID) fetchBlogs();
}, [clerkID]); // ✅ Only runs when clerkID changes

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
      profilePicture: e.target.files[0],
    }));
  };
   const handleChangeBlog = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileChangeBlog = (e) => {
    setBlogData((prev) => ({
      ...prev,
      MainPicture: e.target.files[0],
    }));
  };
  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", BlogData.title);
      formData.append("content", BlogData.content);
      formData.append("category", BlogData.category);
      formData.append("breaking", BlogData.breaking);
      formData.append("MainPicture", "hisano");
      // formData.append("authorClerkId", BlogData.authorClerkId);
      // formData.append("authorUsername", BlogData.authorUsername);
      // formData.append("authorProfilePicture", BlogData.authorProfilePicture);
      // formData.append("authorFirstName", BlogData.authorFirstName);
      // formData.append("authorLastName", BlogData.authorLastName);
      const res = await axios.post("/api/blog/create", formData);
      console.log(res);
      setOpenCreateBlog(false);
      window.location.reload();
      
    } catch (error) {
      console.log("error in handleCreateBlog", error);

    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
  };
 
  return (
    <div className="  w-full">
      {/* Navbar */}
      <div className="top-28 fixed  flex justify-between items-center px-8 text-center text-2xl bg-black text-white w-full h-28 md:h-20 ">
        <div className="font-semibold">BLOG PROFILE</div>
        <div className="flex items-center gap-4">
          <span className="mr-2 text-lg hidden sm:inline">Share your love</span>
          <div className="flex gap-4 text-2xl">
            <FaWhatsapp className="cursor-pointer hover:text-green-500 transition" />
            <FaTelegram className="cursor-pointer hover:text-blue-400 transition" />
            <FaInstagramSquare className="cursor-pointer hover:text-pink-500 transition" />
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-32">
        <div className="flex justify-center items-center mt-32">
          <div className="flex flex-col items-center gap-4">
            <div>
              <img
                src={userProfile?.profilePicture}
                alt="profile pic"
                className=" h-20 w-20 sm:h-40 sm:w-40 rounded-full object-cover"
              />
            </div>
            <div className="text-2xl  sm:text-4xl font-bold">
              {userProfile?.firstname} {userProfile?.lastname}
            </div>
            <div className="italic text-center max-w-md sm:text-2xl">
              {userProfile?.bio}
            </div>
          </div>
        </div>

        {/* Authenticated User Buttons */}
        {authProfile && (
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={() => setOpenCreateBlog(true)}>Create Blog</button>
            <button onClick={() => setopenProfile(true)}>Edit Profile</button>
            <Dialog open={openProfile} onOpenChange={setopenProfile}>
              <DialogContent className="bg-white text-amber-600">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    <form
                      onSubmit={handleEditProfile}
                      className="space-y-4 mt-4"
                    >
                      {/* Profile Picture */}
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full"
                      />

                      {/* Bio */}
                      <input
                        type="text"
                        name="bio"
                        placeholder="Bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                      />

                      {/* Gender */}
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                      >
                        <option value="" disabled>
                          Select Gender
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>

                      <DialogFooter>
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                          Save Changes
                        </button>
                      </DialogFooter>
                    </form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Dialog open={openCreateBlog} onChange={setOpenCreateBlog}>
              <DialogContent className="bg-white text-amber-600">
                <DialogHeader>
                  <DialogTitle>Create Blog</DialogTitle>
                  <DialogDescription>
                    <form
                      onSubmit={handleCreateBlog}
                      className="space-y-4 mt-4"
                    >
                      <input
                        type="text"
                        value={BlogData.title}
                        onChange={handleChangeBlog}
                        name="title"
                        placeholder="Title"
                        className="w-full border px-3 py-2 rounded"
                      />
                      <input
                        type="text"
                        value={BlogData.content}
                        onChange={handleChangeBlog}
                        name="content"
                        placeholder="Content"
                        className="w-full border px-3 py-2 rounded"
                      />
                      <input
                        type="text"
                        value={BlogData.category}
                        onChange={handleChangeBlog}
                        name="category"
                        placeholder="Category"
                        className="w-full border px-3 py-2 rounded"
                      />

                      <input
                        type="file"
                        onChange={handleFileChangeBlog}
                        className="w-full"
                      />
                      <DialogFooter>
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                          Save Blog
                        </button>
                      </DialogFooter>
                    </form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* Blogs */}
        <div
         className="flex  text-xl  mt-8 sm:4xl  justify-center">Blogs</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          
          {blogList.map((blog) => (
            <BlogCart
              key={blog._id}
              _id={blog._id}
              title={blog.title}
              content={blog.content}
              author={blog.authorUsername}
              category={blog.category}
              date={blog.createdAt}
              ProfilePictue={blog.authorProfilePicture}
              breaking={blog.breaking}
              MainPicture={blog.MainPicture}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
