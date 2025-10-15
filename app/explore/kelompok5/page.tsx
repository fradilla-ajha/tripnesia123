"use client";
import React, { useEffect, useState } from "react";

interface MenuItem {
  id?: number;
  name: string;
  description?: string;
  category: string;
  price: string;
}

export default function Kelompok5Page() {
  const [data, setData] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<MenuItem>({
    name: "",
    description: "",
    category: "kopi",
    price: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  // Base URL API
  const API_BASE = "https://projek5-production.up.railway.app/api";

  // Fetch data berdasarkan kategori
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/${form.category}`);
      const result = await res.json();
      if (result.status === "success") setData(result.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [form.category]);

  // Handle perubahan form input
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Tambah / Update data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editId ? "PUT" : "POST";
      const url = editId
        ? `${API_BASE}/${form.category}/${editId}`
        : `${API_BASE}/${form.category}`;

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
        name: "",
        description: "",
        category: form.category,
        price: "",
      });
      setEditId(null);
      fetchData();
    } catch (err) {
      console.error("Error saving data:", err);
    }
  };

  // Hapus data
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      const res = await fetch(`${API_BASE}/${form.category}/${id}`, {
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
      name: item.name,
      description: item.description || "",
      category: item.category,
      price: item.price,
    });
    setEditId(item.id || null);
  };

  return (
    <div className="p-6 pt-24 min-h-screen bg-amber-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-amber-800">
        ☕ CRUD Kelompok 5 – Kopi & Non Kopi
      </h1>

      {/* Pilihan kategori */}
      <div className="flex justify-center mb-6">
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 text-gray-700"
        >
          <option value="kopi">Kopi</option>
          <option value="nonkopi">Non Kopi</option>
        </select>
      </div>

      {/* Form tambah/edit */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mb-10"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama menu"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Harga"
            className="border p-2 rounded"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Deskripsi"
            className="border p-2 rounded col-span-2"
          />
        </div>

        <button
          type="submit"
          className="bg-amber-700 text-white w-full py-2 mt-4 rounded hover:bg-amber-800"
        >
          {editId ? "Update Data" : "Tambah Data"}
        </button>
      </form>

      {/* Daftar data dalam bentuk tabel */}
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-amber-800">
          Daftar {form.category === "kopi" ? "Menu Kopi" : "Menu Non Kopi"}
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading data...</p>
        ) : data.length > 0 ? (
          <table className="w-full border border-gray-300 rounded text-sm">
            <thead>
              <tr className="bg-amber-100 text-left">
                <th className="border px-3 py-2">Nama Menu</th>
                <th className="border px-3 py-2">Deskripsi</th>
                <th className="border px-3 py-2">Kategori</th>
                <th className="border px-3 py-2">Harga</th>
                <th className="border px-3 py-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-amber-50">
                  <td className="border px-3 py-2 font-medium text-gray-800">
                    {item.name}
                  </td>
                  <td className="border px-3 py-2 text-gray-600">
                    {item.description || "Tidak ada deskripsi"}
                  </td>
                  <td className="border px-3 py-2 capitalize text-gray-700">
                    {item.category}
                  </td>
                  <td className="border px-3 py-2 text-gray-700">
                    Rp {item.price}
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
          <p className="text-center text-gray-500">Belum ada data.</p>
        )}
      </div>
    </div>
  );
}
