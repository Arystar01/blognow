"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import BlogCart from "./BlogCart";
import Footer from "./Footer";
import LoaderPage from "./LoaderPage";

export default function HomeClient({ user }) {
  const [blogList, setBlogList] = useState([]);
  const [breakingBlogs, setBreakingBlogs] = useState([]);
  const [topHeadline, setTopHeadline] = useState(null);
  const [popularNews, setPopularNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const fetchNewsAPI = async () => {
      try {
        const res = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&language=en&pageSize=10&apiKey=055e28d93abb4f059730b9b7c29a39fd`
        );
        const data = res.data.articles;
        if (data && data.length > 0) {
          setTopHeadline(data[0]);
          setPopularNews(data.slice(1));
        }
      } catch (err) {
        console.error("NewsAPI fetch error:", err);
      }
    };

    fetchNewsAPI();
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/blog/getAll");

        if (res.status === 200 && res.data.blogs) {
          setBlogList(res.data.blogs);
          const breaking = res.data.blogs.filter(blog => blog.breaking === true);
          setBreakingBlogs(breaking);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <LoaderPage />;

  return (
    <div className=" min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 ">
      {/* ========== World Breaking News Section ========== */}
      {topHeadline && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-8 min-h-[500px]">
          {/* Left: Top Headline */}
          <div
            className="relative lg:col-span-3 bg-white text-black p-6 rounded-lg shadow-md overflow-hidden h-[500px] flex flex-col justify-between"
            style={{
              backgroundImage: `url(${topHeadline.urlToImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-opacity-50 z-0 rounded-lg"></div>

            {/* Text Content */}
            <div className="relative  z-10 text-white flex flex-col justify-between h-full">
              <div className="bg-gary-200">
                <h2 className="text-3xl font-bold mb-2">{topHeadline.title}</h2>
                <p className="text-sm text-gray-200">
                  {topHeadline.author || "Unknown Author"} •{" "}
                  {new Date(topHeadline.publishedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-auto pt-6">
                <p className="text-gray-100 text-lg line-clamp-3 lg:text-lg   bg-gray-500 bg-opacity-30 p-4 rounded">
                  {topHeadline.description || "No description available."}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Popular World News */}
          <div className="bg-amber-100 p-4 rounded-lg shadow-md h-[500px] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 border-b-2 border-zinc-500 pb-2">
              🌍 Popular World News
            </h3>
            <div className="flex flex-col gap-4">
              {popularNews.slice(0, 5).map((article, idx) => (
                <a
                  key={idx}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-lg shadow p-3 text-sm hover:bg-blue-50 transition border border-zinc-200"
                >
                  <h4 className="font-semibold text-gray-800 line-clamp-2">
                    {article.title}
                  </h4>
                </a>
              ))}
            </div>
          </div>
        </div>

      )}

      {/* ========== Blog Section ========== */}
      <div className="p-8   grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left: Blog List */}
        <div className="lg:col-span-3  ">
          <h2 className="text-3xl font-bold mb-4">Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {blogList.slice(0, visibleCount).map((blog) => (
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
          {visibleCount < blogList.length && (
            <div className="text-center mt-6">
              <button
                onClick={() => setVisibleCount(prev => prev + 5)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
              >
                See More
              </button>
            </div>
          )}
        </div>

        {/* Right: Breaking News (Fixed) */}
        <div className="lg:col-span-1 mt-13 ">
          <div className="sticky top-28  bg-white  p-4 rounded-lg shadow-md ">
            <h3 className="text-lg font-bold mb-4 border-b-2 border-zinc-700 pb-2">Breaking News</h3>
            <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2 ">
              {breakingBlogs.slice(0, 10).map((blog) => (
                <div key={blog._id} className="bg-white p-3 rounded text-black  border-2 border-black shadow">
                  <h4 className="text-md font-semibold mb-1">{blog.title}</h4>
                  <p className="text-gray-700 text-sm line-clamp-2">{blog.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}