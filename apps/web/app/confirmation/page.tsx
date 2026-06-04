import Link from "next/link";
import { Check, Calendar, MapPin, Download, Home } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ConfirmationPage() {
  const mockBookingId = `#TB-${Math.floor(Math.random() * 1000000)}`;
  const date = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen pb-20 pt-32">
      <Navbar />
      
      <div className="container mx-auto px-6 max-w-lg">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/20 animate-in zoom-in duration-500">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Booking Confirmed!</h1>
          <p className="text-zinc-400">Your turf is ready. See you on the field.</p>
        </div>

        <div className="glass-card rounded-3xl overflow-hidden mb-8">
           <div className="bg-[var(--color-primary)] p-6 text-center">
              <span className="text-black/60 font-medium text-sm tracking-widest uppercase">Booking ID</span>
              <h2 className="text-3xl font-mono font-bold text-black mt-1">{mockBookingId}</h2>
           </div>
           
           <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                 <div>
                    <h3 className="text-white font-bold text-lg">Urban Kicks Arena</h3>
                    <div className="flex items-center gap-1 text-zinc-400 text-sm mt-1">
                       <MapPin className="w-4 h-4" />
                       Downtown, Metro City
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-zinc-400 text-sm">Status</p>
                    <span className="text-green-400 font-medium">Paid</span>
                 </div>
              </div>

              <div className="border-t border-dashed border-zinc-700 pt-6">
                 <div className="flex justify-between mb-2">
                    <span className="text-zinc-400">Date</span>
                    <span className="text-white font-medium">{date}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-zinc-400">Time</span>
                    <div className="text-right">
                      <span className="text-white font-medium block">06:00 PM</span>
                      <span className="text-white font-medium block">07:00 PM</span>
                    </div>
                 </div>
              </div>
              
              <div className="bg-zinc-900/50 rounded-xl p-4 flex items-center justify-between">
                 <span className="text-zinc-400">Total Paid</span>
                 <span className="text-xl font-bold text-[var(--color-primary)]">₹1,220</span>
              </div>
           </div>
           
           {/* Perforated bottom effect */}
           <div className="relative h-6 bg-[#0a0a0a]">
              <div className="absolute top-0 left-0 w-full h-3 bg-zinc-800 rounded-b-xl"></div>
           </div>
        </div>

        <div className="flex flex-col gap-3">
           <button className="btn-primary w-full flex items-center justify-center gap-2">
             <Download className="w-5 h-5" />
             Download Ticket
           </button>
           <Link href="/" className="w-full py-4 text-center text-zinc-400 hover:text-white transition-colors flex items-center justify-center gap-2">
             <Home className="w-4 h-4" />
             Back to Home
           </Link>
        </div>

      </div>
    </div>
  );
}
