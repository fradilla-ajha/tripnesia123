"use client";
import Link from "next/link";

export default function ExplorePage() {
  const kelompokList = [
    { id: 1, nama: "Kelompok 1", deskripsi: "Demo CRUD Produk — Explore fitur interaktif", path: "/explore/kelompok1" },
    { id: 3, nama: "Kelompok 3", deskripsi: "Gadget House — Sistem manajemen produk", path: "/explore/kelompok3" },
    { id: 4, nama: "Kelompok 4", deskripsi: "Pemesanan makanan & minuman", path: "/explore/kelompok4" },
    { id: 5, nama: "Kelompok 5", deskripsi: "Aplikasi Booking — Modul reservasi", path: "/explore/kelompok5" },
    { id: 6, nama: "Kelompok 6", deskripsi: "Reservasi Tempat", path: "/explore/kelompok6" },
    { id: 7, nama: "Kelompok 7", deskripsi: "Sobat Promo", path: "/explore/kelompok7" },
    { id: 9, nama: "Kelompok 9", deskripsi: "Sistem Evaluasi Produk", path: "/explore/kelompok9" },
    { id: 10, nama: "Kelompok 10", deskripsi: "Cafeku — Menu & Produk", path: "/explore/kelompok10" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-24">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
        Explore Kelompok
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kelompokList.map((kelompok) => (
          <div
            key={kelompok.id}
            className="bg-white shadow-lg p-6 rounded-lg text-center border border-gray-200"
          >
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">
              {kelompok.nama}
            </h2>
            <p className="text-gray-600 mb-6">{kelompok.deskripsi}</p>

            <Link href={kelompok.path}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all">
                Kunjungi
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
