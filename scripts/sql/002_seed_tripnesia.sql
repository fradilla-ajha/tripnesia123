-- Seed destinations
insert into public.destinations (slug, name, location, short_description, hero_image, highlights, culture_tips, best_time, estimated_price)
values
('bali','Bali','Bali, Indonesia','Pulau dewata dengan pantai, budaya, dan kuliner yang memikat.','/bali-temple-over-ocean.jpg','["Pantai Kuta","Ubud Rice Terrace","Pura Tanah Lot"]','["Hormati adat saat memasuki pura","Berpakaian sopan"]','April - Oktober (musim kering)',350),
('yogyakarta','Yogyakarta','DI Yogyakarta, Indonesia','Kota budaya dengan candi megah, kuliner khas, dan seni tradisi.','/yogyakarta-borobudur-sunrise.jpg','["Candi Borobudur","Malioboro","Keraton Yogyakarta"]','["Sapa dengan ramah","Tawar menawar secukupnya di pasar"]','Mei - September',250),
('raja-ampat','Raja Ampat','Papua Barat, Indonesia','Surga bawah laut dengan keanekaragaman hayati kelas dunia.','/raja-ampat-limestone-islands.jpg','["Wayag","Pianemo","Snorkeling/Diving"]','["Jaga kebersihan laut","Gunakan pemandu lokal"]','Oktober - April',900),
('jakarta','Jakarta','DKI Jakarta, Indonesia','Kota metropolitan penuh kuliner, belanja, dan sejarah.','/jakarta-skyline-monas.jpg','["Monas","Kota Tua","Ancol"]','["Hargai antrian","Perhatikan jam macet"]','Juni - Agustus',180)
on conflict (slug) do nothing;

-- Seed hotels
insert into public.hotels (name, destination_slug, location, rating, price_per_night, image) values
('Ubud Serenity Resort','bali','Ubud, Bali',4.6,95,'/ubud-resort-pool.jpg'),
('Malioboro Boutique Hotel','yogyakarta','Malioboro, Yogyakarta',4.2,55,'/yogyakarta-city-hotel.jpg'),
('Raja Ampat Eco Lodge','raja-ampat','Waigeo, Raja Ampat',4.8,220,'/overwater-bungalow-papua.jpg'),
('Jakarta City Stay','jakarta','Central Jakarta',4.0,45,'/jakarta-business-hotel.jpg')
on conflict do nothing;

-- Seed activities
insert into public.activities (title, destination_slug, summary, price, image) values
('Sunset at Tanah Lot','bali','Nikmati matahari terbenam di pura ikonik.',15,'/tanah-lot-sunset.jpg'),
('Borobudur Sunrise Tour','yogyakarta','Tur pagi menikmati sunrise di Candi Borobudur.',30,'/borobudur-sunrise-tour.jpg'),
('Island Hopping','raja-ampat','Eksplor pulau-pulau karst yang menakjubkan.',80,'/raja-ampat-island-hopping.jpg'),
('Kota Tua Heritage Walk','jakarta','Jelajah sejarah kolonial di Jakarta.',10,'/jakarta-kota-tua-walking.jpg')
on conflict do nothing;

-- Optional sample bookings
insert into public.bookings (name, type, destination, date) values
('Siti Rahma','hotel','Bali','2025-11-01'),
('Andi Saputra','flight','Yogyakarta','2025-12-15')
on conflict do nothing;
