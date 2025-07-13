import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { title } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const API_KEY = process.env.NEWS_API_KEY;

    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?q=${encodeURIComponent(title)}&apiKey=${API_KEY}`
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message || "News API error" }, { status: res.status });
    }

    return NextResponse.json({ articles: data.articles }, { status: 200 });

  } catch (err) {
    console.error("Error fetching news:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
