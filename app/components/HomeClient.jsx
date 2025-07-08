'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import  BlogCart  from './BlogCart';

export default function HomeClient({ user }) {
  const [blogList, setBlogList] = useState([]);
  const [breakingBlogs, setBreakingBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blog/getAll");

        if (res.status === 200 && res.data.blogs) {
          setBlogList(res.data.blogs);

          // Filter breaking blogs
          const breaking = res.data.blogs.filter(blog => blog.breaking === true);
          setBreakingBlogs(breaking);
        } else {
          console.error("Error fetching blogs:", res.data.message);
        }
      } catch (err) {
        console.error("Error fetching blogs with Axios:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="bg-gray-400">
      <h1>Welcome, {user?.username || 'Guest'}!</h1>
      <div className="text-sm text-gray-500 mb-2">
        ID: {user?._id} <br />
        ClerkID: {user?.clerkID}
      </div>

      <div className="pt-24 px-8  flex  justify-center items-center gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Daily Blogs */}
          <div className="col-span-1 flex flex-wrap lg:col-span-2  justify-between gap-4">
            {blogList.map((blog) => (
              <div key={blog._id} className="w-full lg:w-[48%]">
                <BlogCart
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
  );
}
