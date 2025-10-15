"use client";
import React, { useEffect, useState } from "react";

interface Booking {
  id?: number;
  name: string;
  type: string;
  destination: string;
  date: string;
}

export default function Kelompok1Page() {
  const [data, setData] = useState<Booking[]>([]);
  const [form, setForm] = useState<Booking>({
    name: "",
    type: "flight",
    destination: "",
    date: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const API_URL = "/api/kelompok1"; // proxy ke route.ts

  // 🔹 Ambil data
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const result = await res.json();
      if (result.data) setData(result.data);
    } catch (err) {
      console.error("❌ Gagal memuat data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Input handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Submit handler (Create / Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const body = editId ? { ...form, id: editId } : form;

    try {
      const res = await fetch(API_URL, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      alert(result.message || (editId ? "Data diupdate!" : "Data ditambahkan!"));
      setForm({ name: "", type: "flight", destination: "", date: "" });
      setEditId(null);
      fetchData();
    } catch (err) {
      console.error("❌ Gagal menyimpan data:", err);
    }
  };

  // 🔹 Edit data
  const handleEdit = (item: Booking) => {
    setEditId(item.id || null);
    setForm({
      name: item.name,
      type: item.type,
      destination: item.destination,
      date: item.date,
    });
  };

  // 🔹 Hapus data
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      const res = await fetch(`${API_URL}?id=${id}`, { method: "DELETE" });
      const result = await res.json();
      alert(result.message || "Data dihapus!");
      fetchData();
    } catch (err) {
      console.error("❌ Gagal menghapus data:", err);
    }
  };

  return (
    <div className="p-6 pt-24 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        CRUD Kelompok 1 - Tripnesia
      </h1>

      {/* Form tambah/edit */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mb-10"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama"
            className="border p-2 rounded"
            required
          />
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="flight">Flight</option>
            <option value="hotel">Hotel</option>
            <option value="tour">Tour</option>
          </select>
          <input
            type="text"
            name="destination"
            value={form.destination}
            onChange={handleChange}
            placeholder="Destinasi"
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 mt-4 rounded hover:bg-blue-700"
        >
          {editId ? "Update Data" : "Tambah Data"}
        </button>
      </form>

      {/* Tabel data */}
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Daftar Booking</h2>

        {loading ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : data.length > 0 ? (
          <table className="w-full border border-gray-300 rounded text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border px-3 py-2 text-center">ID</th>
                <th className="border px-3 py-2">Nama</th>
                <th className="border px-3 py-2">Tipe</th>
                <th className="border px-3 py-2">Destinasi</th>
                <th className="border px-3 py-2">Tanggal</th>
                <th className="border px-3 py-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2 text-center">{item.id}</td>
                  <td className="border px-3 py-2">{item.name}</td>
                  <td className="border px-3 py-2 capitalize">{item.type}</td>
                  <td className="border px-3 py-2">{item.destination}</td>
                  <td className="border px-3 py-2">{item.date}</td>
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
