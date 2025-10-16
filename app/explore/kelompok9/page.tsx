"use client";
import React, { useEffect, useState } from "react";

interface AkunML {
  id?: string;
  penjual: string;
  skin: string;
  level: string;
  hero: string;
  price: string;
  deskripsi: string;
  preview_image: string;
}

export default function Kelompok9Page() {
  const [data, setData] = useState<AkunML[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<AkunML>({
    penjual: "",
    skin: "",
    level: "",
    hero: "",
    price: "",
    deskripsi: "",
    preview_image: "",
  });
  const [editId, setEditId] = useState<string | null>(null);

  const API_URL = "/api/kelompok9";

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API_URL);
      const result = await res.json();
      if (Array.isArray(result)) {
        setData(result);
      } else {
        console.log("Unexpected response:", result);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    if (editId) formData.append("id", editId);

    try {
      const res = await fetch(API_URL, { method: "POST", body: formData });
      const result = await res.json();
      alert(result.message || "Data berhasil disimpan!");
      setForm({
        penjual: "",
        skin: "",
        level: "",
        hero: "",
        price: "",
        deskripsi: "",
        preview_image: "",
      });
      setEditId(null);
      fetchData();
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleEdit = (item: AkunML) => {
    setForm(item);
    setEditId(item.id || null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      const res = await fetch(API_URL, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      alert(result.message || "Data berhasil dihapus!");
      fetchData();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-6 pt-24 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        🎮 CRUD Kelompok 9 – Akun Mobile Legends
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mb-10"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="penjual"
            value={form.penjual}
            onChange={handleChange}
            placeholder="Nama Penjual"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="skin"
            value={form.skin}
            onChange={handleChange}
            placeholder="Jumlah Skin"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="level"
            value={form.level}
            onChange={handleChange}
            placeholder="Level Akun"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="hero"
            value={form.hero}
            onChange={handleChange}
            placeholder="Jumlah Hero"
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
          <input
            type="text"
            name="preview_image"
            value={form.preview_image}
            onChange={handleChange}
            placeholder="URL Gambar"
            className="border p-2 rounded"
          />
          <textarea
            name="deskripsi"
            value={form.deskripsi}
            onChange={handleChange}
            placeholder="Deskripsi Akun"
            className="border p-2 rounded col-span-2"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 mt-4 rounded text-white ${
            editId
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editId ? "Update Data" : "Tambah Data"}
        </button>
      </form>

      {/* DATA TABLE */}
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          Daftar Akun ML
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : data.length > 0 ? (
          <table className="w-full border border-gray-300 rounded text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border px-3 py-2">Penjual</th>
                <th className="border px-3 py-2">Skin</th>
                <th className="border px-3 py-2">Level</th>
                <th className="border px-3 py-2">Hero</th>
                <th className="border px-3 py-2">Harga</th>
                <th className="border px-3 py-2">Deskripsi</th>
                <th className="border px-3 py-2">Preview</th>
                <th className="border px-3 py-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{item.penjual || "-"}</td>
                  <td className="border px-3 py-2">{item.skin}</td>
                  <td className="border px-3 py-2">{item.level}</td>
                  <td className="border px-3 py-2">{item.hero}</td>
                  <td className="border px-3 py-2">Rp {item.price}</td>
                  <td className="border px-3 py-2">{item.deskripsi || "-"}</td>
                  <td className="border px-3 py-2">
                    {item.preview_image ? (
                      <img
                        src={`https://projekkelompok9-production.up.railway.app/${item.preview_image}`}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      "-"
                    )}
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
          <p className="text-center text-gray-500">Belum ada data akun.</p>
        )}
      </div>
    </div>
  );
}
