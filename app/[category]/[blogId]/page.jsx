"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const blogId = params.blogId;
  const category = params.category;
    const [readIcon, setReadIcon] = useState(false);
  const [blogDetails, setBlogDetails] = useState(null);

  const dummyData = {
    _id: "1",
    title: "Breaking News: Major Breakthrough in AI Research",
    content:
      "Scientists have announced a significant breakthrough in artificial intelligence, potentially leading to advanced self-learning systems. This development could revolutionize various industries.",
    category: "Breaking News",
    breaking: true,
    views: 100,
    likes: 50,
    comments: 20,
    MainPicture: "/DarkThem.png",
    date: "2021-01-01",
    author: {
      name: "John Doe",
      profilePicture: "https://via.placeholder.com/50",
    },
  };

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
        blogDetails.content; // or combine more if needed
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
    speechSynthesis.cancel(); // stops speech immediately
  };
  if (!blogDetails) return <div className="text-center mt-10">Loading...</div>;

  return (
    
    <div className="w-full   ">
      <div className="relative w-screen h-96 sm:h-[900px] flex justify-center items-center overflow-hidden">
        {/* Background Image with reduced opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${blogDetails.MainPicture})` }}
        ></div>

        {/* Foreground Text Content */}
        <div className="relative z-10 flex flex-col gap-2 justify-center items-center sm:gap-10">
          <h1 className="">{blogDetails.authorname}</h1>
          <div className="text-xl font-bold sm:6xl text-center px-4 sm:w-[calc(60%)]">
            {blogDetails.title}
          </div>
          <h1 className=" text-lg  text-black sm:text-2xl text-center">
            in {blogDetails.category}
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-8 py-8 w-screen mx-auto">
        {/* Main Content */}
        <div className="col-span-1 lg:col-span-2    bg-red-300  ">
          <div className="pl-8 pt-4">
            <button onClick={handleSpeakOut}  className="bg-gray-300 rounded-md p-4">🔊 Read it out</button>
            {readIcon &&  <button
              onClick={stopSpeaking}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              🛑 Stop
            </button> }
           
          </div>

          <p className="text-gray-700 text-lg leading-relaxed  p-4 pr-8 pl-8  text-justify sm:text-4xl">
            {/* Your long paragraph content goes here */}
            {blogDetails.content}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum eum
            modi deserunt, ex sapiente aut consequatur nam libero rem vel
            voluptates placeat eligendi alias fugiat harum dolor explicabo
            exercitationem, dicta ea ab nihil quidem illo tenetur porro!
            Aliquid, nostrum nisi assumenda reprehenderit omnis deserunt autem,
            delectus, quos quam temporibus est.
          </p>
        </div>

        {/* Breaking News Sticky Section */}
        <div className="col-span-1 w-[calc(90%)] bg-amber-50 hidden lg:block p-4 rounded shadow ml-10">
          <div className="sticky top-24">
            <div className="relative">
              <span className="absolute top-2 left-2 bg-orange-600 text-white text-xs px-2 py-1 font-bold rounded">
                BREAKING
              </span>
              <img
                src="https://via.placeholder.com/300x300"
                alt="Breaking"
                className="w-full h-auto rounded shadow"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
