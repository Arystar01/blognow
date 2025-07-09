import React from "react";
import Image from "next/image";
import aboutImage from "../../public/about.png"; // <-- Replace with your actual image path

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left Image */}
        <div className="w-full md:w-1/2">
          <Image
            src={aboutImage}
            alt="About BlogNow"
            className="rounded-lg shadow-lg"
            width={700}
            height={500}
            objectFit="cover"
          />
        </div>

        {/* Right Text */}
        <div className="w-full md:w-1/2 text-gray-800">
          <h1 className="text-4xl font-bold mb-4 text-indigo-700">About BlogNow</h1>
          <p className="text-lg mb-4">
            <span className="font-semibold">BlogNow</span> is more than just a blogging platform. We're a growing
            community of writers, readers, and curious minds who believe in the power of stories and facts. From daily
            blogs that spark inspiration to top headlines that keep you informed — we deliver it all in one place.
          </p>
          <p className="text-md text-gray-600 mb-4">
            Whether you’re passionate about culture, science, technology, travel, or politics, BlogNow gives you a space
            to explore, express, and engage. We aim to empower voices, provoke thought, and build a more informed world.
          </p>
          <p className="text-md text-gray-600">
            Thank you for being part of our journey. Let’s write the future, one blog at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
