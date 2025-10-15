"use client";
import React, { useEffect, useState } from "react";
import {
  getReservasi,
  addReservasi,
  updateReservasi,
  deleteReservasi,
} from "@/app/utils/reservasiAPI";

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [newData, setNewData] = useState({
    nama: "",
    email: "",
    telepon: "",
    tanggal: "",
    jam: "",
    jumlah_orang: 1,
    catatan: "",
  });

  const [editData, setEditData] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await getReservasi();
    setData(result);
  };

  // TAMBAH DATA
  const handleAdd = async () => {
    if (!newData.nama || !newData.email) {
      alert("Nama dan email wajib diisi!");
      return;
    }
    await addReservasi(newData);
    setNewData({
      nama: "",
      email: "",
      telepon: "",
      tanggal: "",
      jam: "",
      jumlah_orang: 1,
      catatan: "",
    });
    fetchData();
  };

  // HAPUS DATA
  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      await deleteReservasi(id);
      fetchData();
    }
  };

  // BUKA MODAL EDIT
  const handleEdit = (item: any) => {
    setEditData(item);
    setShowModal(true);
  };

  // SIMPAN HASIL EDIT
  const handleSaveEdit = async () => {
    if (editData) {
      await updateReservasi(editData.id, editData);
      setShowModal(false);
      setEditData(null);
      fetchData();
    }
  };

  return (
    <main className="pt-24 px-6 pb-10">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Demo Crud Reservasi
      </h1>

      {/* FORM TAMBAH DATA */}
      <div className="grid grid-cols-2 gap-3 mb-8 bg-white p-6 rounded-xl shadow-md">
        <input
          type="text"
          placeholder="Nama"
          className="border p-2 rounded"
          value={newData.nama}
          onChange={(e) => setNewData({ ...newData, nama: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={newData.email}
          onChange={(e) => setNewData({ ...newData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Telepon"
          className="border p-2 rounded"
          value={newData.telepon}
          onChange={(e) => setNewData({ ...newData, telepon: e.target.value })}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={newData.tanggal}
          onChange={(e) => setNewData({ ...newData, tanggal: e.target.value })}
        />
        <input
          type="time"
          className="border p-2 rounded"
          value={newData.jam}
          onChange={(e) => setNewData({ ...newData, jam: e.target.value })}
        />
        <input
          type="number"
          min={1}
          placeholder="Jumlah Orang"
          className="border p-2 rounded"
          value={newData.jumlah_orang}
          onChange={(e) =>
            setNewData({ ...newData, jumlah_orang: parseInt(e.target.value) })
          }
        />
        <textarea
          placeholder="Catatan"
          className="border p-2 rounded col-span-2"
          value={newData.catatan}
          onChange={(e) => setNewData({ ...newData, catatan: e.target.value })}
        />
        <button
          onClick={handleAdd}
          className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
        >
          Tambah Reservasi
        </button>
      </div>

      {/* TABEL DATA */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-3">Daftar Reservasi</h2>
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-2 py-1">Nama</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Telepon</th>
              <th className="border px-2 py-1">Tanggal</th>
              <th className="border px-2 py-1">Jam</th>
              <th className="border px-2 py-1">Jumlah Orang</th>
              <th className="border px-2 py-1">Catatan</th>
              <th className="border px-2 py-1 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{item.nama}</td>
                <td className="border px-2 py-1">{item.email}</td>
                <td className="border px-2 py-1">{item.telepon}</td>
                <td className="border px-2 py-1">{item.tanggal}</td>
                <td className="border px-2 py-1">{item.jam}</td>
                <td className="border px-2 py-1 text-center">
                  {item.jumlah_orang}
                </td>
                <td className="border px-2 py-1">{item.catatan}</td>
                <td className="border px-2 py-1 text-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL EDIT */}
      {showModal && editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl w-[420px] shadow-lg">
            <h2 className="text-lg font-bold mb-4">Edit Data Reservasi</h2>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                className="border p-2 rounded"
                value={editData.nama}
                onChange={(e) =>
                  setEditData({ ...editData, nama: e.target.value })
                }
              />
              <input
                type="email"
                className="border p-2 rounded"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
              />
              <input
                type="text"
                className="border p-2 rounded"
                value={editData.telepon}
                onChange={(e) =>
                  setEditData({ ...editData, telepon: e.target.value })
                }
              />
              <input
                type="date"
                className="border p-2 rounded"
                value={editData.tanggal}
                onChange={(e) =>
                  setEditData({ ...editData, tanggal: e.target.value })
                }
              />
              <input
                type="time"
                className="border p-2 rounded"
                value={editData.jam}
                onChange={(e) =>
                  setEditData({ ...editData, jam: e.target.value })
                }
              />
              <input
                type="number"
                className="border p-2 rounded"
                value={editData.jumlah_orang}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    jumlah_orang: parseInt(e.target.value),
                  })
                }
              />
              <input
                type="text"
                className="border p-2 rounded"
                value={editData.catatan}
                onChange={(e) =>
                  setEditData({ ...editData, catatan: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                Batal
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
