"use client";
import React, { useEffect, useState } from "react";

interface PromoItem {
  id?: number;
  title: string;
  description: string;
  valid_until: string;
}

export default function Kelompok7Page() {
  const [data, setData] = useState<PromoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<PromoItem>({
    title: "",
    description: "",
    valid_until: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  const API_BASE = "https://sobatpromo-api-production.up.railway.app/api.php";

  // Ambil data dari API
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}?action=list`);
      const result = await res.json();

      // Pastikan hasilnya selalu array
      const promos = Array.isArray(result)
        ? result.map((p) => ({
            id: p.id,
            title: p.title ?? "",
            description: p.description ?? "",
            valid_until: p.valid_until ?? "",
          }))
        : [result];

      setData(promos);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Simpan atau update data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const endpoint = editId
      ? `${API_BASE}?action=update&id=${editId}`
      : `${API_BASE}?action=create`;

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const result = await res.json();
      alert(result.message || "Berhasil disimpan!");
      setForm({ title: "", description: "", valid_until: "" });
      setEditId(null);
      fetchData();
    } catch (err) {
      console.error("Error saving data:", err);
    }
  };

  // Hapus data
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus promo ini?")) return;
    try {
      const res = await fetch(`${API_BASE}?action=delete&id=${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      alert(result.message || "Data dihapus!");
      fetchData();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  // Edit data
  const handleEdit = (item: PromoItem) => {
    setForm({
      title: item.title ?? "",
      description: item.description ?? "",
      valid_until: item.valid_until ?? "",
    });
    setEditId(item.id || null);
  };

  return (
    <div className="p-6 pt-24 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
        CRUD Kelompok 7 – Sobat Promo
      </h1>

      {/* Form Tambah / Edit */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mb-10"
      >
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="title"
            value={form.title ?? ""}
            onChange={handleChange}
            placeholder="Judul Promo"
            className="border p-2 rounded"
            required
          />
          <textarea
            name="description"
            value={form.description ?? ""}
            onChange={handleChange}
            placeholder="Deskripsi Promo"
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            name="valid_until"
            value={form.valid_until ?? ""}
            onChange={handleChange}
            className="border p-2 rounded"
            required
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
          {editId ? "Update Promo" : "Tambah Promo"}
        </button>
      </form>

      {/* Tabel Data */}
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Daftar Promo Aktif
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : data.length > 0 ? (
          <table className="w-full border border-gray-300 rounded text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border px-3 py-2">Judul</th>
                <th className="border px-3 py-2">Deskripsi</th>
                <th className="border px-3 py-2">Berlaku Sampai</th>
                <th className="border px-3 py-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2 font-medium">{item.title}</td>
                  <td className="border px-3 py-2">
                    {item.description || "Tidak ada deskripsi"}
                  </td>
                  <td className="border px-3 py-2">{item.valid_until}</td>
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
          <p className="text-center text-gray-500">Belum ada data promo.</p>
        )}
      </div>
    </div>
  );
}
