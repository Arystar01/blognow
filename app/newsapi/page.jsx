'use client';
import React from 'react'
import axios from 'axios';

function page() {
    const handleClick = async () => {
        // console.log("Button clicked!");
        try {
            const res= await  axios.get( "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=055e28d93abb4f059730b9b7c29a39fd");
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
