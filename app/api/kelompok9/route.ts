import { NextResponse } from "next/server";

const BASE_URL = "https://projekkelompok9-production.up.railway.app/api";

export async function GET() {
  try {
    const res = await fetch(`${BASE_URL}/ml.php`, { cache: "no-store" });
    const text = await res.text();

    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch {
      return NextResponse.json({ success: false, message: "Response bukan JSON", raw: text });
    }
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const id = formData.get("id");

  try {
    const endpoint = id ? `${BASE_URL}/update_ML.php` : `${BASE_URL}/add_ML.php`;
    const res = await fetch(endpoint, { method: "POST", body: formData });
    const data = await res.text();
    return NextResponse.json({ success: true, message: data });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  try {
    const formData = new FormData();
    formData.append("id", id);
    const res = await fetch(`${BASE_URL}/delete_ML.php`, { method: "POST", body: formData });
    const text = await res.text();
    return NextResponse.json({ success: true, message: text });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
