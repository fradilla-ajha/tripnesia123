"use client";

import React, { useEffect, useState } from "react";

interface Product {
  id?: number;
  image?: string;
  title: string;
  description: string;
  price: string;
  stock: string;
}

export default function Kelompok10Page() {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<Product>({
    title: "",
    description: "",
    price: "",
    stock: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const API_BASE = "/api/kelompok10";

  // 🔹 Ambil data dari API
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API_BASE, { cache: "no-store" });
      const result = await res.json();

      if (result.success && Array.isArray(result.data)) {
        setData(result.data);
      } else if (Array.isArray(result?.data?.data)) {
        // Jika nested data
        setData(result.data.data);
      } else {
        console.error("Struktur data tidak sesuai:", result);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Handle perubahan input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Upload gambar
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  // 🔹 Tambah atau Update produk
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      if (imageFile) formData.append("image", imageFile);

      let method = "POST";
      if (editId) {
        formData.append("id", editId.toString());
        method = "PUT";
      }

      const res = await fetch(API_BASE, {
        method,
        body: formData,
      });

      const result = await res.json();
      alert(result.message || "Berhasil disimpan");
      setForm({ title: "", description: "", price: "", stock: "" });
      setImageFile(null);
      setEditId(null);
      fetchData();
    } catch (err) {
      console.error("Error saving data:", err);
    }
  };

  // 🔹 Hapus produk
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    try {
      const res = await fetch(API_BASE, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const result = await res.json();
      alert(result.message || "Produk dihapus");
      fetchData();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  // 🔹 Edit produk
  const handleEdit = (item: Product) => {
    setForm({
      title: item.title,
      description: item.description,
      price: item.price,
      stock: item.stock,
    });
    setEditId(item.id || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6 pt-24 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-amber-700">
        ☕ CRUD Kelompok 10 – Cafeku
      </h1>

      {/* Form Tambah/Edit Produk */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mb-10"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Nama Produk"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Harga"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stok"
            className="border p-2 rounded"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Deskripsi Produk"
            className="border p-2 rounded col-span-2"
          />
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="col-span-2"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 mt-4 rounded text-white ${
            editId
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {editId ? "Update Produk" : "Tambah Produk"}
        </button>
      </form>

      {/* Tabel Daftar Produk */}
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-amber-700">
          Daftar Menu Cafeku
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading data...</p>
        ) : data.length > 0 ? (
          <table className="w-full border border-gray-300 rounded text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border px-3 py-2">Gambar</th>
                <th className="border px-3 py-2">Nama</th>
                <th className="border px-3 py-2">Deskripsi</th>
                <th className="border px-3 py-2">Harga</th>
                <th className="border px-3 py-2">Stok</th>
                <th className="border px-3 py-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id ?? index} className="hover:bg-gray-50">
                  <td className="border px-3 py-2 text-center">
                    {item.image ? (
                      <img
                        src={`https://dodgerblue-monkey-417412.hostingersite.com/storage/products/${item.image}`}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">Tidak ada</span>
                    )}
                  </td>
                  <td className="border px-3 py-2 font-medium text-gray-800">
                    {item.title}
                  </td>
                  <td className="border px-3 py-2 text-gray-600">
                    {item.description || "-"}
                  </td>
                  <td className="border px-3 py-2 text-gray-700">
                    Rp {Number(item.price).toLocaleString("id-ID")}
                  </td>
                  <td className="border px-3 py-2 text-gray-700">
                    {item.stock}
                  </td>
                  <td className="border px-3 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id!)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">Belum ada data menu.</p>
        )}
      </div>
    </div>
  );
}
