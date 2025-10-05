import type { Activity, Booking, Destination, Hotel } from "./types"

let bookingId = 3
export const bookings: Booking[] = [
  {
    id: 1,
    name: "Siti Rahma",
    type: "hotel",
    destination: "Bali",
    date: "2025-11-01",
  },
  {
    id: 2,
    name: "Andi Saputra",
    type: "flight",
    destination: "Yogyakarta",
    date: "2025-12-15",
  },
]

export const destinations: Destination[] = [
  {
    id: 1,
    slug: "bali",
    name: "Bali",
    location: "Bali, Indonesia",
    shortDescription: "Pulau dewata dengan pantai, budaya, dan kuliner yang memikat.",
    heroImage: "/bali-temple-over-ocean.jpg",
    highlights: ["Pantai Kuta", "Ubud Rice Terrace", "Pura Tanah Lot"],
    cultureTips: ["Hormati adat saat memasuki pura", "Berpakaian sopan"],
    bestTime: "April - Oktober (musim kering)",
    estimatedPrice: 350,
  },
  {
    id: 2,
    slug: "yogyakarta",
    name: "Yogyakarta",
    location: "DI Yogyakarta, Indonesia",
    shortDescription: "Kota budaya dengan candi megah, kuliner khas, dan seni tradisi.",
    heroImage: "/yogyakarta-borobudur-sunrise.jpg",
    highlights: ["Candi Borobudur", "Malioboro", "Keraton Yogyakarta"],
    cultureTips: ["Sapa dengan ramah", "Tawar menawar secukupnya di pasar"],
    bestTime: "Mei - September",
    estimatedPrice: 250,
  },
  {
    id: 3,
    slug: "raja-ampat",
    name: "Raja Ampat",
    location: "Papua Barat, Indonesia",
    shortDescription: "Surga bawah laut dengan keanekaragaman hayati kelas dunia.",
    heroImage: "/raja-ampat-limestone-islands.jpg",
    highlights: ["Wayag", "Pianemo", "Snorkeling/Diving"],
    cultureTips: ["Jaga kebersihan laut", "Gunakan pemandu lokal"],
    bestTime: "Oktober - April",
    estimatedPrice: 900,
  },
  {
    id: 4,
    slug: "jakarta",
    name: "Jakarta",
    location: "DKI Jakarta, Indonesia",
    shortDescription: "Kota metropolitan penuh kuliner, belanja, dan sejarah.",
    heroImage: "/jakarta-skyline-monas.jpg",
    highlights: ["Monas", "Kota Tua", "Ancol"],
    cultureTips: ["Hargai antrian", "Perhatikan jam macet"],
    bestTime: "Juni - Agustus",
    estimatedPrice: 180,
  },
]

export const hotels: Hotel[] = [
  {
    id: 1,
    name: "Ubud Serenity Resort",
    destinationSlug: "bali",
    location: "Ubud, Bali",
    rating: 4.6,
    pricePerNight: 95,
    image: "/ubud-resort-pool.jpg",
  },
  {
    id: 2,
    name: "Malioboro Boutique Hotel",
    destinationSlug: "yogyakarta",
    location: "Malioboro, Yogyakarta",
    rating: 4.2,
    pricePerNight: 55,
    image: "/yogyakarta-city-hotel.jpg",
  },
  {
    id: 3,
    name: "Raja Ampat Eco Lodge",
    destinationSlug: "raja-ampat",
    location: "Waigeo, Raja Ampat",
    rating: 4.8,
    pricePerNight: 220,
    image: "/overwater-bungalow-papua.jpg",
  },
  {
    id: 4,
    name: "Jakarta City Stay",
    destinationSlug: "jakarta",
    location: "Central Jakarta",
    rating: 4.0,
    pricePerNight: 45,
    image: "/jakarta-business-hotel.jpg",
  },
]

export const activities: Activity[] = [
  {
    id: 1,
    title: "Sunset at Tanah Lot",
    destinationSlug: "bali",
    summary: "Nikmati matahari terbenam di pura ikonik.",
    price: 15,
    image: "/tanah-lot-sunset.jpg",
  },
  {
    id: 2,
    title: "Borobudur Sunrise Tour",
    destinationSlug: "yogyakarta",
    summary: "Tur pagi menikmati sunrise di Candi Borobudur.",
    price: 30,
    image: "/borobudur-sunrise-tour.jpg",
  },
  {
    id: 3,
    title: "Island Hopping",
    destinationSlug: "raja-ampat",
    summary: "Eksplor pulau-pulau karst yang menakjubkan.",
    price: 80,
    image: "/raja-ampat-island-hopping.jpg",
  },
  {
    id: 4,
    title: "Kota Tua Heritage Walk",
    destinationSlug: "jakarta",
    summary: "Jelajah sejarah kolonial di Jakarta.",
    price: 10,
    image: "/jakarta-kota-tua-walking.jpg",
  },
]

// Utility creators
export function nextBookingId() {
  bookingId += 1
  return bookingId
}
