// components/Footer.tsx
import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Deskripsi */}
        <div>
          <Link href="/" className="text-2xl font-bold text-white">
            🌍 Tripnesia
          </Link>
          <p className="mt-4 text-sm leading-relaxed">
            Tripnesia membantu Anda menemukan destinasi terbaik, aktivitas seru, 
            dan hotel nyaman untuk perjalanan tak terlupakan.
          </p>
        </div>

        {/* Navigasi */}
        <div>
          <h3 className="text-white font-semibold mb-4">Navigasi</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/destinations" className="hover:text-white transition">
                Destinations
              </Link>
            </li>
            <li>
              <Link href="/activity" className="hover:text-white transition">
                Activity
              </Link>
            </li>
            <li>
              <Link href="/hotel" className="hover:text-white transition">
                Hotel
              </Link>
            </li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="text-white font-semibold mb-4">Kontak</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Mail size={18} /> support@tripnesia.com
            </li>
            <li>+62 858 2436 4689</li>
            <li>Jakarta, Indonesia</li>
          </ul>
        </div>

        {/* Sosial Media */}
        <div>
          <h3 className="text-white font-semibold mb-4">Ikuti Kami</h3>
          <div className="flex space-x-4">
            <Link href="https://web.facebook.com/profile.php?id=100027785563184" className="hover:text-white transition">
              <Facebook size={22} />
            </Link>
            <Link href="https://www.instagram.com/m.alpharz/" className="hover:text-white transition">
              <Instagram size={22} />
            </Link>
            <Link href="https://x.com/ecosystem4_0" className="hover:text-white transition">
              <Twitter size={22} />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Tripnesia. All rights reserved.
      </div>
    </footer>
  )
}
