import { NextResponse } from "next/server";

export async function POST() {
  try {
    const API_KEY = process.env.NEWS_API_KEY;

    const res = await fetch(
      `https://newsapi.org/v2/everything?q=world&language=en&pageSize=10&sortBy=publishedAt&apiKey=${API_KEY}`
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message || "News API error" }, { status: res.status });
    }

    return NextResponse.json({ articles: data.articles }, { status: 200 });
  } catch (err) {
    console.error("Error fetching world news:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
