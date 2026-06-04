import { notFound } from "next/navigation";
import Image from "next/image";
import { 
  MapPin, 
  Star, 
  Share2, 
  Heart, 
  Shield, 
  Award, 
  Navigation, 
  Image as ImageIcon,
  CheckCircle2,
  ChevronLeft,
  Info
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SlotPicker from "@/components/SlotPicker";
import { getTurfById } from "@/lib/data";

export default async function TurfPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const turf = getTurfById(id);

  if (!turf) return notFound();

  // Mock distance and reviews if not present in basic mock
  const distance = "1.2 km";
  const reviewsCount = 1240;

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-lime-500/30 pb-20">
      <Navbar />

      <main className="container mx-auto px-4 pt-[130px] md:pt-[150px] max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12">
           
           {/* LEFT CONTENT BLOCK */}
           <div className="lg:col-span-8">
              
              {/* TOP HEADER SECTION */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                 <div className="flex-1">
                    <h1 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">
                       {turf.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-zinc-400 uppercase tracking-widest">
                       <div className="flex items-center gap-1.5 text-lime-400">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-white">{turf.rating}</span>
                          <span className="underline decoration-zinc-700 underline-offset-4 cursor-pointer hover:text-white transition-colors">
                            {reviewsCount} reviews
                          </span>
                       </div>
                       <span>•</span>
                       <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {turf.location}
                       </div>
                       <span>•</span>
                       <div className="flex items-center gap-1.5 text-lime-500">
                          <Award className="w-4 h-4" />
                          Elite Rated Arena
                       </div>
                    </div>
                 </div>

                 {/* Actions */}
                 <div className="flex items-center gap-4 shrink-0">
                   <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors font-bold text-sm uppercase tracking-widest border border-zinc-800">
                      <Heart className="w-4 h-4" />
                      Add to wishlist
                   </button>
                   <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors font-bold text-sm uppercase tracking-widest border border-zinc-800">
                      <Share2 className="w-4 h-4" />
                      Share
                   </button>
                 </div>
              </div>

              {/* IMAGE COLLAGE SECTION */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[400px] md:h-[500px] mb-12 rounded-2xl overflow-hidden">
                 {/* Main Image */}
                 <div className="h-full relative cursor-pointer group bg-zinc-900 border border-zinc-800">
                    <Image src={turf.images[0] || turf.image} alt={turf.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                 </div>
                 
                 {/* Right 2 Images Grid */}
                 <div className="hidden md:grid grid-rows-2 gap-2 h-full">
                    <div className="relative w-full h-full cursor-pointer group bg-zinc-900 border border-zinc-800">
                       <Image src={turf.images[1] || turf.image} alt="Gallery 1" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="relative w-full h-full cursor-pointer group bg-zinc-900 border border-zinc-800">
                       <Image src={turf.images[2] || turf.image} alt="Gallery 2" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                       <button className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-zinc-200 transition-colors shadow-lg z-10">
                          <ImageIcon className="w-4 h-4" />
                          View all
                       </button>
                    </div>
                 </div>
              </div>

              {/* Main Content Details */}
              <div className="space-y-12 mb-12 lg:mb-0">
                 <section>
                    <h2 className="text-2xl font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                       <Info className="w-6 h-6 text-lime-500" />
                       About this turf
                    </h2>
                    <p className="text-zinc-400 text-lg leading-relaxed font-medium">
                       {turf.description} Experience professional-grade facilities with internationally certified turf quality.
                       Perfect for local tournaments, weekend friendlies, or team building events.
                    </p>
                 </section>

                 <div className="h-px bg-zinc-800 w-full"></div>

                 {/* Amenities Grid */}
                 <section>
                    <h2 className="text-2xl font-black uppercase tracking-widest mb-8 flex items-center gap-3">
                       <Award className="w-6 h-6 text-lime-500" />
                       Venue Benefits
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                       {turf.amenities.map(item => (
                         <div key={item} className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-4 rounded-xl hover:border-lime-500 transition-colors">
                           <Shield className="w-5 h-5 text-lime-400 shrink-0" />
                           <span className="text-zinc-200 font-bold text-base">{item}</span>
                         </div>
                       ))}
                    </div>
                 </section>
              </div>
           </div>
           
           {/* RIGHT BOOKING WIDGET */}
           <div className="lg:col-span-4 relative">
              <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl">
                 <div className="inline-block bg-red-500 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest mb-6 shadow-sm">
                    Likely to sell out
                 </div>
                 
                 <div className="mb-6 flex flex-col gap-1">
                    <span className="text-zinc-400 font-bold text-sm uppercase tracking-widest">From <span className="line-through opacity-50 ml-1">₹{Math.round(Number(turf.priceRaw || turf.price) * 1.2)}</span></span>
                    <div className="flex items-baseline gap-2">
                       <span className="text-3xl font-black italic tracking-tighter text-white">₹{turf.priceRaw || turf.price}</span>
                       <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">per hour</span>
                    </div>
                 </div>

                 {/* The SlotPicker controls */}
                 <div className="mb-6">
                    <SlotPicker 
                      turfId={turf.id}
                      turfName={turf.name}
                      courts={turf.courts}
                    />
                 </div>

                 <div className="space-y-4 mt-6 pt-6 border-t border-zinc-800/50">
                    <div className="flex items-start gap-3">
                       <CheckCircle2 className="w-5 h-5 text-lime-500 shrink-0" />
                       <div>
                          <p className="font-bold text-sm text-zinc-200">Free cancellation</p>
                          <p className="text-xs text-zinc-500 mt-1">Cancel up to 24 hours in advance for a full refund</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-3">
                       <CheckCircle2 className="w-5 h-5 text-lime-500 shrink-0" />
                       <div>
                          <p className="font-bold text-sm text-zinc-200">Reserve now & pay later</p>
                          <p className="text-xs text-zinc-500 mt-1">Keep your plans flexible — book your spot now</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </main>
    </div>
  );
}

