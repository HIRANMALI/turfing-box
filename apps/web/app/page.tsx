"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  Star,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  Users,
  Zap,
  Shield,
  Trophy,
  Play,
  Sparkles,
  Quote,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SPORTS = [
  { id: "football", label: "⚽ Football", color: "bg-green-50 border-green-200 text-green-700 hover:bg-green-100" },
  { id: "cricket", label: "🏏 Cricket", color: "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" },
  { id: "badminton", label: "🏸 Badminton", color: "bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100" },
  { id: "basketball", label: "🏀 Basketball", color: "bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100" },
  { id: "tennis", label: "🎾 Tennis", color: "bg-lime-50 border-lime-200 text-lime-700 hover:bg-lime-100" },
  { id: "volleyball", label: "🏐 Volleyball", color: "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100" },
];



const TESTIMONIALS = [
  {
    name: "Arjun Mehta",
    sport: "Cricket",
    text: "Finding a high-quality cricket turf used to take hours. With TurfBox, it happens in seconds. The pitch bounce is perfect and the night lighting is world-class!",
    rating: 5,
    avatar: "AM",
    avatarColor: "bg-blue-100 text-blue-600",
    themeColor: "group-hover:border-blue-400/50",
    badgeColor: "bg-blue-50 text-blue-600 border-blue-100",
    starColor: "text-blue-500",
    cardBg: "bg-blue-50/30",
  },
  {
    name: "Riya Sharma",
    sport: "Football",
    text: "The artificial turf quality here is top-notch—feels just like natural grass. Booking is seamless, and I love seeing the amenities before I arrive!",
    rating: 5,
    avatar: "RS",
    avatarColor: "bg-emerald-100 text-emerald-600",
    themeColor: "group-hover:border-emerald-400/50",
    badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    starColor: "text-emerald-500",
    cardBg: "bg-emerald-50/30",
  },
  {
    name: "Vikram Singh",
    sport: "Badminton",
    text: "Best indoor courts I've found. The flooring is professional grade and booking through TurfBox ensures we never face double-bookings or delays.",
    rating: 5,
    avatar: "VS",
    avatarColor: "bg-amber-100 text-amber-600",
    themeColor: "group-hover:border-amber-400/50",
    badgeColor: "bg-amber-50 text-amber-600 border-amber-100",
    starColor: "text-amber-500",
    cardBg: "bg-amber-50/30",
  },
  {
    name: "Priya Das",
    sport: "Basketball",
    text: "Finally, a reliable way to find pro-level basketball courts. The ratings are honest and have helped us pick the best venues every single weekend!",
    rating: 5,
    avatar: "PD",
    avatarColor: "bg-orange-100 text-orange-600",
    themeColor: "group-hover:border-orange-400/50",
    badgeColor: "bg-orange-50 text-orange-600 border-orange-100",
    starColor: "text-orange-500",
    cardBg: "bg-orange-50/30",
  },
];

const MEMORIES_IMAGES = [
  "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518605368461-1ee720df5412?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1624880357913-a8539238165b?q=80&w=800&auto=format&fit=crop",
];

