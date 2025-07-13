"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { FaWhatsapp, FaInstagramSquare, FaTelegram } from "react-icons/fa";
import BlogCart from "../components/BlogCart";
import { set } from "mongoose";
import { Loader } from "lucide-react";
import LoaderPage from "../components/LoaderPage";
import { SignedIn } from "@clerk/nextjs";
import { SignedOut, SignIn } from "@clerk/nextjs";

const Page = () => {
  const params = useParams();
  const category = params.category?.toLowerCase();

  const [dailyBlogs, setDailyBlogs] = useState([]);
  const [breakingBlogs, setBreakingBlogs] = useState([]);
  const [topHeadlines, setTopHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/blog/${category}`);
        const data = response.data;


        if (data) {
          setDailyBlogs(data.dailyBlogs);
          setBreakingBlogs(data.breakingBlogs);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchBlogs();
    }
  }, [category]);

  useEffect(() => {
    const fetchTopHeadlines = async (fallback = false) => {
      try {
        setLoading(true);
        const categoryToUse = fallback ? 'general' : category;
        const response = await axios.post('/api/newsapi/category', {
          category
        });

        const data = response.data;

        // If fallback already tried or got results, set data
        if (data.articles.length > 0 || fallback) {
          setTopHeadlines(data.articles);
        } else {
          // Try fallback if no articles found and not yet retried
          fetchTopHeadlines(true);
        }
      } catch (error) {
        console.error("Error fetching top headlines:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchTopHeadlines(false);
    }
  }, [category]);

  if (loading) { return (<LoaderPage />) }
  return (
    <>
      <SignedIn>

        <div className="flex flex-cols justify-center items-center gap-4  pb-4 bg-gradient-to-r from-blue-200 to-purple-200 ">
          <div className=" min-h-screen  flex flex-col items-center ">
            {/* Fixed Navbar */}
            <div className="fixed flex justify-between items-center px-8 text-center border-t-2 border-zinc-200 text-2xl bg-black text-white w-full h-28 md:h-20 ">
              {" "}
              {/* Left Side: Category */}
              <div className="font-semibold">{category.toUpperCase()}</div>
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
            <div className="pt-24 px-8 ">
              <div className="grid grid-cols-1 mt-10 lg:grid-cols-4  gap-2">
                {/* Left side of grid for Daily Blogs */}
                <div className="col-span-1 flex flex-wrap lg:col-span-3 justify-between gap-4">
                  {/* This is the key change: `grid grid-cols-1 md:grid-cols-3` */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                    {dailyBlogs.map((blog) => (
                      <BlogCart
                        key={blog._id} // Added key prop for list rendering
                        _id={blog._id}
                        title={blog.title}
                        content={blog.content}
                        author={blog.authorUsername || blog.author?.name || "Unknown"}
                        category={blog.category}
                        date={blog.createdAt || blog.date}
                        ProfilePictue={blog.authorProfilePicture}
                        breaking={blog.breaking}
                        MainPicture={blog.MainPicture}
                      />
                    ))}
                  </div>
                </div>
                <div className="col-span-1 w-[80%] bg-amber-100 hidden lg:block p-4 rounded-lg shadow ml-4">
                  <h3 className="text-lg font-bold mb-2">Latest Blogs</h3>
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

                  <h3 className="text-lg font-bold mb-4 border-b pb-2">Top Headlines</h3>

                  <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2">
                    {topHeadlines.slice(0, 10).map((article, index) => (
                      <a
                        key={article.url || index}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white hover:bg-gray-100 transition p-4 rounded-lg shadow-md border border-gray-200"
                      >
                        <h4 className="text-md font-semibold mb-1 text-blue-800 hover:underline">
                          {article.title}
                        </h4>
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {article.description || "No description available."}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex items-center justify-center min-h-screen bg-white">
          <SignIn routing="hash" />

        </div>
      </SignedOut>

    </>
  );
};

export default Page;