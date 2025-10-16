"use client";
import React, { useEffect, useState } from "react";

interface ReservasiItem {
  id?: number;
  nama: string;
  email: string;
  telepon: string;
  tanggal: string;
  jam: string;
  jumlah_orang: number;
  catatan: string;
}

export default function Kelompok6Page() {
  const [data, setData] = useState<ReservasiItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<ReservasiItem>({
    nama: "",
    email: "",
    telepon: "",
    tanggal: "",
    jam: "",
    jumlah_orang: 1,
    catatan: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  const API_BASE =
    "https://rsjauhzcwslcsoktbplq.supabase.co/rest/v1/reservasi";
  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzamF1aHpjd3NsY3Nva3RicGxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzMjI3NzUsImV4cCI6MjA3NDg5ODc3NX0.EPNgXjJxtKRyPiWVXGm79aWBEV4rQiNolsR7n5sa_p8";

  // 🔹 GET data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(API_BASE, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          apikey: TOKEN,
        },
      });
      const result = await res.json();
      setData(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Handle input
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "jumlah_orang" ? parseInt(value || "0", 10) : value ?? "",
    }));
  };

  // 🔹 Create / Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editId ? "PATCH" : "POST";
      const endpoint = editId
        ? `${API_BASE}?id=eq.${editId}`
        : `${API_BASE}?create`;

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
          apikey: TOKEN,
          Prefer: "return=representation",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Gagal menyimpan data");
      alert(
        editId
          ? "Reservasi berhasil diperbarui!"
          : "Reservasi berhasil ditambahkan!"
      );
      setForm({
        nama: "",
        email: "",
        telepon: "",
        tanggal: "",
        jam: "",
        jumlah_orang: 1,
        catatan: "",
      });
      setEditId(null);
      fetchData();
    } catch (err) {
      console.error("Error saving data:", err);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  // 🔹 Delete data
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      const res = await fetch(`${API_BASE}?id=eq.${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          apikey: TOKEN,
        },
      });
      if (!res.ok) throw new Error("Gagal menghapus data");
      alert("Data berhasil dihapus!");
      fetchData();
    } catch (err) {
      console.error("Error deleting data:", err);
    }
  };

  // 🔹 Edit data
  const handleEdit = (item: ReservasiItem) => {
    setForm({
      nama: item.nama ?? "",
      email: item.email ?? "",
      telepon: item.telepon ?? "",
      tanggal: item.tanggal ?? "",
      jam: item.jam ?? "",
      jumlah_orang: item.jumlah_orang ?? 1,
      catatan: item.catatan ?? "",
    });
    setEditId(item.id || null);
  };

  return (
    <div className="p-6 pt-24 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        CRUD Kelompok 6 – Reservasi Restoran
      </h1>

      {/* Form Tambah / Edit */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mb-10"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="nama"
            value={form.nama ?? ""}
            onChange={handleChange}
            placeholder="Nama Lengkap"
            className="border p-2 rounded bg-white"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email ?? ""}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded bg-white"
            required
          />
          <input
            type="text"
            name="telepon"
            value={form.telepon ?? ""}
            onChange={handleChange}
            placeholder="Nomor Telepon"
            className="border p-2 rounded bg-white"
            required
          />
          <input
            type="date"
            name="tanggal"
            value={form.tanggal ?? ""}
            onChange={handleChange}
            className="border p-2 rounded bg-white"
            required
          />
          <input
            type="time"
            name="jam"
            value={form.jam ?? ""}
            onChange={handleChange}
            className="border p-2 rounded bg-white"
            required
          />
          <input
            type="number"
            name="jumlah_orang"
            value={form.jumlah_orang ?? 1}
            onChange={handleChange}
            placeholder="Jumlah Orang"
            className="border p-2 rounded bg-white"
            min={1}
            required
          />
          <textarea
            name="catatan"
            value={form.catatan ?? ""}
            onChange={handleChange}
            placeholder="Catatan Tambahan"
            className="border p-2 rounded col-span-2 bg-white"
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
          {editId ? "Update Reservasi" : "Tambah Reservasi"}
        </button>
      </form>

      {/* Tabel Data */}
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          Daftar Reservasi
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : data.length > 0 ? (
          <table className="w-full border border-gray-300 rounded text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border px-3 py-2">Nama</th>
                <th className="border px-3 py-2">Email</th>
                <th className="border px-3 py-2">Telepon</th>
                <th className="border px-3 py-2">Tanggal</th>
                <th className="border px-3 py-2">Jam</th>
                <th className="border px-3 py-2">Jumlah</th>
                <th className="border px-3 py-2">Catatan</th>
                <th className="border px-3 py-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{item.nama}</td>
                  <td className="border px-3 py-2">{item.email}</td>
                  <td className="border px-3 py-2">{item.telepon}</td>
                  <td className="border px-3 py-2">{item.tanggal}</td>
                  <td className="border px-3 py-2">{item.jam}</td>
                  <td className="border px-3 py-2 text-center">
                    {item.jumlah_orang}
                  </td>
                  <td className="border px-3 py-2">{item.catatan || "—"}</td>
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
          <p className="text-center text-gray-500">Belum ada data reservasi.</p>
        )}
      </div>
    </div>
  );
}
