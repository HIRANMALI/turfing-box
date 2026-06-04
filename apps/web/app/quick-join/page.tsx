"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import QuickJoinCard from "@/components/QuickJoinCard";
import { Zap } from "lucide-react";

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ');
}

// Mock Data for "Find a Player"
const MOCK_GAME_LISTINGS = [
  {
    id: 1,
    sport: "Football",
    venue: "Old Trafford Turf, Manchester",
    time: "7:00 PM - 8:00 PM",
    slots: 3,
    totalSlots: 10,
    distance: "1.2 km away",
    price: 200,
    // New Fields
    image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=2070&auto=format&fit=crop",
    badges: ["Filling Fast", "Premium"],
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    sport: "Cricket",
    venue: "Lord's Indoor Nets, London",
    time: "8:00 PM - 9:00 PM",
    slots: 2,
    totalSlots: 12,
    distance: "2.5 km away",
    price: 150,
    // New Fields
    image: "https://images.unsplash.com/photo-1531415074968-0a4b56654e99?q=80&w=2069&auto=format&fit=crop", // Cricket-ish placeholder
    badges: ["Popular"],
    rating: 4.5,
    reviews: 89,
  },
  {
    id: 3,
    sport: "Football",
    venue: "Camp Nou Rooftop, Barcelona",
    time: "9:00 PM - 10:00 PM",
    slots: 1,
    totalSlots: 10,
    distance: "0.8 km away",
    price: 250,
    // New Fields
    image: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=2076&auto=format&fit=crop",
    badges: ["Last Spot"],
    rating: 4.9,
    reviews: 210,
  },
  {
    id: 4,
    sport: "Cricket",
    venue: "Oval Box Cricket, Kensington",
    time: "6:00 PM - 7:00 PM",
    slots: 5,
    totalSlots: 14,
    distance: "3.2 km away",
    price: 100,
    // New Fields
    image: "https://images.unsplash.com/photo-1624880357913-a8539238245b?q=80&w=2070&auto=format&fit=crop",
    badges: ["Budget"],
    rating: 4.2,
    reviews: 45,
  },
  {
    id: 5,
    sport: "Football",
    venue: "Anfield Arena, Liverpool",
    time: "10:00 PM - 11:00 PM",
    slots: 4,
    totalSlots: 10,
    distance: "5.0 km away",
    price: 180,
    // New Fields
    image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=2071&auto=format&fit=crop",
    badges: ["Night Game"],
    rating: 4.6,
    reviews: 76,
  },
];

export default function FindPlayerPage() {
  const [selectedSports, setSelectedSports] = useState<string[]>(["Football"]);

  const toggleSport = (sportId: string) => {
    setSelectedSports([sportId]);
  };

  const filteredGames = MOCK_GAME_LISTINGS.filter(game => selectedSports.includes(game.sport));

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-lime-500 selection:text-black">
      <Navbar />
      
      <main className="relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-lime-500/5 blur-[150px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-lime-500/5 blur-[120px] -z-10"></div>
        
        {/* 1. Technical Header / Dashboard */}
        <div className="container mx-auto px-4 pt-20 pb-8">
           {/* 1. Sports Filter (Themed) */}
           <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                 <div className="w-2 h-2 bg-lime-500 rounded-full"></div>
                 <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Select Discipline</h2>
              </div>
              <div className="flex flex-wrap gap-4">
                 {["Football", "Cricket"].map((sport) => (
                    <button
                      key={sport}
                      onClick={() => setSelectedSports([sport])}
                      className={cn(
                        "relative group px-8 py-3 -skew-x-12 font-black uppercase tracking-widest text-[11px] transition-all cursor-pointer border-2",
                        selectedSports.includes(sport) 
                          ? "bg-lime-500 border-lime-500 text-black shadow-[4px_4px_0px_#fff]" 
                          : "bg-transparent border-zinc-800 text-zinc-500 hover:border-lime-500 hover:text-white"
                      )}
                    >
                      <span className="skew-x-12">{sport}</span>
                    </button>
                 ))}
              </div>
           </div>

           {/* 3. Game Listings */}
           <div className="space-y-8">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                 <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    <span className="text-lime-500">{filteredGames.length} Missions Identified</span>
                    <span className="w-1 h-1 bg-zinc-800 rounded-full"></span>
                    <span>Ahmedabad Sector</span>
                 </div>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredGames.length > 0 ? (
                      filteredGames.map((game) => (
                          <QuickJoinCard key={game.id} game={game} />
                      ))
                  ) : (
                      <div className="col-span-full py-24 text-center border-2 border-dashed border-zinc-900 -skew-x-2">
                          <p className="text-zinc-600 font-black uppercase tracking-[0.2em] italic">No active missions found for this sector.</p>
                          <button 
                            onClick={() => setSelectedSports(["Football"])}
                            className="mt-6 text-lime-500 font-black text-[10px] uppercase tracking-widest hover:underline cursor-pointer"
                          >
                            Reset System Parameters
                          </button>
                      </div>
                  )}
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
