"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const Page = () => {
    const params = useParams();
    const blogId = params.blogId;
    const category = params.category;

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
        setBlogDetails(dummyData); // ✅ Safe to set here once
    }, []);

    if (!blogDetails) return <div className="text-center mt-10">Loading...</div>;

    return (
        // <div className="flex flex-col w-screen justify-center items-center  ">
        //   <div
        //     className="w-screen h-96 sm:h-[900px] bg-cover bg-center   flex flex-col justify-center items-center"
        //     style={{ backgroundImage: `url(${blogDetails.MainPicture})` }}
        //   >
        //     <div className="flex flex-col justify-center items-center gap-10">
        //       <h1 className="text-amber-300">{blogDetails.author.name}</h1>
        //       <div className="text-4xl text-white">{blogDetails.title}</div>
        //       <h1 className="text-black  text-6xl ">in {blogDetails.category} </h1>
        //     </div>
        //   </div>

        //   <h1 className="text-3xl font-bold text-center">{blogDetails.title}</h1>
        //   <p className="text-lg text-gray-700 max-w-3xl text-center">
        //     {blogDetails.content}
        //   </p>
        //   <div className="flex items-center gap-4 text-gray-500 text-sm pt-4">
        //     <img
        //       src={blogDetails.author.profilePicture}
        //       alt="Author"
        //       className="w-10 h-10 rounded-full"
        //     />
        //     <span>By {blogDetails.author.name}</span>
        //     <span>{blogDetails.date}</span>
        //   </div>
        // </div>
        <div className="w-full   ">
            <div className="relative w-screen h-96 sm:h-[900px] flex justify-center items-center overflow-hidden">
                {/* Background Image with reduced opacity */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: `url(${blogDetails.MainPicture})` }}
                ></div>

                {/* Foreground Text Content */}
                <div className="relative z-10 flex flex-col gap-2 justify-center items-center sm:gap-10">
                    <h1 className="">{blogDetails.author.name}</h1>
                    <div className="text-xl font-bold sm:6xl text-center px-4 sm:w-[calc(60%)]">{blogDetails.title}</div>
                    <h1 className=" text-lg  text-black sm:text-2xl text-center">in {blogDetails.category}</h1>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 px-8 py-8 w-screen mx-auto">
                {/* Main Content */}
                <div className="col-span-1 lg:col-span-2 flex  bg-red-300  ">
                    <p className="text-gray-700 text-lg leading-relaxed text-justify sm:text-4xl">
                        {/* Your long paragraph content goes here */}
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum eum modi deserunt, ex sapiente aut consequatur nam libero rem vel voluptates placeat eligendi alias fugiat harum dolor explicabo exercitationem, dicta ea ab nihil quidem illo tenetur porro! Aliquid, nostrum nisi assumenda reprehenderit omnis deserunt autem, delectus, quos quam temporibus est.
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
