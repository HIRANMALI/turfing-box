"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Star,
  MapPin,
  Heart,
  Navigation
} from "lucide-react";

export interface TurfCardProps {
  turf: {
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
  };
}

export default function TurfCard({ turf }: TurfCardProps) {
  return (
    <Link 
      href={`/turf/${turf.id}`} 
      className="group relative bg-zinc-900 border-2 border-zinc-800 overflow-hidden flex flex-col h-full rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,0.5)]"
    >
      
      {/* Image Section */}
      <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0">
         <Image 
            src={turf.image} 
            alt={turf.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
         />
         
         {/* Top Badges */}
         <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {(turf.badges || []).map(badge => (
               <span 
                  key={badge} 
                  className="text-[10px] font-black px-2.5 py-1 bg-lime-500 text-black uppercase tracking-widest shadow-[2px_2px_0px_rgba(0,0,0,0.5)] rounded-sm"
               >
                  <span className="block">{badge}</span>
               </span>
            ))}
         </div>

         {/* Like Button - Prevent Link Click */}
         <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-2 right-2 p-1.5 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-lime-500 hover:text-black transition-all border border-zinc-700 z-10"
         >
            <Heart className="w-3.5 h-3.5" />
         </button>
      </div>

      {/* Content Section */}
      <div className="p-3 flex flex-col flex-1">
         <div className="flex-1 flex flex-col gap-1.5">
            <h3 className="text-white font-black text-sm leading-tight uppercase italic tracking-tighter mb-1.5 line-clamp-1">
               {turf.title}
            </h3>
            
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
               <MapPin className="w-3 h-3 text-lime-500 shrink-0" />
               <span className="truncate">
                  {turf.distance} | {turf.location}
               </span>
            </div>



         </div>

         <div className="mt-3 pt-2 border-t border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <div className="flex items-center gap-1 px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded-sm">
                  <Star className="w-3 h-3 text-lime-400 fill-lime-400" />
                  <span className="text-white font-black text-[10px] italic">{turf.rating}</span>
               </div>
               <span className="text-[9px] text-zinc-500 font-extrabold uppercase tracking-widest">({turf.reviews})</span>
            </div>
            <div className="flex flex-col items-end">
               <div className="flex items-baseline gap-1">
                  <span className="text-lg font-black text-white italic tracking-tighter">
                     ₹{turf.price}
                  </span>
                  <span className="text-[9px] font-black text-zinc-500 uppercase">/hr</span>
               </div>
            </div>
         </div>
      </div>
    </Link>
  );
}
