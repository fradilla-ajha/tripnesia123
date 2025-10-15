"use client";
import React, { useEffect, useState } from "react";

interface Product {
  product_id?: number;
  product_title: string;
  product_price: string;
  product_img1: string;
}

export default function Kelompok3Page() {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<Product>({
    product_title: "",
    product_price: "",
    product_img1: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  const API_BASE = "http://www.cvjayatehnik.com/api/recomendations.php";
  const TOKEN = "Tokengadgethouse";

  // Fetch data (GET)
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}?action=read`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
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
  }, []);

  // Handle form input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Create or Update (POST or PUT)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const action = editId ? "update" : "create";
    const body = editId ? { ...form, product_id: editId } : form;

    try {
      const res = await fetch(`${API_BASE}?action=${action}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(body),
      });
      const result = await res.json();
      alert(result.message || "Berhasil disimpan");
      setForm({ product_title: "", product_price: "", product_img1: "" });
      setEditId(null);
      fetchData();
    } catch (err) {
      console.error("Error saving data:", err);
    }
  };

  // Delete (DELETE)
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      const res = await fetch(`${API_BASE}?action=delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ product_id: id }),
      });
      const result = await res.json();
      alert(result.message || "Data dihapus");
      fetchData();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  // Edit
  const handleEdit = (item: Product) => {
    setForm({
      product_title: item.product_title,
      product_price: item.product_price.toString(),
      product_img1: item.product_img1,
    });
    setEditId(item.product_id || null);
  };

  return (
    <div className="p-6 pt-24 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        CRUD Kelompok 3
      </h1>

      {/* Form tambah/edit */}
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mb-10"
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
            placeholder="Nama File Gambar (misal: product.webp)"
            className="border p-2 rounded col-span-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 mt-4 rounded hover:bg-blue-700"
        >
          {editId ? "Update Produk" : "Tambah Produk"}
        </button>
      </form>

      {/* Daftar produk */}
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Daftar Produk Rekomendasi
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading data...</p>
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
                  <td className="border px-3 py-2">
                    Rp {parseInt(item.product_price).toLocaleString("id-ID")}
                  </td>
                  <td className="border px-3 py-2">
                    <img
                      src={`http://www.cvjayatehnik.com/assets/img/product/${item.product_img1}`}
                      alt={item.product_title}
                      className="w-16 h-16 object-cover rounded"
                    />
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
          <p className="text-center text-gray-500">Belum ada data.</p>
        )}
      </div>
    </div>
  );
}
