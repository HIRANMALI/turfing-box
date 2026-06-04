"use client";

import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, ArrowRight, Github, Zap, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'signup';
  onLoginSuccess?: () => void;
}

const SLIDES = [
    { 
        image: '/auth/slide1.png', 
        tag: 'FIELD READY', 
        title: 'JOIN THE', 
        highlight: 'ELITE', 
        desc: 'Access exclusive squads and high-performance turfs in seconds.' 
    },
    { 
        image: '/auth/slide2.png', 
        tag: 'COMMAND CENTER', 
        title: 'UNLEASH THE', 
        highlight: 'SQUAD', 
        desc: 'Connect with pro-level players and master the digital arena.' 
    },
    { 
        image: '/auth/slide3.png', 
        tag: 'LIVE INTEL', 
        title: 'SECURE YOUR', 
        highlight: 'TURF', 
        desc: 'Advanced booking protocols for the ultimate sporting experience.' 
    }
];

function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ');
}

export default function AuthModal({ isOpen, onClose, initialView = 'login', onLoginSuccess }: AuthModalProps) {
  const [view, setView] = useState<'login' | 'signup'>(initialView);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slideshow
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isOpen]);

  useEffect(() => {
    setView(initialView);
  }, [initialView, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-[95%] sm:max-w-xl md:max-w-4xl bg-zinc-950 border-2 border-zinc-800 flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-5 md:right-5 p-2 bg-zinc-900 border border-zinc-800 hover:border-lime-500 text-zinc-500 hover:text-lime-500 transition-all z-30 -skew-x-12"
        >
          <X className="w-4 h-4 md:w-5 md:h-5 skew-x-12" />
        </button>

        {/* --- LEFT SECTION: SLIDESHOW (Desktop Only) --- */}
        <div className="hidden md:block md:w-[45%] lg:w-[42%] relative overflow-hidden bg-black border-r border-zinc-800 min-h-[450px]">
             {/* Slides */}
             {SLIDES.map((slide, idx) => (
                 <div 
                    key={idx}
                    className={cn(
                        "absolute inset-0 transition-all duration-1000 ease-in-out",
                        idx === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-110"
                    )}
                 >
                    <Image 
                        src={slide.image} 
                        alt={slide.title}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    {/* Scan Line Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-30"></div>
                 </div>
             ))}

             {/* Slide Content Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
             
             <div className="absolute bottom-10 left-8 right-8 z-20">
                 <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 bg-lime-500 rounded-full animate-pulse shadow-[0_0_8px_#a3e635]"></div>
                    <span className="text-[9px] font-black tracking-[0.4em] uppercase text-lime-500/80 italic">{SLIDES[currentSlide].tag}</span>
                 </div>
                 <h3 className="text-2xl xl:text-3xl font-black uppercase italic tracking-tighter leading-[0.9] text-white mb-3">
                    {SLIDES[currentSlide].title} <br/> 
                    <span className="text-lime-500">{SLIDES[currentSlide].highlight}</span>
                 </h3>
                 <p className="text-zinc-500 text-[9px] font-bold uppercase tracking-widest leading-relaxed max-w-[180px]">
                    {SLIDES[currentSlide].desc}
                 </p>

                 {/* Indicators */}
                 <div className="flex gap-1.5 mt-6">
                    {SLIDES.map((_, idx) => (
                        <div 
                            key={idx}
                            className={cn(
                                "h-1 transition-all duration-500 rounded-full",
                                idx === currentSlide ? "w-6 bg-lime-500 shadow-[0_0_10px_#a3e635]" : "w-1.5 bg-zinc-800"
                            )}
                        />
                    ))}
                 </div>
             </div>
        </div>

        {/* --- RIGHT SECTION: AUTH FORM --- */}
        <div className="w-full md:w-[55%] lg:w-[58%] bg-zinc-900/50 p-6 sm:p-8 md:p-10 lg:p-12 relative overflow-hidden">
            <div className="max-w-md mx-auto relative z-10">
                {/* Header / Tabs */}
                <div className="mb-6 text-center md:text-left">
                    <h2 className="text-xl sm:text-2xl font-black uppercase italic tracking-tighter text-white mb-5 group">
                        Turf<span className="text-lime-500">Box</span> <span className="text-zinc-500">Protocol</span>
                    </h2>
                    
                    <div className="flex p-1 bg-zinc-950 border border-zinc-800 -skew-x-12">
                        <button 
                            onClick={() => setView('login')}
                            className={cn(
                                "flex-1 py-2 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] transition-all skew-x-12",
                                view === 'login' ? "bg-white text-black shadow-[3px_3px_0px_#a3e635]" : "text-zinc-500 hover:text-white"
                            )}
                        >
                            Entry
                        </button>
                        <button 
                            onClick={() => setView('signup')}
                            className={cn(
                                "flex-1 py-2 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] transition-all skew-x-12",
                                view === 'signup' ? "bg-white text-black shadow-[3px_3px_0px_#a3e635]" : "text-zinc-500 hover:text-white"
                            )}
                        >
                           Registry
                        </button>
                    </div>
                </div>

                {/* Form Container */}
                <form className="space-y-3 sm:space-y-4" onSubmit={(e) => { e.preventDefault(); onLoginSuccess?.(); onClose(); }}>
                    
                    {view === 'signup' && (
                        <div className="space-y-1 animate-in slide-in-from-top-4 duration-300">
                            <label className="text-[8px] font-black uppercase tracking-widest text-zinc-600 ml-1">Identity Alpha</label>
                            <div className="relative group -skew-x-12">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 group-focus-within:text-lime-500 transition-colors skew-x-12" />
                                <input 
                                    type="text" 
                                    required
                                    placeholder="DESIGNATE FULL NAME"
                                    className="w-full bg-zinc-950 border-2 border-zinc-800 focus:border-lime-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] px-10 py-3 outline-none transition-all font-black text-[9px] sm:text-[10px] uppercase tracking-widest text-white placeholder-zinc-700 h-11"
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-[8px] font-black uppercase tracking-widest text-zinc-600 ml-1">Comm Link (Email)</label>
                        <div className="relative group -skew-x-12">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 group-focus-within:text-lime-500 transition-colors skew-x-12" />
                            <input 
                                type="email" 
                                required
                                placeholder="ACCESS@RESERVE.MIL"
                                className="w-full bg-zinc-950 border-2 border-zinc-800 focus:border-lime-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] px-10 py-3 outline-none transition-all font-black text-[9px] sm:text-[10px] uppercase tracking-widest text-white placeholder-zinc-700 h-11"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[8px] font-black uppercase tracking-widest text-zinc-600 ml-1">Security Key</label>
                        <div className="relative group -skew-x-12">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 group-focus-within:text-lime-500 transition-colors skew-x-12" />
                            <input 
                                type="password" 
                                required
                                placeholder="••••••••"
                                className="w-full bg-zinc-950 border-2 border-zinc-800 focus:border-lime-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] px-10 py-3 outline-none transition-all font-black text-[9px] sm:text-[10px] uppercase tracking-widest text-white placeholder-zinc-700 h-11"
                            />
                        </div>
                    </div>

                    {view === 'login' && (
                        <div className="flex justify-end">
                            <button type="button" className="text-[8px] font-black text-lime-500 uppercase tracking-widest hover:text-white transition-colors italic">Encryption recovery?</button>
                        </div>
                    )}

                    <button className="relative w-full py-4 bg-lime-500 text-black font-black uppercase tracking-[0.15em] text-[10px] -skew-x-12 hover:bg-white hover:scale-[1.01] active:scale-[0.98] transition-all shadow-[6px_6px_0px_rgba(255,255,255,0.05)] group/btn">
                        <span className="skew-x-12 flex items-center justify-center gap-2 italic">
                            {view === 'login' ? 'Initiate Entry' : 'Create Squad Profile'}
                            <Zap className="w-3.5 h-3.5 group-hover/btn:animate-pulse" />
                        </span>
                    </button>
                </form>

                <div className="relative my-6 sm:my-8">
                    <div className="absolute inset-x-0 top-1/2 h-[1px] bg-zinc-800"></div>
                    <div className="relative flex justify-center">
                        <span className="bg-[#121214] px-4 text-[8px] font-black uppercase tracking-[0.4em] text-zinc-600 italic">Alternative Gateways</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                     <button className="flex items-center justify-center gap-2 py-3 bg-zinc-950 border border-zinc-800 hover:border-white transition-all font-black text-[8px] sm:text-[9px] uppercase tracking-widest -skew-x-12 text-zinc-400 hover:text-white group/social">
                        <svg className="w-3.5 h-3.5 skew-x-12 grayscale group-hover/social:grayscale-0 transition-all" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        <span className="skew-x-12">Google</span>
                     </button>
                     <button className="flex items-center justify-center gap-2 py-3 bg-zinc-950 border border-zinc-800 hover:border-white transition-all font-black text-[8px] sm:text-[9px] uppercase tracking-widest -skew-x-12 text-zinc-400 hover:text-white">
                        <Github className="w-3.5 h-3.5 skew-x-12" />
                        <span className="skew-x-12">GitHub</span>
                     </button>
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 opacity-30 group hover:opacity-100 transition-opacity">
                   <ShieldCheck className="w-2.5 h-2.5 text-lime-500" />
                   <p className="text-[7px] font-black uppercase tracking-[0.4em] text-zinc-500">Encrypted Protocol L4</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
