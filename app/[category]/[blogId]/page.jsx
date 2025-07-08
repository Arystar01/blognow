"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CommentDialog from "@/app/components/CommentDialog";

const Page = () => {
  const params = useParams();
  const blogId = params.blogId;
  const category = params.category;
  const [readIcon, setReadIcon] = useState(false);
  const [blogDetails, setBlogDetails] = useState(null);
  const [comments, setComments] = useState();

  useEffect(() => {
    try {
      const fetchBlog = async () => {
        const res = await fetch(`/api/blog/get/${blogId}`);
        const data = await res.json();
        if (data) {
          setBlogDetails(data.blog);
        }
      };
      fetchBlog();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleSpeakOut = () => {
    if (blogDetails?.content) {
      const fullContent =
        "Title . " +
        blogDetails.title +
        ". " +
        "Now Content - " +
        blogDetails.content;
      const word = new SpeechSynthesisUtterance(fullContent);
      word.lang = "en-US";
      word.volume = 1;
      word.rate = 1.2;
      word.pitch = 1;

      word.onend = () => {
        console.log("✅ Speech ended.");
        setReadIcon(false);
      };
      setReadIcon(true);
      speechSynthesis.speak(word);
    }
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
  };

  const handleCommentDialog = () => {
    console.log("Open comment dialog");
  };

  if (!blogDetails) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="w-full bg-gray-100 text-black">
      {/* Hero section with background image */}
      <div className="relative w-screen h-96 sm:h-[700px] flex justify-center items-center overflow-hidden">
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

      {/* Blog body and sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 sm:px-12 py-12 max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="col-span-1 lg:col-span-2 bg-white rounded-lg shadow-md p-6">
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
            <button className="text-blue-600 hover:underline">👍 Like</button>
            <button
              onClick={() => setComments(!comments)}
              className="text-blue-600 hover:underline"
            >
              💬 Comment
            </button>
            <button className="text-blue-600 hover:underline">🔗 Share</button>
          </div>

          {comments && <CommentDialog props={{ blogId }} />}
        </div>

        {/* Sidebar / Breaking News */}
        <div className="col-span-1 hidden lg:block">
          <div className="sticky top-24 bg-white p-4 rounded shadow-md">
            <div className="relative mb-4">
              <span className="absolute top-2 left-2 bg-orange-600 text-white text-xs px-2 py-1 font-bold rounded">
                BREAKING
              </span>
              <img
                src="https://via.placeholder.com/300x300"
                alt="Breaking"
                className="w-full h-auto rounded"
              />
            </div>
            <p className="text-sm text-gray-700">
              Stay tuned for the latest science updates, innovations, and tech insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
