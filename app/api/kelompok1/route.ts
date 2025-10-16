import { NextResponse } from "next/server";

// === GET ALL PRODUCTS ===
export async function GET() {
  try {
    const response = await fetch(
      "https://sprightly-starburst-ae6a2a.netlify.app/api/public/products",
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
