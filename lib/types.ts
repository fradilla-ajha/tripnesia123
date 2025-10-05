export type BookingType = "flight" | "ship" | "hotel"

export interface Booking {
  id: number
  name: string
  type: BookingType
  destination: string
  date: string // ISO yyyy-mm-dd
}

export interface Destination {
  id: number
  slug: string
  name: string
  location: string
  shortDescription: string
  heroImage: string
  highlights: string[]
  cultureTips: string[]
  bestTime: string
  estimatedPrice: number
}

export interface Hotel {
  id: number
  name: string
  destinationSlug: string
  location: string
  rating: number
  pricePerNight: number
  image: string
}

export interface Activity {
  id: number
  title: string
  destinationSlug: string
  summary: string
  price: number
  image: string
}
