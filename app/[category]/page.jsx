"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { FaWhatsapp, FaInstagramSquare, FaTelegram } from "react-icons/fa";
import BlogCart from "../components/BlogCart";

const Page = () => {
  const params = useParams();
  const category = params.category?.toUpperCase();

  const [dailyBlogs, setDailyBlogs] = useState([]);
  const [breakingBlogs, setBreakingBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`/api/blog/${category}`);
        const data = response.data;

        if (data) {
          setDailyBlogs(data.dailyBlogs);
          setBreakingBlogs(data.breakingBlogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    if (category) {
      fetchBlogs();
    }
  }, [category]);

  return (
    <div className="flex flex-cols  justify-center items-center gap-4">
    <div className=" min-h-screen  flex flex-col items-center bg-white">
        {/* Fixed Navbar */}
      <div className="fixed flex justify-between items-center px-8 text-center text-2xl bg-black text-white w-full h-28 md:h-20 ">
        {" "}
        {/* Left Side: Category */}
          <div className="font-semibold">{category}</div>
          <div className="flex items-center gap-4">
            <span className="mr-2 text-lg hidden sm:inline">Share your love</span>
            <div className="flex gap-4 text-2xl">
              <FaWhatsapp className="cursor-pointer hover:text-green-500 transition" />
              <FaTelegram className="cursor-pointer hover:text-blue-400 transition" />
              <FaInstagramSquare className="cursor-pointer hover:text-pink-500 transition" />
            </div>
          </div>
        </div>

        {/* Main Content */}
      <div className="pt-24 px-8 w-full    " >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left side of grid for Daily Blogs */}
          <div className="col-span-1 lg:col-span-2 flex flex-wrap justify-between gap-4">
            {dailyBlogs.map((blog) => (
             
           <div  className="w-[calc(100%)]  lg:w-[calc(48%)] ">

                  <BlogCart
                    _id={blog._id}
                    title={blog.title}
                    content={blog.content}
                    author={blog.author?.username || blog.author?.name || "Unknown"}
                    category={blog.category}
                    date={blog.createdAt || blog.date}
                    ProfilePictue={blog.author?.profilePicture}
                    breaking={blog.breaking}
                    MainPicture={blog.MainPicture}
                  />
                </div>
              ))}
            </div>

            {/* Breaking News */}
            <div className="col-span-1 w-[90%] bg-amber-50 hidden lg:block p-4 rounded shadow ml-10">
              <h3 className="text-lg font-bold mb-2">Breaking News</h3>
              {breakingBlogs.length === 0 ? (
                <p className="text-gray-600">No breaking news currently.</p>
              ) : (
                breakingBlogs.map((blog) => (
                  <div key={blog._id} className="bg-white p-3 mb-3 rounded shadow">
                    <h4 className="text-md font-semibold">{blog.title}</h4>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {blog.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
