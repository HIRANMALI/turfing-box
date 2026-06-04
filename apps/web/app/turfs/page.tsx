"use client";

import React, { useState, useEffect } from "react";
import { 
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
  Shield,
  Zap,
  LayoutGrid
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import TurfCard from "@/components/TurfCard";
import SportsFilter from "@/components/SportsFilter";
import { PREMIUM_TURFS } from "@/data/mock-turfs";

export default function TurfsPage() {
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);


  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSport = (sportId: string) => {
    setSelectedSports(prev => 
      prev.includes(sportId) 
        ? prev.filter(id => id !== sportId)
        : [...prev, sportId]
    );
  };

  const filteredTurfs = selectedSports.length === 0 
    ? PREMIUM_TURFS 
    : PREMIUM_TURFS.filter(turf => selectedSports.includes(turf.type));

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-black dark:text-white font-sans overflow-x-hidden transition-colors duration-300">
      
      <Navbar />

      {/* --- SPORTS FILTER (Dual Theme Ready) --- */}
      <SportsFilter selectedSports={selectedSports} onToggle={toggleSport} />

      <div className="container mx-auto px-4 pt-1 pb-6 md:pb-8">
        <div className="flex flex-col gap-4">
          
          {/* --- TOP FILTERS BAR --- */}
          <div className="sticky top-[143px] z-30 bg-zinc-50 dark:bg-zinc-950 py-5 px-0 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-0 relative">
            <div className="flex items-center gap-4 overflow-x-auto no-scrollbar w-full py-1 pl-10 pr-4 lg:pl-10">
              <button 
                className="flex items-center gap-3 px-5 py-2.5 bg-lime-500 text-black text-[10px] font-black uppercase tracking-widest -skew-x-12 shadow-[4px_4px_0px_rgba(0,0,0,0.1)] hover:bg-lime-400 transition-all shrink-0 cursor-pointer"
                onClick={() => setActiveFilter('filters')}
              >
                 <span className="skew-x-12 flex items-center gap-1.5">
                   <SlidersHorizontal className="w-3.5 h-3.5" />
                   Filters
                 </span>
              </button>

              <div className="flex items-center gap-3">
                 {["Amenities", "Price Range"].map((filter) => (
                   <button 
                     key={filter} 
                     onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
                     className="flex items-center gap-2 px-5 py-2.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all group -skew-x-2 shrink-0 cursor-pointer"
                   >
                      <span className="skew-x-2 text-[10px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-400">{filter}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600 group-hover:text-lime-600 skew-x-2" />
                   </button>
                 ))}
              </div>
            </div>

            {/* Filter Modal (Auth Style) */}
            {activeFilter && (
              <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                {/* Backdrop */}
                <div 
                  className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
                  onClick={() => setActiveFilter(null)}
                ></div>

                {/* Modal Content */}
                <div className="relative w-full max-w-lg bg-zinc-950 border-2 border-zinc-800 flex flex-col overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                  
                  {/* Header */}
                  <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black uppercase italic tracking-tighter text-white">
                        {activeFilter} <span className="text-lime-500">Protocol</span>
                      </h3>
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Configure your search parameters</p>
                    </div>
                    <button 
                      onClick={() => setActiveFilter(null)}
                      className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white transition-colors cursor-pointer"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-8">
                    {activeFilter === 'Amenities' && (
                      <div className="grid grid-cols-2 gap-4">
                        {["Changing Room", "Parking", "Water", "Lights", "Canteens", "First Aid", "Shower", "Locker"].map(amenity => (
                          <button key={amenity} className="flex items-center gap-3 p-4 bg-zinc-900 border border-zinc-800 hover:border-lime-500 transition-all cursor-pointer group -skew-x-6 text-left">
                            <div className="w-2 h-2 bg-zinc-700 group-hover:bg-lime-500 transition-colors skew-x-6"></div>
                            <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white skew-x-6">{amenity}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {activeFilter === 'Price Range' && (
                      <div className="space-y-6">
                        <div className="p-6 bg-zinc-900 border-2 border-dashed border-zinc-800 text-center">
                          <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Current Selection</p>
                          <div className="inline-flex items-center gap-4 px-8 py-4 bg-lime-500 text-black text-xl font-black italic tracking-tighter -skew-x-12 shadow-[4px_4px_0px_#ffffff]">
                             <span className="skew-x-12">₹1000 - ₹5000</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                           {[1000, 2000, 3000, 4000, 5000].map(p => (
                             <button key={p} className="p-3 bg-zinc-950 border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white hover:border-lime-500 transition-all cursor-pointer">₹{p}</button>
                           ))}
                        </div>
                      </div>
                    )}

                    {activeFilter === 'filters' && (
                      <div className="space-y-8 py-4">
                         <div className="text-center p-12 bg-zinc-900 border-2 border-dashed border-zinc-800 -skew-x-2">
                            <SlidersHorizontal className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
                            <p className="text-sm font-black uppercase text-zinc-500 tracking-tighter italic">Multi-Parameter Search</p>
                            <p className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest mt-2">Extended filters are being calibrated.</p>
                         </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="p-6 border-t border-zinc-800 flex items-center justify-between bg-black/20">
                    <button 
                      onClick={() => setActiveFilter(null)}
                      className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors cursor-pointer"
                    >
                      Reset All
                    </button>
                    <button 
                      onClick={() => setActiveFilter(null)}
                      className="px-8 py-3 bg-lime-500 text-black text-[10px] font-black uppercase tracking-widest -skew-x-12 cursor-pointer hover:bg-lime-400 shadow-[4px_4px_0px_#ffffff] transition-all"
                    >
                      <span className="skew-x-12">Apply Search</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>



          {/* --- MAIN CONTENT --- */}
          <main className="flex-1">
             
             <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-4">
                 <div className="text-zinc-500 dark:text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-lime-500 rounded-full animate-pulse"></span>
                    Showing <span className="text-black dark:text-white">{filteredTurfs.length} Premium</span> Turfs Near You
                 </div>
                 
                 <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black dark:text-white transition-all bg-zinc-100 dark:bg-zinc-900 hover:bg-lime-500 hover:text-black px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-sm">
                    Sort by: <span className="italic">Recommended</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                 </button>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {filteredTurfs.map((turf) => (
                   <TurfCard key={turf.id} turf={turf} />
                 ))}
              </div>

              {/* Load More */}
              <div className="mt-16 flex justify-center mb-24">
                 <button className="px-10 py-4 bg-transparent border-2 border-zinc-200 dark:border-zinc-800 text-black dark:text-white font-black uppercase tracking-widest text-sm hover:border-black dark:hover:border-lime-500 hover:text-lime-600 dark:hover:text-lime-400 transition-all -skew-x-12 flex items-center gap-3 group">
                    <span className="skew-x-12 flex items-center gap-2">
                       Show more results
                       <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                    </span>
                 </button>
              </div>

              {/* --- PARTNER SECTION --- */}
              <section className="mt-20">
                <div className="relative overflow-hidden p-8 md:p-16 text-center bg-lime-500 border-4 border-black shadow-[16px_16px_0px_rgba(0,0,0,0.05)] -skew-x-2">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

                  <div className="relative z-10 skew-x-2">
                    <div className="text-5xl mb-6 inline-block bg-black border-2 border-black rounded-full p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">🏟️</div>
                    <h2 className="text-3xl md:text-5xl font-black text-black mb-6 leading-tight uppercase italic tracking-tighter">
                      Own a Premium Turf? <br className="md:hidden"/> <span className="text-white drop-shadow-md">Partner With TurfBox.</span>
                    </h2>
                    <p className="text-black/80 text-base mb-10 max-w-lg mx-auto font-bold tracking-wide">
                      Join 500+ venue owners who have revolutionized their booking management and revenue with us.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                      <Link
                        href="/register-turf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-black uppercase tracking-widest text-sm hover:bg-zinc-900 transition-all -skew-x-12 cursor-pointer shadow-[4px_4px_0px_#ffffff] hover:shadow-[2px_2px_0px_#ffffff]"
                      >
                        <span className="skew-x-12 flex items-center gap-2">
                          Register Turf
                          <ArrowRight className="w-5 h-5 stroke-[3px]" />
                        </span>
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-zinc-100 transition-all -skew-x-12 cursor-pointer border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.5)]"
                      >
                        <span className="skew-x-12 flex items-center gap-2">
                          Learn More
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>

          </main>
        </div>
      </div>

    </div>
  );
}
