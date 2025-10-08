"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const dataKelompok = [
  {
    nama: "Website Kelompok 1",
    link: "https://rental-baju.netlify.app/",
    deskripsi: "RentalBaju",
  },
  {
    nama: "Website Kelompok 3",
    link: "http://www.cvjayatehnik.com/",
    deskripsi: "Gadget House",
  },
  {
    nama: "Website Kelompok 4",
    link: "https://projekkelompok4-production.up.railway.app/",
    deskripsi: "Pemesanan Makanan & Minuman",
  },
  {
    nama: "Website Kelompok 5",
    link: "https://projek5-production.up.railway.app/",
    deskripsi: "Caffee Galeri",
  },
  {
    nama: "Website Kelompok 6",
    link: "https://v0-house-cafe-website-project.vercel.app/",
    deskripsi: "HouseCafe",
  },
  {
    nama: "Website Kelompok 7",
    link: "https://sobatpromo.fwh.is/",
    deskripsi: "SobatPromo",
  },
  {
    nama: "Website Kelompok 8",
    link: "",
    deskripsi: "JustBuy (belum tersedia)",
  },
  {
    nama: "Website Kelompok 9",
    link: "https://dodgerblue-monkey-417412.hostingersite.com/",
    deskripsi: "Cafeku",
  },
];

const HalamanKelompok: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-10 pt-24">
      {/* ↑ Tambahkan pt-24 agar konten tidak tertutup navbar */}

      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
        Eksplorasi Website
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataKelompok.map((item, index) => (
          <Card
            key={index}
            className="shadow-md hover:shadow-lg transition-shadow border border-blue-200 bg-white"
          >
            <CardContent className="p-6 text-center flex flex-col items-center">
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                {item.nama}
              </h2>
              <p className="text-gray-600 mb-4">{item.deskripsi}</p>
              <Button
                onClick={() => item.link && window.open(item.link, "_blank")}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Kunjungi
                <ExternalLink size={16} />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HalamanKelompok;
