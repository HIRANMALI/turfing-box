import Link from "next/link";
import Image from "next/image";
import { 
  Star,
  MapPin,
  Heart,
  Clock,
  ArrowRight,
  Navigation,
  ChevronRight
} from "lucide-react";

export interface QuickJoinCardProps {
  game: {
    id: number;
    sport: string;
    venue: string;
    image: string;
    badges: string[];
    rating: number;
    reviews: number;
    distance: string;
    time: string;
    slots: number;
    totalSlots: number;
    price: number;
  };
}

export default function QuickJoinCard({ game }: QuickJoinCardProps) {
  return (
    <Link 
      href={`/quick-join/${game.id}`} 
      className="group relative bg-zinc-900 border-2 border-zinc-800 overflow-hidden flex flex-col h-full rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,0.5)]"
    >
      
      {/* Image Section */}
      <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0">
         <Image 
            src={game.image} 
            alt={game.venue}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
         />
         
         {/* Top Badges */}
         <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {game.badges.map(badge => (
               <div key={badge} className="relative group/badge">
                  <div className="absolute inset-0 bg-lime-500 opacity-20 animate-pulse rounded-md"></div>
                  <span className="relative block text-[9px] font-black px-2.5 py-1 bg-lime-500 text-black uppercase tracking-widest rounded-sm">
                    {badge}
                  </span>
               </div>
            ))}
         </div>

         {/* Like Button */}
         <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-md text-white hover:bg-lime-500 hover:text-black transition-all border border-white/10 z-10 rounded-full"
         >
            <Heart className="w-3.5 h-3.5" />
         </button>

         {/* Matchmaking Marker */}
         <div className="absolute bottom-0 right-0 bg-black text-white px-2.5 py-1 font-black text-[7px] uppercase tracking-[0.2em] flex items-center gap-1.5 rounded-tl-sm">
            <div className="w-1 h-1 bg-lime-500 rounded-full animate-ping"></div>
            Matchmaking
         </div>
      </div>

      {/* Content Section */}
      <div className="p-3.5 flex flex-col flex-1">
         <div className="flex-1 flex flex-col">
            <h3 className="text-white font-black text-sm leading-tight uppercase italic tracking-tighter mb-1.5 line-clamp-1">
               {game.venue}
            </h3>
            
            <div className="flex items-center gap-1.5 text-[9.5px] text-zinc-400 font-extrabold uppercase tracking-widest mb-3">
               <MapPin className="w-3 h-3 text-lime-500 shrink-0" />
               <span className="truncate">
                  {game.distance} | {game.sport}
               </span>
            </div>

            {/* Quick Match Details */}
            <div className="flex items-center gap-3 bg-zinc-800/50 p-2 border border-zinc-800/80 rounded-sm mb-1">
               <div className="flex-1 flex items-center gap-2">
                  <Clock className="w-3 h-3 text-lime-500" />
                  <div>
                    <p className="text-[7px] font-black uppercase text-zinc-500 tracking-widest leading-none">Kick-Off</p>
                    <p className="text-[10px] font-black uppercase text-white mt-0.5">{game.time}</p>
                  </div>
               </div>
               <div className="w-[1px] h-5 bg-zinc-800"></div>
               <div className="text-right px-1">
                  <p className="text-[7px] font-black uppercase text-zinc-500 tracking-widest leading-none mb-0.5">Spots Left</p>
                  <p className="text-[10px] font-black uppercase text-lime-500 italic">{game.slots}/{game.totalSlots}</p>
               </div>
            </div>
         </div>

         {/* Footer */}
         <div className="mt-3 pt-2 border-t border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <div className="flex items-center gap-1 px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded-sm">
                  <Star className="w-3 h-3 text-lime-400 fill-lime-400" />
                  <span className="text-white font-black text-[10px] italic">{game.rating}</span>
               </div>
               <span className="text-[9px] text-zinc-500 font-extrabold uppercase tracking-widest">({game.reviews})</span>
            </div>
            
            <div className="flex items-baseline gap-1">
               <span className="text-lg font-black text-white italic tracking-tighter">
                  ₹{game.price}
               </span>
               <span className="text-[9px] font-black text-zinc-500 uppercase">/join</span>
            </div>
         </div>
      </div>
    </Link>
  );
}
