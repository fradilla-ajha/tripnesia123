"use client";
import React, { useState } from "react";

export default function Kelompok9Page() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("https://sobatpromo.infinityfree.me/api.php?action=create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
        }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ success: false, message: "Gagal menghubungi server" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4 text-blue-600">
          Form Create Data (Kelompok 9)
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Masukkan nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-2"
          />
          <textarea
            placeholder="Masukkan deskripsi"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-2 h-24"
          />
          <button
            type="submit"
            disabled={loading}
            className={`p-2 rounded-lg text-white font-medium ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Mengirim..." : "Kirim ke API"}
          </button>
        </form>

        {response && (
          <div
            className={`mt-5 p-3 rounded-lg ${
              response.success ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <h4 className="font-semibold">Response API:</h4>
            <pre className="text-sm mt-2 bg-gray-50 p-2 rounded overflow-auto">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
