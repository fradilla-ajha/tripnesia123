"use client";
import React, { useEffect, useState } from "react";

interface ProductItem {
  product_id?: number;
  product_title: string;
  product_price: string;
  product_img1: string;
}

export default function Kelompok3Page() {
  const [data, setData] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<ProductItem>({
    product_title: "",
    product_price: "",
    product_img1: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  const API_BASE = "https://www.cvjayatehnik.com/api/recomendations.php";
  const TOKEN = "Tokengadgethouse";

  // 🔹 GET data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}?action=read`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const result = await res.json();
      console.log("API Response:", result);
      if (result.status === "success" && Array.isArray(result.data)) {
        setData(result.data);
      } else {
        console.warn("Response tidak sesuai format:", result);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      alert("Gagal memuat data. Cek koneksi atau token.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Handle input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Create / Update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const action = editId ? "update" : "create";
    const url = `${API_BASE}?action=${action}${editId ? `&id=${editId}` : ""}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      console.log("Save result:", result);
      if (result.status === "success") {
        alert(editId ? "Produk berhasil diperbarui!" : "Produk berhasil ditambahkan!");
        setForm({ product_title: "", product_price: "", product_img1: "" });
        setEditId(null);
        fetchData();
      } else {
        alert("Gagal menyimpan data!");
      }
    } catch (err) {
      console.error("Error saving data:", err);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  // 🔹 Delete data
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    try {
      const res = await fetch(`${API_BASE}?action=delete&id=${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      const result = await res.json();
      if (result.status === "success") {
        alert("Produk berhasil dihapus!");
        fetchData();
      } else {
        alert("Gagal menghapus produk!");
      }
    } catch (err) {
      console.error("Error deleting data:", err);
      alert("Terjadi kesalahan saat menghapus produk.");
    }
  };

  // 🔹 Edit data
  const handleEdit = (item: ProductItem) => {
    setForm({
      product_title: item.product_title,
      product_price: item.product_price,
      product_img1: item.product_img1,
    });
    setEditId(item.product_id || null);
  };

  return (
    <div className="p-6 pt-24 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
        CRUD Kelompok 3 – Rekomendasi Produk
      </h1>

      {/* Form Tambah / Edit */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mb-10"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="product_title"
            value={form.product_title}
            onChange={handleChange}
            placeholder="Nama Produk"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="product_price"
            value={form.product_price}
            onChange={handleChange}
            placeholder="Harga Produk"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="product_img1"
            value={form.product_img1}
            onChange={handleChange}
            placeholder="Nama File Gambar (contoh: produk1.webp)"
            className="border p-2 rounded col-span-2"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 mt-4 rounded text-white ${
            editId
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {editId ? "Update Produk" : "Tambah Produk"}
        </button>
      </form>

      {/* Tabel Data */}
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Daftar Rekomendasi Produk
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Memuat data...</p>
        ) : data.length > 0 ? (
          <table className="w-full border border-gray-300 rounded text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border px-3 py-2">ID</th>
                <th className="border px-3 py-2">Nama Produk</th>
                <th className="border px-3 py-2">Harga</th>
                <th className="border px-3 py-2">Gambar</th>
                <th className="border px-3 py-2 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.product_id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{item.product_id}</td>
                  <td className="border px-3 py-2">{item.product_title}</td>
                  <td className="border px-3 py-2">Rp {item.product_price}</td>
                  <td className="border px-3 py-2">{item.product_img1}</td>
                  <td className="border px-3 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.product_id!)}
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
          <p className="text-center text-gray-500">
            Belum ada data rekomendasi produk.
          </p>
        )}
      </div>
    </div>
  );
}