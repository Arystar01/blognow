import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { source } = body;

    if (!source) {
      return NextResponse.json({ error: "Source is required" }, { status: 400 });
    }

    const API_KEY = process.env.NEWS_API_KEY;

    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?sources=${encodeURIComponent(source)}&apiKey=${API_KEY}`
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message || "News API error" }, { status: res.status });
    }

    return NextResponse.json({ articles: data.articles }, { status: 200 });

  } catch (err) {
    console.error("Error fetching source headlines:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
