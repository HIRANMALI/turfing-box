export interface PremiumTurf {
  id: number;
  title: string;
  location: string;
  distance: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number | null;
  totalCourts: number;
  badges: string[];
  features: string;
  type: string;
}

export const PREMIUM_TURFS: PremiumTurf[] = [
  {
    id: 1,
    title: "Old Trafford - 5-a-Side Premium Arena",
    location: "Trafford, Manchester",
    distance: "1.2 km",
    image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviews: 1240,
    price: 1500,
    originalPrice: 2000,
    totalCourts: 3,
    badges: [],
    features: "Private changing rooms • Video recording",
    type: "Football",
  },
  {
    id: 2,
    title: "Camp Nou Rooftop Pitch",
    location: "Les Corts, Barcelona",
    distance: "4.5 km",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 856,
    price: 2200,
    originalPrice: 2800,
    totalCourts: 2,
    badges: [],
    features: "Floodlights • Spectator seating",
    type: "Football",
  },
  {
    id: 3,
    title: "Lord's Indoor Cricket Nets",
    location: "St John's Wood, London",
    distance: "2.8 km",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviews: 543,
    price: 1800,
    originalPrice: null,
    totalCourts: 8,
    badges: [],
    features: "Bowling machine included",
    type: "Cricket",
  },
  {
    id: 4,
    title: "Roland Garros Clay Court 3",
    location: "Auteuil, Paris",
    distance: "6.1 km",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    reviews: 320,
    price: 3500,
    originalPrice: 4200,
    totalCourts: 5,
    badges: [],
    features: "Equipment rental • Professional coaching",
    type: "Tennis",
  },
  {
    id: 5,
    title: "Lakers Practice Facility",
    location: "El Segundo, Los Angeles",
    distance: "8.3 km",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800",
    rating: 5.0,
    reviews: 2100,
    price: 5000,
    originalPrice: 6500,
    totalCourts: 1,
    badges: [],
    features: "Full court • NBA flooring",
    type: "Basketball",
  },
  {
    id: 6,
    title: "Wembley 7s Pitch",
    location: "Wembley, London",
    distance: "3.2 km",
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=800",
    rating: 4.6,
    reviews: 180,
    price: 1200,
    originalPrice: 1500,
    totalCourts: 4,
    badges: [],
    features: "Parking • Refreshments",
    type: "Football",
  },
  {
    id: 7,
    title: "Melbourne Cricket Ground Nets",
    location: "East Melbourne, Melbourne",
    distance: "1.5 km",
    image: "https://images.unsplash.com/photo-1593341646782-e0b495cffd32?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 450,
    price: 1600,
    originalPrice: 1800,
    totalCourts: 6,
    badges: [],
    features: "Pro equipment",
    type: "Cricket",
  },
  {
    id: 8,
    title: "Arthur Ashe Stadium Court",
    location: "Flushing Meadows, New York",
    distance: "5.5 km",
    image: "https://images.unsplash.com/photo-1588691161295-d8557b4943f6?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviews: 990,
    price: 4500,
    originalPrice: 5000,
    totalCourts: 2,
    badges: [],
    features: "Night lighting",
    type: "Tennis",
  }
];
