"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Calendar, MapPin, Clock, ArrowRight, MoreHorizontal, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Mock Booking Data
const BOOKINGS = [
  {
    id: 101,
    status: 'upcoming',
    sport: 'Football',
    venue: 'Old Trafford Turf',
    city: 'Manchester',
    date: 'Today, Feb 1st',
    time: '7:00 PM - 8:00 PM',
    slots: 2,
    price: 400,
    image: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=2070&auto=format&fit=crop',
    bookingId: 'TB-8823-XYZ'
  },
  {
    id: 102,
    status: 'completed',
    sport: 'Cricket',
    venue: 'Oval Box Cricket',
    city: 'Kensington',
    date: 'Jan 28th, 2026',
    time: '6:00 PM - 7:00 PM',
    slots: 1,
    price: 100,
    image: 'https://images.unsplash.com/photo-1624880357913-a8539238245b?q=80&w=2070&auto=format&fit=crop',
    bookingId: 'TB-7741-ABC'
  },
  {
    id: 103,
    status: 'cancelled',
    sport: 'Football',
    venue: 'Anfield Arena',
    city: 'Liverpool',
    date: 'Jan 15th, 2026',
    time: '10:00 PM - 11:00 PM',
    slots: 4,
    price: 720,
    image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=2071&auto=format&fit=crop',
    bookingId: 'TB-1122-OOP'
  }
];

export default function MyBookingsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');

  const filteredBookings = BOOKINGS.filter(b => b.status === activeTab);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
         
         <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-foreground flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                    <Calendar className="w-8 h-8 text-primary" />
                </div>
                My Bookings
            </h1>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Need Help?
            </button>
         </div>

         {/* Tabs */}
         <div className="flex gap-2 p-1 bg-secondary/50 rounded-xl mb-8 w-full md:w-auto inline-flex overflow-x-auto">
            {['upcoming', 'completed', 'cancelled'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold capitalize transition-all whitespace-nowrap
                        ${activeTab === tab 
                            ? 'bg-white dark:bg-black text-foreground shadow-sm' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-black/50'
                        }`}
                >
                    {tab}
                </button>
            ))}
         </div>

         {/* List */}
         <div className="space-y-4">
            {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => (
                    <div key={booking.id} className="group bg-card border border-border rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-all animate-in slide-in-from-bottom-2 duration-300">
                        {/* Image */}
                        <div className="w-full md:w-48 aspect-video md:aspect-[4/3] relative rounded-xl overflow-hidden shrink-0">
                            <Image 
                                src={booking.image} 
                                alt={booking.venue}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                                {booking.sport}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-lg text-foreground truncate pr-4">{booking.venue}</h3>
                                    {booking.status === 'upcoming' && <span className="px-2 py-0.5 bg-blue-500/10 text-blue-600 text-[10px] font-bold uppercase rounded-md border border-blue-500/20">Confirmed</span>}
                                    {booking.status === 'cancelled' && <span className="px-2 py-0.5 bg-red-500/10 text-red-600 text-[10px] font-bold uppercase rounded-md border border-red-500/20">Cancelled</span>}
                                    {booking.status === 'completed' && <span className="px-2 py-0.5 bg-green-500/10 text-green-600 text-[10px] font-bold uppercase rounded-md border border-green-500/20">Done</span>}
                                </div>
                                
                                <p className="text-muted-foreground text-sm flex items-center gap-1.5 mb-4">
                                    <MapPin className="w-3.5 h-3.5" />
                                    {booking.city}
                                </p>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="bg-secondary/30 p-2 rounded-lg">
                                        <p className="text-[10px] text-muted-foreground font-bold uppercase mb-0.5">Date & Time</p>
                                        <p className="font-semibold">{booking.date}</p>
                                        <p className="text-xs text-muted-foreground">{booking.time}</p>
                                    </div>
                                    <div className="bg-secondary/30 p-2 rounded-lg">
                                        <p className="text-[10px] text-muted-foreground font-bold uppercase mb-0.5">Booking Details</p>
                                        <p className="font-semibold">{booking.slots} Slots</p>
                                        <p className="text-xs text-muted-foreground">ID: {booking.bookingId}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions (Right Side) */}
                        <div className="md:border-l md:border-border md:pl-6 flex flex-row md:flex-col justify-between md:justify-center gap-3 shrink-0">
                             <div className="text-right md:text-center md:mb-auto">
                                <p className="text-xs text-muted-foreground">Total Paid</p>
                                <p className="text-xl font-extrabold text-foreground">₹{booking.price}</p>
                             </div>

                             {booking.status === 'upcoming' && (
                                 <button className="w-full md:w-auto px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-bold text-sm rounded-lg hover:opacity-90 transition-all">
                                    View Ticket
                                 </button>
                             )}
                             {booking.status === 'completed' && (
                                 <button className="w-full md:w-auto px-4 py-2 border border-border bg-white dark:bg-zinc-900 text-foreground font-bold text-sm rounded-lg hover:bg-secondary transition-all">
                                    Re-Book
                                 </button>
                             )}
                             
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-20 bg-secondary/20 rounded-3xl border border-dashed border-border">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">No bookings found</h3>
                    <p className="text-muted-foreground text-sm mb-6 max-w-xs mx-auto">
                        You don't have any {activeTab} bookings. Ready to play?
                    </p>
                    <Link href="/quick-join" className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 inline-flex items-center gap-2">
                        Random Join <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            )}
         </div>

      </main>
    </div>
  );
}
