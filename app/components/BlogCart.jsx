import React from 'react';
import Link from 'next/link';

const BlogCart = ({ title, content, author, category, ProfilePictue,date, breaking, MainPicture, _id }) => {
  
  return (
    <div className='w-full bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4'>
      {/* Top metadata */}
      <div className='flex justify-between text-sm sm:text-xs text-gray-500'>
        <span>{category} / 2 min read</span>
        {breaking && <span className='text-red-600 font-semibold'>Breaking</span>}
      </div>

      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold h-20 overflow-hidden">
        {title}
      </h2>
      {/* Main Image */}
      {/* {MainPicture && (
        <div className='w-full h-88 overflow-hidden rounded-md'>
          <img src='/DarkThem.png' alt="Blog Main" className='w-full h-full object-cover hover:scale-110 transition-transform duration-300' />
        </div>
      )} */}
      {MainPicture && (
        <Link href={`/${category}/${_id}`}>
        <div className="w-full h-64 sm:h-88 overflow-hidden rounded-md">
          <img
            src='/DarkThem.png'
            alt="Blog Main"
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>
        </Link>
      )}

      {/* Content Preview */}
           <p className="text-gray-700 text-xl  sm:text-4xl line-clamp-4 sm:line-clamp-4">
        {content}
      </p>


     
      <div className="flex gap-4 items-center text-xl sm:text-xl text-gray-500 pt-2 border-t">
        <span>Photo</span>
        <span className="font-extrabold">
          By <a href="/">{author}</a>
        </span>
        <span className="text-black font-bold">{date}</span>
      </div>
    </div>
  );
};

export default BlogCart;
