"use client";
import React, { useEffect, useState } from "react";

interface Promo {
  id?: string;
  title: string;
  description: string;
  valid_until: string;
}

export default function Kelompok10Page() {
  const [data, setData] = useState<Promo[]>([]);
  const [form, setForm] = useState<Promo>({
    title: "",
    description: "",
    valid_until: "",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = "https://sobatpromo.infinityfree.me/api.php";

  // Fungsi ambil data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}?action=list`);
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        setData(Array.isArray(json) ? json : []);
      } catch (err) {
        console.error("Bukan JSON valid:", text);
        alert("Response dari server tidak valid JSON");
      }
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data dari server.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi tambah data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.valid_until) {
      alert("Semua field harus diisi!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("valid_until", form.valid_until);

      const res = await fetch(`${BASE_URL}?action=create`, {
        method: "POST",
        body: formData,
      });

      const result = await res.text();
      console.log("Response create:", result);

      alert("Data berhasil ditambahkan!");
      setForm({ title: "", description: "", valid_until: "" });
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan data.");
    }
  };

  // Fungsi update (simulasi di frontend)
  const handleUpdate = () => {
    if (!editId) return;
    setData((prev) =>
      prev.map((item) =>
        item.id === editId ? { ...item, ...form } : item
      )
    );
    alert("Data berhasil diupdate (simulasi)");
    setEditId(null);
    setForm({ title: "", description: "", valid_until: "" });
  };

  // Fungsi delete (simulasi di frontend)
  const handleDelete = (id?: string) => {
    if (!id) return;
    if (confirm("Yakin ingin menghapus data ini?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
      alert("Data berhasil dihapus (simulasi)");
    }
  };

  // Saat tombol edit diklik
  const handleEdit = (item: Promo) => {
    setEditId(item.id || null);
    setForm({
      title: item.title,
      description: item.description,
      valid_until: item.valid_until,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        💥 Kelompok 10 - Demo CRUD Promo
      </h1>

      {/* Form Tambah/Edit */}
      <form
        onSubmit={editId ? (e) => { e.preventDefault(); handleUpdate(); } : handleSubmit}
        className="bg-white shadow-md rounded-xl p-4 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Judul Promo"
            className="border p-2 rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Deskripsi"
            className="border p-2 rounded"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <input
            type="date"
            className="border p-2 rounded"
            value={form.valid_until}
            onChange={(e) =>
              setForm({ ...form, valid_until: e.target.value })
            }
          />
        </div>

        <div className="mt-4 text-right">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {editId ? "Update Promo" : "Tambah Promo"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setForm({ title: "", description: "", valid_until: "" });
              }}
              className="ml-2 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      {/* Tabel Data */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        {isLoading ? (
          <p className="text-center p-4">🔄 Memuat data...</p>
        ) : data.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Judul</th>
                <th className="p-3 border">Deskripsi</th>
                <th className="p-3 border">Berlaku Hingga</th>
                <th className="p-3 border text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{item.id}</td>
                  <td className="p-3 border">{item.title || "-"}</td>
                  <td className="p-3 border">{item.description || "-"}</td>
                  <td className="p-3 border">{item.valid_until || "-"}</td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center p-4">Tidak ada data promo.</p>
        )}
      </div>
    </div>
  );
}
