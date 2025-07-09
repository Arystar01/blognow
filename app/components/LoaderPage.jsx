import React from 'react';
import { FaSpinner } from 'react-icons/fa';

function LoaderPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {/* Spinner Icon */}
      <FaSpinner className="animate-spin text-5xl text-indigo-500 mb-6" />

      {/* Loading Text */}
      <h2 className="text-2xl font-semibold tracking-wider">
        Loading...
      </h2>
      <p className="text-gray-400 mt-2">Please wait while we fetch your content.</p>
    </div>
  );
}

export default LoaderPage;
