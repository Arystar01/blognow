"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaWhatsapp, FaInstagramSquare, FaTelegram } from "react-icons/fa";

import BlogCart from "../components/BlogCart";

const Page = () => {
  const params = useParams();
  const category = params.category?.toUpperCase();

  const [dailyBlogs, setDailyBlogs] = useState([
    {
      _id: "1",
      title: "Breaking News: Major Breakthrough in AI Research",
      content:
        "Scientists have announced a significant breakthrough in artificial intelligence, potentially leading to advanced self-learning systems. This development could revolutionize various industries.",
      category: "Breaking News",
      breaking: true,
      views: 100,
      likes: 50,
      comments: 20,
       MainPicture: "https://via.placeholder.com/50",
      date: "2021-01-01",
      author: {
        name: "John Doe",
        profilePicture: "https://via.placeholder.com/50",
      },
    },
    {
      _id: "2",
      title: "Local Elections: New Candidates Emerge",
      content:
        "The upcoming local elections are heating up with several new candidates throwing their hats into the ring. Voters are encouraged to research their platforms thoroughly.",
      category: "Local News",
      breaking: false,
      views: 100,
      likes: 50,
      comments: 20,
      date: "2021-01-01",
       MainPicture: "https://via.placeholder.com/50",
      author: {
        name: "Jane Smith",
        profilePicture: "https://via.placeholder.com/50",
      },
    },
    {
      _id: "3",
      title: "Global Economy Shows Signs of Recovery",
      content:
        "Analysts report positive indicators for the global economy, suggesting a potential recovery from recent downturns. Export numbers are up, and consumer confidence is growing.",
      category: "Business",
      breaking: false,
      views: 100,
      likes: 50,
      comments: 20,
       MainPicture: "https://via.placeholder.com/50",
      date: "2021-01-01",
      author: {
        name: "Alice Johnson",
        profilePicture: "https://via.placeholder.com/50",
      },
    },
    {
      _id: "4",
      title: "New Study on Climate Change Impacts",
      content:
        "A recent study highlights the accelerating effects of climate change on coastal regions, urging immediate action to mitigate further damage and protect vulnerable communities.",
      category: "Environment",
      breaking: false,
      views: 100,
      likes: 50,
      comments: 20,
      MainPicture: "https://via.placeholder.com/50",
      date: "2021-01-01",
      author: {
        name: "Robert Brown",
        profilePicture: "https://via.placeholder.com/50",
      },
    },
  ]);

  const [breakingBlogs, setBreakingBlogs] = useState([]);

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       const response = await fetch(`/api/blogs/${category}`);
  //       const data = await response.json();
  //       setDailyBlogs(data.dailyBlogs);
  //       setBreakingBlogs(data.breakingBlogs);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchBlogs();
  // }, [category]);

  return (
    <div className="flex flex-cols  justify-center items-center gap-4">
    <div className=" min-h-screen  flex flex-col items-center bg-white">
      {/* Fixed Navbar */}
      <div className="fixed flex justify-between items-center px-8 text-center text-2xl bg-black text-white w-full h-28 md:h-20 z-50">
        {" "}
        {/* Left Side: Category */}
        <div className="font-semibold">{category}</div>
        {/* Right Side: Share Section */}
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
      <div className="pt-24 px-8  w-[calc(90%)] " >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left side of grid for Daily Blogs */}
          <div className="col-span-1 lg:col-span-2 flex flex-wrap justify-between gap-4">
            {dailyBlogs.map((blog) => (
             
           <div  className="w-[calc(100%)]  lg:w-[calc(48%)] ">

             <BlogCart
                key={blog._id}
                _id={blog._id}
                title={blog.title}
                content={blog.content}
                author={blog.author.name}
                category={blog.category}
               date={blog.date}
               ProfilePictue={blog.author.profilePicture}
                breaking={blog.breaking}
                MainPicture={blog.MainPicture}
              />
              </div>
            ))}
          </div>
          {/* Right side of the grid for breaking news */}
          <div className="col-span-1 w-[calc(90%)] bg-amber-50 hidden lg:block p-4 rounded shadow ml-10">
            <h3 className="text-lg font-bold mb-2">Breaking News</h3>
            <p>This section is hidden on medium and smaller screens.</p>
            {/* You can map breakingBlogs here */}
            {breakingBlogs.length === 0 && (
              <p className="text-gray-600">No breaking news currently.</p>
            )}
            {breakingBlogs.map((blog) => (
              <div key={blog._id} className="bg-white p-3 mb-3 rounded shadow">
                <h4 className="text-md font-semibold">{blog.title}</h4>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {blog.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Page;