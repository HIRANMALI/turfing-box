
export interface Court {
  id: string;
  name: string;
  sport: string;
  priceRaw: number;
  price: string;
}

export interface Turf {
  id: string;
  name: string;
  location: string;
  priceRaw: number; // For sorting/filtering (lowest price)
  price: string; // Display string (e.g. "Starts at ₹800")
  rating: number;
  image: string;
  description: string;
  amenities: string[];
  images: string[];
  courts: Court[];
}

export const MOCK_TURFS: Turf[] = [
  {
    id: "1",
    name: "Urban Kicks Arena",
    location: "Downtown, Metro City",
    priceRaw: 1200,
    price: "Starts at ₹1,200",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=2071&auto=format&fit=crop",
    description: "Premium 5-a-side football turf with FIFA quality grass and night vision lighting.",
    amenities: ["Parking", "Changing Rooms", "Water", "Floodlights"],
    images: [
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=2070&auto=format&fit=crop"
    ],
    courts: [
      { id: "c1", name: "Court A (5v5)", sport: "Football", priceRaw: 1200, price: "₹1,200/hr" },
      { id: "c2", name: "Court B (7v7)", sport: "Football", priceRaw: 1500, price: "₹1,500/hr" },
    ]
  },
  {
    id: "2",
    name: "Skyline Sports Hub",
    location: "Westside, Metro City",
    priceRaw: 900,
    price: "Starts at ₹900",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=2070&auto=format&fit=crop",
    description: "Multi-sport arena suitable for Cricket and Football with elevated viewing gallery.",
    amenities: ["Cafe", "Parking", "First Aid", "Equipment Rental"],
    images: [
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=2071&auto=format&fit=crop"
    ],
    courts: [
        { id: "c3", name: "Box Cricket A", sport: "Cricket", priceRaw: 1000, price: "₹1,000/hr" },
        { id: "c4", name: "Box Cricket B", sport: "Cricket", priceRaw: 1000, price: "₹1,000/hr" },
        { id: "c5", name: "Futsal Court", sport: "Football", priceRaw: 900, price: "₹900/hr" }
    ]
  },
  {
    id: "3",
    name: "Green Valley Turf",
    location: "Suburbs, Metro City",
    priceRaw: 800,
    price: "Starts at ₹800",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=2070&auto=format&fit=crop",
    description: "Affordable and well-maintained turf perfect for causal games and regular practice.",
    amenities: ["Water", "Floodlights"],
    images: [
       "https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=2070&auto=format&fit=crop"
    ],
    courts: [
        { id: "c6", name: "Standard Pitch", sport: "Football", priceRaw: 800, price: "₹800/hr" }
    ]
  },
  {
    id: "4",
    name: "Pro Level Pitch",
    location: "Sports Complex",
    priceRaw: 1500,
    price: "Starts at ₹1,500",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2038&auto=format&fit=crop",
    description: "Professional grade surface approved for league matches.",
    amenities: ["Showers", "Locker Room", "Pro Shop", "Physio"],
    images: [
       "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=2038&auto=format&fit=crop"
    ],
    courts: [
        { id: "c7", name: "Pro Court 1", sport: "Football", priceRaw: 1500, price: "₹1,500/hr" },
        { id: "c8", name: "Pro Court 2", sport: "Football", priceRaw: 1500, price: "₹1,500/hr" },
        { id: "c9", name: "Tennis Court", sport: "Tennis", priceRaw: 1800, price: "₹1,800/hr" }
    ]
  }
];

export const getTurfById = (id: string) => MOCK_TURFS.find(t => t.id === id);
