// components/HeaderNavbar.tsx
"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export default function HeaderNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Destinations", href: "/destinations" },
    { name: "Activity", href: "/https://blog-private-nu.vercel.app/" },
    { name: "Hotel", href: "/hotel" },
  ]
  return (
    <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          🌍 Tripnesia
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {item.name}
            </Link>
          ))}
          <div className="flex space-x-4">
            <Link
              href="/auth"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              href="/auth"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Daftar
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block text-gray-700 hover:text-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3">
            <Link
              href="/auth"
              className="w-full text-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/auth"
              className="w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Daftar
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
