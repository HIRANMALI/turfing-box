
import Image from "next/image";
import { Search, Calendar, MapPin } from "lucide-react";
import DemoNavbar from "@/components/DemoNavbar";
import TurfCard from "@/components/TurfCard";
import { PREMIUM_TURFS } from "@/data/mock-turfs";

export default function DemoPage() {
  return (
    <main className="min-h-screen pb-20 bg-background text-foreground transition-colors duration-300">
      <DemoNavbar />

      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background */}

        {/* Hero Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=2070&auto=format&fit=crop"
            alt="Turf Background"
            fill
            className="object-cover opacity-20 dark:opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center justify-center h-full pb-20">
          <h1 className="text-5xl md:text-6xl font-[800] tracking-tight mb-8 text-white drop-shadow-lg shadow-black/20">
            Discover & book your perfect arena
          </h1>

          {/* Search Bar - GYG Style */}
          <div className="w-full max-w-2xl bg-white rounded-full p-2 pl-6 flex items-center shadow-2xl shadow-black/20 transform transition-transform hover:scale-[1.01]">
             <div className="flex-1 flex items-center gap-3 text-muted-foreground">
                <Search className="w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Where do you want to play?" 
                  className="w-full bg-transparent border-none p-0 text-gray-900 placeholder:text-gray-500 font-medium focus:ring-0 focus:outline-none text-base truncate"
                />
             </div>
             
             <button className="bg-black text-white dark:bg-black dark:text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wide hover:opacity-90 transition-opacity">
                Search
             </button>
          </div>
        </div>
      </section>

      {/* Featured Turfs - Overlapping Card Section */}
      <section className="container mx-auto px-6 -mt-32 relative z-20">
        
        <div className="mb-6">
           <h2 className="text-2xl font-bold text-white drop-shadow-md mb-1">Popular Arenas</h2>
           <p className="text-white/90 text-sm font-medium drop-shadow-md">Top rated near you</p>
        </div>
          <button className="text-primary hover:text-primary/80 transition-colors text-sm font-medium">
             View All
          </button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {PREMIUM_TURFS.map((turf) => (
            <TurfCard key={turf.id} turf={turf} />
          ))}
        </div>
      </section>
    </main>
  );
}
