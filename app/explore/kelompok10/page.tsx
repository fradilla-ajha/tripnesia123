"use client";
import React, { useEffect, useState } from "react";

interface MenuItem {
  id?: number;
  image: string;
  title: string;
  description?: string;
  price: number;
  stock?: number;
}

export default function Kelompok10Page() {
  const [data, setData] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<MenuItem>({
    title: "",
    description: "",
    image: "",
    price: 0,
    stock: 0,
  });
  const [editId, setEditId] = useState<number | null>(null);

  // Base URL API
  const API_BASE = "https://dodgerblue-monkey-417412.hostingersite.com/api/menu";

  // Fetch data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API_BASE);
      const result = await res.json();

      // Gunakan key "success" bukan "status"
      if (result.success) {
        setData(result.data);
      } else {
        console.error("Gagal memuat data:", result);
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

  // Handle input form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Create or update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId ? `${API_BASE}/${editId}` : API_BASE;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      alert(result.message || "Berhasil disimpan");
      setForm({
        title: "",
        description: "",
        image: "",
        price: 0,
        stock: 0,
      });
      setEditId(null);
      fetchData();
    } catch (err) {
      console.error("Error saving data:", err);
    }
  };

  // Delete data
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      alert(result.message || "Data dihapus");
      fetchData();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  // Edit data
  const handleEdit = (item: MenuItem) => {
    setForm({
      title: item.title,
      description: item.description || "",
      image: item.image,
      price: item.price,
      stock: item.stock || 0,
    });
    setEditId(item.id || null);
  };

  return (
    <div className="p-6 pt-24 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        CRUD Kelompok 10 - Cafeku
      </h1>

      {/* Form tambah/edit */}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mb-10"
      >
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Nama Menu"
          className="border p-2 w-full mb-3 rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Deskripsi"
          className="border p-2 w-full mb-3 rounded"
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Harga"
          className="border p-2 w-full mb-3 rounded"
          required
        />
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stok"
          className="border p-2 w-full mb-3 rounded"
        />
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Nama file gambar (contoh: cappuccino.jpg)"
          className="border p-2 w-full mb-3 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          {editId ? "Update Menu" : "Tambah Menu"}
        </button>
      </form>

      {/* Daftar data */}
      <div className="max-w-4xl mx-auto">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading data...</p>
        ) : data.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="p-4 border rounded bg-white shadow-sm flex flex-col"
              >
                <img
                  src={`https://dodgerblue-monkey-417412.hostingersite.com/storage/${item.image}`}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded mb-2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/200x150?text=No+Image";
                  }}
                />
                <h2 className="font-semibold text-lg text-gray-800">
                  {item.title}
                </h2>
                <p
                  className="text-gray-600 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: item.description || "Tidak ada deskripsi",
                  }}
                />
                <p className="text-gray-500 text-sm mt-1">
                  Rp {item.price} • Stok: {item.stock}
                </p>
                <div className="flex gap-2 mt-3">
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
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Belum ada data menu.</p>
        )}
      </div>
    </div>
  );
}
