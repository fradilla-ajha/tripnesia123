import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://dodgerblue-monkey-417412.hostingersite.com/api/menu", {
      cache: "no-store",
    });

    const html = await res.text();

    // Cari semua item menu di dalam HTML
    const regex = /<h5 class="card-title">([^<]+)<\/h5>[\s\S]*?<p class="price">Rp ([\d\.]+)<\/p>[\s\S]*?<img src="([^"]+)"[^>]*alt/g;
    const items = [];
    let match;

    while ((match = regex.exec(html)) !== null) {
      items.push({
        title: match[1].trim(),
        price: parseInt(match[2].replace(/\./g, ""), 10),
        image: match[3].startsWith("http")
          ? match[3]
          : `https://dodgerblue-monkey-417412.hostingersite.com/${match[3]}`,
      });
    }

    if (items.length === 0) {
      return NextResponse.json({
        success: false,
        message: "Tidak ditemukan data menu dari HTML.",
        rawSnippet: html.slice(0, 500),
      });
    }

    return NextResponse.json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error("Gagal fetch data Cafeku:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data Cafeku" },
      { status: 500 }
    );
  }
}
