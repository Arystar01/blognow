'use client';
import React from 'react';
import Link from 'next/link';

const BlogCart = ({
  title,
  content,
  author,
  category,
  ProfilePictue,
  date,
  breaking,
  MainPicture,
  _id,
  authorClerkId,
}) => {
  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col gap-4 h-min">
      {/* Metadata row */}
      <div className="flex justify-between text-sm text-gray-500">
        <span className="capitalize">
          {category} • <span className="italic">2 min read</span>
        </span>
        {breaking && <span className="text-red-600 font-semibold">🔥 Breaking</span>}
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 line-clamp-1">{title}</h2>

      {/* Blog Image */}
      {MainPicture && (
        <Link href={`/${category}/${_id}`} className="block group">
          <div className="w-full h-60 sm:h-72 overflow-hidden rounded-lg">
            <img
              src={MainPicture || '/DarkThem.png'}
              alt="Blog Main"
              className="w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
        </Link>
      )}

      {/* Content Preview */}
      <p className="text-gray-700 text-base sm:text-lg line-clamp-1 leading-relaxed  ">
        {content}
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-3 border-t border-gray-200 pt-4 text-sm text-gray-600">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
          <img
            src={ProfilePictue || '/default-avatar.png'}
            alt={author}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <Link
            href={`/profile/${authorClerkId}`}
            className="font-semibold text-blue-700 hover:underline"
          >
            {author}
          </Link>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
      </div>

    </div>
  );
};

export default BlogCart;
