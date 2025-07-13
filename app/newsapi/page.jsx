'use client';
import React from 'react'
import axios from 'axios';

function page() {
  const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const handleClick = async () => {
        // console.log("Button clicked!");
        try {
            const res = await axios.post('/api/newsapi/source', {
      source: "bbc-news",
    });
        // console.log("res" ,res);
        } catch (error) {
            console.error("Error fetching news:", error);
        }
    }

  return (
    <div>
      <button onClick={handleClick}>Show news</button>
    </div>
  )
}

export default page
