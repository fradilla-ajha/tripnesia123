import { NextResponse } from "next/server";

const BASE_URL = "https://tripnesia-vm51.vercel.app/api/bookings";

// 🔹 GET — Ambil semua data
export async function GET() {
  try {
    const res = await fetch(`${BASE_URL}?action=list`, { cache: "no-store" });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Gagal mengambil data:", err);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

// 🔹 POST — Tambah data
export async function POST(request: Request) {
  const body = await request.json();
  try {
    const res = await fetch(`${BASE_URL}?action=create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Gagal menambah data:", err);
    return NextResponse.json({ error: "Gagal menambah data" }, { status: 500 });
  }
}

// 🔹 PUT — Update data
export async function PUT(request: Request) {
  const body = await request.json();
  try {
    const res = await fetch(`${BASE_URL}?action=update&id=${body.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Gagal mengupdate data:", err);
    return NextResponse.json({ error: "Gagal mengupdate data" }, { status: 500 });
  }
}

// 🔹 DELETE — Hapus data
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id)
    return NextResponse.json({ error: "ID tidak ditemukan" }, { status: 400 });

  try {
    const res = await fetch(`${BASE_URL}?action=delete&id=${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Gagal menghapus data:", err);
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
  }
}
