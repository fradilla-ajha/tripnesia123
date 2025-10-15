"use client";
import React, { useState } from "react";
import { tambahProduk } from "../../utils/kelompok1/reservasiAPI";

export default function Kelompok1Page() {
  const [form, setForm] = useState({
    code: "",
    name: "",
    description: "",
    modalAwal: "",
    currentPrice: "",
    quantity: "",
    categoryId: "",
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as any;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Susun data sesuai Postman
    const formData = new FormData();
    formData.append("code", form.code);
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("modalAwal", form.modalAwal);
    formData.append("currentPrice", form.currentPrice);
    formData.append("quantity", form.quantity);
    formData.append("categoryId", form.categoryId); // pastikan ID valid
    formData.append(
      "sizes",
      JSON.stringify([
        { ageCategory: "ADULT", size: "S", quantity: 5 },
        { ageCategory: "ADULT", size: "M", quantity: 10 },
      ])
    );
    if (form.image) formData.append("image", form.image);

    try {
      const result = await tambahProduk(formData);
      alert("✅ Produk berhasil ditambahkan!");
      console.log(result);
    } catch (error) {
      console.error("❌ Error saat tambah produk:", error);
      alert("Gagal menambahkan produk. Cek konsol untuk detail error.");
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tambah Produk Kelompok 1</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="code"
          placeholder="Code (misal: B2J7)"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="name"
          placeholder="Nama Produk"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <textarea
          name="description"
          placeholder="Deskripsi Produk"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="modalAwal"
          placeholder="Modal Awal"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="currentPrice"
          placeholder="Harga Sekarang"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="quantity"
          placeholder="Jumlah Stok"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          name="categoryId"
          placeholder="Masukkan Category ID (contoh: 7f010a16-e81b-4894-adb8-28860f99d344)"
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          + Tambah Produk
        </button>
      </form>
    </div>
  );
}
