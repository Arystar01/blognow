"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CommentDialog from "@/app/components/CommentDialog";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";

import LoaderPage from "@/app/components/LoaderPage";

const Page = () => {
  const params = useParams();
  const blogId = params.blogId;
  const category = params.category;
  const [readIcon, setReadIcon] = useState(false);
  const [blogDetails, setBlogDetails] = useState(null);
  const [comments, setComments] = useState(false);
  const [topHeadlines, setTopHeadlines] = useState([]);
const [liked, setLiked] = useState(false);
const [likesCount, setLikesCount] = useState(blogDetails?.likes || 0); // Optional if you fetch likes from backend

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blog/get/${blogId}`);
        const data = res.data;
        if (data) {
          setBlogDetails(data.blog);
        }
      } catch (error) {
        console.log("Failed to fetch blog:", error);
      }
    };
    fetchBlog();
  }, [blogId]);

  useEffect(() => {
    if (!blogDetails?.title) return;

    const fetchTopHeadlines = async () => {
      try {
        const res = await axios.get(
          `https://newsapi.org/v2/top-headlines?q=${blogDetails.title}&apiKey=${API_KEY}` // Use your environment variable for the API key
        );
        if (res.status === 200) {
          setTopHeadlines(res.data.articles.slice(0, 5));
        }
      } catch (error) {
        console.log("Failed to fetch top headlines:", error);
      }
    };
    fetchTopHeadlines();
  }, [blogDetails?.title]);

  const handleSpeakOut = () => {
    if (blogDetails?.content) {
      const fullContent =
        "Title. " +
        blogDetails.title +
        ". Now Content - " +
        blogDetails.content;
      const word = new SpeechSynthesisUtterance(fullContent);
      word.lang = "en-US";
      word.volume = 1;
      word.rate = 1.2;
      word.pitch = 1;

      word.onend = () => {
        // console.log("✅ Speech ended.");
        setReadIcon(false);
      };
      setReadIcon(true);
      speechSynthesis.speak(word);
    }
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setReadIcon(false);
  };

  if (!blogDetails) return <LoaderPage/>;

  return (
    <div className="w-full pb-4  bg-gradient-to-r from-blue-200 to-purple-200 text-black">
      {/* Hero section */}
      <div className="relative w-full h-96 sm:h-[700px] flex justify-center items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{ backgroundImage: `url(${blogDetails.MainPicture})` }}
        ></div>
        <div className="relative z-10 text-white text-center px-4 sm:px-0">
          <h1 className="text-xl sm:text-2xl font-semibold">{blogDetails.authorname}</h1>
          <h2 className="text-3xl sm:text-5xl font-bold mt-4">{blogDetails.title}</h2>
          <p className="mt-4 text-lg sm:text-2xl font-medium italic">
            in {blogDetails.category}
          </p>
        </div>
      </div>

      {/* Content & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 px-6 sm:px-12 py-12  mx-auto">
        {/* Main Blog Content */}
        <div className="col-span-1 lg:col-span-3 bg-white rounded-lg shadow-md p-6">
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleSpeakOut}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              🔊 Read it out
            </button>
            {readIcon && (
              <button
                onClick={stopSpeaking}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                🛑 Stop
              </button>
            )}
          </div>

          <div className="text-gray-800 text-lg leading-relaxed text-justify space-y-4">
            {blogDetails.content}
          </div>

          <div className="flex justify-between items-center mt-8 pt-4 border-t">
            <button
              onClick={() => {
                setLiked(!liked);
                setLikesCount((prev) => liked ? prev - 1 : prev + 1);
                // Optional: send to backend here
              }}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 transition    "
            >
              {liked ? (
                <AiFillHeart className="text-xl" />
              ) : (
                <AiOutlineHeart className="text-xl" />
              )}
              <span className="text-sm">{likesCount}</span>
            </button>
            <button
              onClick={() => setComments(!comments)}
              className="text-blue-600 hover:text-xl "
            >
              💬 Comment
            </button>
            <button className="text-blue-600  hover:text-xl">🔗 Share</button>
          </div>

          {comments && <CommentDialog props={{ blogId }} />}
        </div>

        {/* Sidebar Headlines */}
        <div className="col-span-1">
          <div className="sticky top-24 bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold mb-4 text-indigo-700">Latest Headlines</h3>
            {topHeadlines.length === 0 ? (
              <p className="text-gray-500">No headlines found.</p>
            ) : (
              topHeadlines.map((article, index) => (
                <div key={index} className="mb-4">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-indigo-600"
                  >
                    <h4 className="text-md font-semibold line-clamp-2">{article.title}</h4>
                  </a>
                  <p className="text-gray-600 text-sm line-clamp-2">{article.description}</p>
                </div>
              ))
            )}
            <p className="text-sm text-gray-600 mt-6 italic">
              Stay informed with real-time news powered by NewsAPI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
