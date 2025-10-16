"use client";
import React, { useEffect, useState } from "react";

interface Product {
  id: string;
  code: string;
  name: string;
  description: string | null;
  currentPrice: number;
  modalAwal: number;
  imageUrl: string;
  category: {
    name: string;
    color: string;
  };
}

export default function Kelompok1Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    code: "",
    name: "",
    description: "",
    modalAwal: "",
    currentPrice: "",
    quantity: "",
    categoryId: "",
    sizes: '[{"ageCategory":"ADULT","size":"S","quantity":5}]',
    image: null as File | null,
  });

  const [editId, setEditId] = useState<string | null>(null);

  // === FETCH PRODUCTS ===
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/kelompok1", { cache: "no-store" });
      if (!res.ok) throw new Error("Gagal mengambil data produk.");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // === HANDLE INPUT CHANGE ===
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // === HANDLE FILE CHANGE ===
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, image: file }));
  };

  // === HANDLE SUBMIT ===
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value as any);
    });

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId
        ? `https://sprightly-starburst-ae6a2a.netlify.app/api/public/products/${editId}`
        : "https://sprightly-starburst-ae6a2a.netlify.app/api/public/products";

      const res = await fetch(url, { method, body: formData });
      const result = await res.json();

      alert(result.message || "Berhasil disimpan");
      setForm({
        code: "",
        name: "",
        description: "",
        modalAwal: "",
        currentPrice: "",
        quantity: "",
        categoryId: "",
        sizes: '[{"ageCategory":"ADULT","size":"S","quantity":5}]',
        image: null,
      });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      console.error("Error saving:", err);
      alert("Gagal menyimpan data.");
    }
  };

  // === HANDLE DELETE ===
  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;

    try {
      const res = await fetch(
        `https://sprightly-starburst-ae6a2a.netlify.app/api/public/products/${id}`,
        { method: "DELETE" }
      );
      const result = await res.json();
      alert(result.message || "Produk dihapus");
      fetchProducts();
    } catch (err) {
      console.error("Error deleting:", err);
      alert("Gagal menghapus produk.");
    }
  };

  // === HANDLE EDIT ===
  const handleEdit = (p: Product) => {
    setForm({
      code: p.code,
      name: p.name,
      description: p.description || "",
      modalAwal: p.modalAwal.toString(),
      currentPrice: p.currentPrice.toString(),
      quantity: "5",
      categoryId: "",
      sizes: '[{"ageCategory":"ADULT","size":"S","quantity":5}]',
      image: null,
    });
    setEditId(p.id);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
        🛍️ CRUD Produk Kelompok 1
      </h1>

      {/* === FORM === */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-10"
      >
        <div className="grid grid-cols-2 gap-4">
          <input name="code" placeholder="Kode Produk" value={form.code} onChange={handleChange} className="border p-2 rounded" required />
          <input name="name" placeholder="Nama Produk" value={form.name} onChange={handleChange} className="border p-2 rounded" required />
          <input name="modalAwal" placeholder="Modal Awal" value={form.modalAwal} onChange={handleChange} className="border p-2 rounded" required />
          <input name="currentPrice" placeholder="Harga Sekarang" value={form.currentPrice} onChange={handleChange} className="border p-2 rounded" required />
          <textarea name="description" placeholder="Deskripsi" value={form.description} onChange={handleChange} className="border p-2 rounded col-span-2" />
          <input type="file" name="image" accept="image/*" onChange={handleFileChange} className="col-span-2" />
        </div>

        <button
          type="submit"
          className={`w-full py-2 mt-4 rounded text-white ${editId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {editId ? "Update Produk" : "Tambah Produk"}
        </button>
      </form>

      {/* === PRODUCTS === */}
      {loading ? (
        <p className="text-center text-gray-500">Memuat data...</p>
      ) : error ? (
        <p className="text-center text-red-600">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="bg-white shadow-md rounded-xl p-4">
              <img
                src={
                  p.imageUrl.startsWith("http")
                    ? p.imageUrl
                    : `https://sprightly-starburst-ae6a2a.netlify.app/${p.imageUrl}`
                }
                alt={p.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="font-semibold text-lg mt-3">{p.name}</h2>
              <p className="text-gray-500 text-sm">{p.description}</p>
              <span
                className="inline-block mt-2 text-xs px-2 py-1 rounded-full text-white"
                style={{ backgroundColor: p.category.color }}
              >
                {p.category.name}
              </span>
              <p className="font-bold mt-2 text-green-600">
                Rp {p.currentPrice.toLocaleString("id-ID")}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(p)}
                  className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="flex-1 bg-red-600 text-white py-1 rounded hover:bg-red-700"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