export default function HomePage() {
  const [searchLocation, setSearchLocation] = useState("");
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans overflow-x-hidden">
      <Navbar />

      {/* ======================== HERO SECTION ======================== */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Dynamic Sports Background */}
        <div className="absolute inset-0 z-0 bg-zinc-950">
          <Image
            src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2600&auto=format&fit=crop"
            alt="Premium sports stadium background"
            fill
            className="object-cover opacity-60 mix-blend-luminosity scale-105 animate-[pulse_10s_ease-in-out_infinite]"
            priority
          />
          {/* Subtle mesh pattern overlay for athletic feel */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
          {/* Gradients to transition smoothly */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-zinc-950/80"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-lime-500 text-black text-xs font-black uppercase tracking-widest mb-8 shadow-[4px_4px_0px_#ffffff] -skew-x-12 transform hover:scale-105 transition-transform cursor-default">
            <span className="skew-x-12 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 fill-current" />
              Game On, Anywhere
            </span>
          </div>

          {/* Heading - MANDATORY TO KEEP "No Calls. Just Play." */}
          <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-6 uppercase italic drop-shadow-2xl">
            No Calls.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-lime-600 block mt-2">
              Just Play.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-12 font-medium tracking-wide">
            Book premium football, cricket, and pickle-ball courts instantly. Elevate your athletic experience.
          </p>

          {/* Sporty High-Conversion Search Widget */}
          <div className="w-full max-w-2xl mx-auto bg-zinc-900/80 backdrop-blur-xl p-3 border-2 border-zinc-800 flex flex-col md:flex-row gap-3 shadow-2xl skew-x-[-2deg]">
            
            {/* Sport Select (Visual) */}
            <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-zinc-800/80 border border-zinc-700 transition-colors focus-within:border-lime-500">
              <MapPin className="w-5 h-5 text-lime-400 flex-shrink-0 skew-x-[2deg]" />
              <input
                type="text"
                placeholder="Enter City name"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full bg-transparent outline-none text-white placeholder-zinc-500 font-bold skew-x-[2deg] placeholder:font-medium uppercase tracking-wide"
              />
            </div>

            {/* MANDATORY BLACK BUTTON */}
            <Link
              href="/turfs"
              className="flex items-center justify-center gap-2 px-8 py-3.5 font-black uppercase text-white tracking-widest transition-all hover:bg-zinc-800 active:scale-95 border border-zinc-700 shadow-[4px_4px_0px_#a3e635] hover:shadow-[2px_2px_0px_#a3e635] hover:translate-x-[2px] hover:translate-y-[2px]"
              style={{ backgroundColor: "#000000" }}
            >
              <div className="skew-x-[2deg] flex items-center gap-2">
                <Search className="w-5 h-5" />
                Find Turfs
              </div>
            </Link>
          </div>

          {/* Quick Tags (Jersey style) */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs text-zinc-500 font-black uppercase tracking-widest mr-2">Top Sports:</span>
            {SPORTS.slice(0, 4).map((sport, i) => (
              <Link
                key={sport.id}
                href="/turfs"
                className="px-5 py-2 border-2 border-zinc-800 bg-zinc-900 text-zinc-300 font-black text-xs uppercase tracking-wider transition-all hover:border-lime-500 hover:text-lime-400 -skew-x-12"
              >
                <div className="skew-x-12 flex items-center gap-2">
                  <span className="text-lime-500/50">0{i+1}</span>
                  {sport.label.replace(/[^a-zA-Z]/g, '').trim()}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== MEMORIES & SOCIAL PROOF ======================== */}
      <section className="py-24 bg-white overflow-hidden relative border-y-4 border-zinc-100">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        <div className="container mx-auto px-4 relative z-10 mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-lime-500 border-2 border-black text-black text-xs font-black uppercase tracking-widest mb-5 -skew-x-12 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <span className="skew-x-12 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Social & Memories
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-black mb-4 leading-tight tracking-tighter italic uppercase">
            More Than Just A Game. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-lime-700">It&apos;s A Vibe.</span>
          </h2>
          <p className="text-zinc-600 text-lg max-w-2xl mx-auto font-medium">
            Join thousands of passionate players creating unforgettable memories, building networks, and celebrating the spirit of sports together on the finest turfs.
          </p>
        </div>

        {/* Continuous Slow Slider */}
        <div className="relative w-full overflow-hidden flex -skew-y-2 pb-8">
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes slide {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-slider {
              animation: slide 80s linear infinite;
              display: flex;
              width: max-content;
            }
          `}} />
          <div className="animate-slider gap-6 px-3">
            {[...MEMORIES_IMAGES, ...MEMORIES_IMAGES].map((src, idx) => (
              <div key={idx} className="relative w-72 h-80 md:w-96 md:h-96 flex-shrink-0 border-4 border-black rounded-sm overflow-hidden shadow-[8px_8px_0px_#a3e635] transform hover:scale-105 transition-transform duration-500 hover:border-lime-500 hover:z-10 bg-zinc-100">
                <Image
                  src={src}
                  alt="Players enjoying turf"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== FEATURES ======================== */}
      <section className="py-28 px-4 bg-zinc-100 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-mamba.png')] opacity-[0.03]"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-black border-2 border-black text-lime-400 text-xs font-black uppercase tracking-widest mb-6 -skew-x-12 shadow-[4px_4px_0px_#a3e635]">
                <span className="skew-x-12 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" />
                  Why TurfBox
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-black uppercase italic tracking-tighter leading-tight mb-6">
                The Smarter <span className="text-lime-600">Way to Play</span>
              </h2>
              <p className="text-zinc-600 text-lg mb-10 leading-relaxed font-bold">
                We&apos;ve eliminated every friction point in booking a sports ground — so you focus on the game, not the admin.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: Zap,
                    title: "Instant Confirmation",
                    desc: "No waiting for calls or approvals. Real-time bookings.",
                  },
                  {
                    icon: Shield,
                    title: "Secure Payments",
                    desc: "Pay online with full protection & auto-refunds.",
                  },
                  {
                    icon: Star,
                    title: "Verified Venues",
                    desc: "Rated by real players. Only the best make it.",
                  },
                  {
                    icon: Users,
                    title: "Random Join Mode",
                    desc: "Join open sessions and meet new athletes.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-5 group">
                    <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center flex-shrink-0 -skew-x-12 group-hover:bg-lime-400 transition-colors shadow-[4px_4px_0px_#a3e635]">
                      <Icon className="w-6 h-6 text-black skew-x-12" />
                    </div>
                    <div>
                      <h4 className="font-black text-black uppercase tracking-wide mb-1 text-lg group-hover:text-lime-600 transition-colors">{title}</h4>
                      <p className="text-zinc-500 text-sm font-bold leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image Collage (SPORTY AESTHETIC) */}
            <div className="relative h-[520px]">
              <div className="absolute top-0 left-0 w-[65%] h-[55%] border-4 border-zinc-900 shadow-[8px_8px_0px_#a3e635] z-10 transition-transform hover:scale-105 duration-300">
                <Image
                  src="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&q=80"
                  alt="Football turf"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="absolute bottom-0 left-[10%] w-[50%] h-[48%] border-4 border-zinc-900 shadow-[8px_8px_0px_rgba(255,255,255,0.1)] z-20 transition-transform hover:scale-105 duration-300">
                <Image
                  src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80"
                  alt="Badminton court"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="absolute top-[15%] right-0 w-[40%] h-[70%] border-4 border-zinc-900 shadow-[8px_8px_0px_rgba(255,255,255,0.1)] z-0 transition-transform hover:scale-105 duration-300">
                <Image
                  src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80"
                  alt="Basketball court"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute bottom-[20%] right-[10%] bg-black border-2 border-lime-500 shadow-[4px_4px_0px_#a3e635] p-4 w-40 text-center animate-[bounce_5s_infinite] z-30 -skew-x-6">
                <div className="skew-x-6">
                  <p className="text-3xl font-black italic text-lime-400">100k+</p>
                  <p className="text-xs text-white font-black uppercase tracking-widest mt-1">Bookings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== TESTIMONIALS ======================== */}
      <section className="relative py-28 px-4 bg-white border-y-4 border-zinc-100 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-lime-500 border-2 border-black text-black text-xs font-black uppercase tracking-widest mb-5 -skew-x-12 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <span className="skew-x-12 flex items-center gap-2">
                <Star className="w-3.5 h-3.5" />
                Player Reviews
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-black mb-6 leading-tight uppercase italic tracking-tighter drop-shadow-lg">
              Trusted by <span className="text-lime-600">100k+</span> Active Players
            </h2>
            <p className="text-zinc-600 text-lg md:text-xl max-w-2xl mx-auto font-bold tracking-wide">
              Join the community of athletes who have upgraded their game experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
            {TESTIMONIALS.map(({ name, sport, text, avatar, rating }, idx) => (
              <div 
                key={name} 
                className={`group relative p-8 bg-zinc-100 border-2 border-black shadow-[6px_6px_0px_#a3e635] transition-all duration-300 hover:border-lime-500 hover:shadow-[6px_6px_0px_#000000] hover:-translate-y-1 rounded-sm ${idx % 2 === 0 ? 'lg:translate-y-6' : ''}`}
              >
                {/* Large Background Quote Icon */}
                <Quote className="absolute top-6 right-8 w-16 h-16 text-zinc-300 transition-all duration-500 group-hover:text-lime-500/20 select-none" />
                
                <div className="relative z-10">
                  <div className={`flex gap-1 mb-6 text-lime-500`}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <p className="text-lg text-zinc-700 font-semibold leading-relaxed mb-8 italic">
                    &ldquo;{text}&rdquo;
                  </p>

                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 bg-zinc-200 border-2 border-black flex items-center justify-center font-black text-xl text-black shadow-[2px_2px_0px_#a3e635] rounded-full`}>
                      <span>{avatar}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-black text-black text-lg uppercase tracking-wider">{name}</h4>
                        <div className={`flex items-center gap-1 px-1.5 py-0.5 bg-lime-500 text-black text-[10px] font-black uppercase tracking-widest rounded-sm`}>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-black" />
                            VERIFIED
                          </span>
                        </div>
                      </div>
                      <p className="text-zinc-600 font-bold text-xs uppercase tracking-widest">{sport} Fan</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== FINAL CTA ======================== */}
      <section className="py-32 px-4 bg-zinc-950">
        <div className="container mx-auto max-w-5xl">
          <div
            className="relative overflow-hidden p-10 md:p-16 text-center bg-lime-500 border-4 border-black shadow-[16px_16px_0px_rgba(255,255,255,0.1)] -skew-x-2"
          >
            {/* Decorative background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

            <div className="relative z-10 skew-x-2">
              <div className="text-5xl mb-6 inline-block bg-black border-2 border-black rounded-full p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">🏟️</div>
              <h2 className="text-4xl md:text-6xl font-black text-black mb-6 leading-tight uppercase italic tracking-tighter">
                Got a Turf? <br className="md:hidden"/> <span className="text-white drop-shadow-md">Partner With Us.</span>
              </h2>
              <p className="text-black/80 text-lg mb-10 max-w-lg mx-auto font-bold tracking-wide">
                Join thousands of turf owners who maximize their ground utilization. List your venue on TurfBox today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href="/register-turf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white font-black uppercase tracking-widest text-sm hover:bg-zinc-900 transition-all -skew-x-12 cursor-pointer shadow-[4px_4px_0px_#ffffff] hover:shadow-[2px_2px_0px_#ffffff] active:translate-x-[2px] active:translate-y-[2px]"
                >
                  <span className="skew-x-12 flex items-center gap-2">
                    Register Turf
                    <ArrowRight className="w-5 h-5 stroke-[3px]" />
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-zinc-100 transition-all -skew-x-12 cursor-pointer border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.5)] hover:shadow-[2px_2px_0px_rgba(0,0,0,0.5)] active:translate-x-[2px] active:translate-y-[2px]"
                >
                  <span className="skew-x-12 flex items-center gap-2">
                    Learn More
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
