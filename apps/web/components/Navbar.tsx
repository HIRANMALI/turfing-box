"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingCart, Globe, LogOut, User, LogIn, UserPlus, Calendar, Sun, Moon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import AuthModal from './AuthModal';

function cn(...inputs: (string | undefined | null | false)[]) {
  const { clsx } = require('clsx');
  const { twMerge } = require('tailwind-merge');
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("AHMEDABAD");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const isHome = pathname === '/';
  const isTurfs = pathname === '/turfs';
  const isTurfDetail = pathname?.startsWith('/turf/');
  const isSticky = !isHome && !pathname?.startsWith('/quick-join') && pathname !== '/checkout' && !isTurfDetail;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Auth Modal State
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');

  const [mounted, setMounted] = useState(false);

  const isDarkMode = theme === 'dark';

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
     setIsLoggedIn(false);
     setIsDropdownOpen(false);
  };

  const handleLoginSuccess = () => {
     setIsLoggedIn(true);
     setAuthModalOpen(false);
  };

  const openLogin = () => {
      setAuthView('login');
      setAuthModalOpen(true);
  };

  const openSignup = () => {
      setAuthView('signup');
      setAuthModalOpen(true);
  };

  return (
    <>
      <nav className={`
        ${isSticky ? 'sticky top-0 shadow-sm' : 'absolute top-0 left-0 right-0 w-full'} z-[100] transition-all duration-300
        ${isHome ? 'bg-transparent border-transparent' : isTurfs ? (isDarkMode ? 'bg-zinc-950 border-b-2 border-zinc-800' : 'bg-white border-b border-zinc-100 shadow-sm') : 'bg-zinc-950 border-b-2 border-zinc-800'}
      `}>
        <div className="container mx-auto px-4 h-[90px] flex items-center relative z-10">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer group no-underline mix-blend-normal">
             <div className={`text-3xl font-black italic tracking-tighter uppercase ${isTurfs && !isDarkMode ? 'text-black' : 'text-white'}`}>
                Turf<span className="text-lime-500 ml-0.5">Box</span>
             </div>
          </Link>

          {/* Search Bar - Hidden on Home Page */}
          {!isHome && (
            <div className="hidden md:flex flex-1 max-w-sm ml-8 lg:ml-12 relative -skew-x-6">
               <div className={`w-full h-11 border-2 flex items-center px-1 transition-all group ${isTurfs && !isDarkMode ? 'bg-zinc-50 border-zinc-200 focus-within:border-black' : 'bg-zinc-900 border-zinc-800 focus-within:border-white'}`}>
                  <Search className="w-4 h-4 text-zinc-400 ml-3 skew-x-6" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`flex-1 bg-transparent border-none outline-none ring-0 focus:ring-0 px-3 font-bold h-full w-full text-sm skew-x-6 uppercase tracking-wider ${isTurfs && !isDarkMode ? 'text-black placeholder-zinc-400' : 'text-white placeholder-zinc-500'}`} 
                  />
                  <button 
                    className="font-black h-8 px-5 bg-black text-white hover:bg-zinc-800 transition-colors flex items-center justify-center text-xs uppercase tracking-widest cursor-pointer skew-x-6"
                  >
                    Search
                  </button>
               </div>
            </div>
          )}

          {/* Icons */}
          <div className="ml-auto flex items-center gap-4 md:gap-6 lg:gap-8">
             

             <Link href="/quick-join" className={`hidden md:flex items-center gap-2 px-5 py-2.5 bg-lime-500 text-black font-black uppercase tracking-widest text-xs hover:bg-lime-400 transition-all -skew-x-12 shadow-[3px_3px_0px_rgba(0,0,0,0.1)]`}>
               <span className="skew-x-12 flex items-center gap-2">
                 <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                 </span>
                 Random Join
               </span>
             </Link>

             {/* Profile / Dropdown */}
             <div className="relative">
               <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className={`flex items-center justify-center w-11 h-11 border-2 transition-all cursor-pointer outline-none -skew-x-6 ${isTurfs && !isDarkMode ? 'border-zinc-200 bg-white text-black hover:border-black' : 'border-zinc-800 bg-zinc-900 text-white hover:border-white'}`}
               >
                 <div className="skew-x-6">
                   {isLoggedIn ? (
                       <span className="font-black text-sm tracking-tighter">PS</span>
                   ) : (
                       <User className="w-5 h-5" />
                   )}
                 </div>
               </button>

               {/* Dropdown Menu */}
               {isDropdownOpen && (
                 <>
                   <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                   <div className="absolute right-0 top-[calc(100%+10px)] w-64 border-2 border-zinc-800 bg-zinc-950 shadow-[4px_4px_0px_rgba(163,230,53,0.2)] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      
                      {/* User Info Header - Only if Logged In */}
                      {isLoggedIn && (
                          <div className="p-5 border-b-2 border-zinc-800 bg-zinc-900">
                             <p className="font-black text-sm uppercase tracking-wider text-white">Prashant Songara</p>
                             <p className="text-xs text-zinc-500 font-bold truncate">prashant@example.com</p>
                          </div>
                      )}
                      
                       <div className="p-2 flex flex-col gap-1">
                          {/* PERFORMANCE / NIGHT MODE TOGGLE */}
                          <div className="px-2 py-3 mb-2">
                            <div className="bg-zinc-900 border border-zinc-800 p-1 -skew-x-6 flex items-center relative overflow-hidden group">
                               <div className="absolute inset-0 bg-gradient-to-r from-lime-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                               
                               <button 
                                 onClick={() => setTheme('light')}
                                 className={cn(
                                   "flex-1 py-2 px-3 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all z-10",
                                   !isDarkMode ? "bg-white text-black shadow-[2px_2px_0px_#a3e635]" : "text-zinc-500 hover:text-zinc-300"
                                 )}
                               >
                                 <Sun className={cn("w-3.5 h-3.5", !isDarkMode ? "text-lime-600" : "text-zinc-600")} />
                                 <span className="skew-x-6">Peak</span>
                               </button>

                               <button 
                                 onClick={() => setTheme('dark')}
                                 className={cn(
                                   "flex-1 py-2 px-3 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all z-10",
                                   isDarkMode ? "bg-zinc-800 text-white shadow-[2px_2px_0px_#a3e635]" : "text-zinc-500 hover:text-zinc-300"
                                 )}
                               >
                                 <Moon className={cn("w-3.5 h-3.5", isDarkMode ? "text-lime-500" : "text-zinc-600")} />
                                 <span className="skew-x-6">Night</span>
                               </button>
                            </div>
                            <div className="mt-2 px-1 flex justify-between items-center overflow-hidden">
                               <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-600 italic">Visual Core</span>
                               <span className="text-[8px] font-black uppercase tracking-[0.2em] text-lime-500/50">{isDarkMode ? 'NIGHT MODE ACTIVE' : 'PEAK MODE ACTIVE'}</span>
                            </div>
                          </div>
                          
                          <div className="mx-2 h-[1px] bg-zinc-800/50 mb-2"></div>
                         
                         {/* Logged In Items */}
                         {isLoggedIn ? (
                             <>
                                 <Link 
                                    href="/my-bookings" 
                                    className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                                    onClick={() => setIsDropdownOpen(false)}
                                 >
                                    <Calendar className="w-4 h-4" />
                                    My Bookings
                                 </Link>
                                 
                                 <button className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer">
                                    <Heart className="w-4 h-4" />
                                    <span>Wishlist</span>
                                 </button>
                                 <Link 
                                    href="/profile" 
                                    className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
                                 >
                                    <User className="w-4 h-4" />
                                    Profile
                                 </Link>
                                 <div className="my-2 h-[2px] bg-zinc-800"></div>
                                 <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest hover:bg-red-950/30 text-red-500 hover:text-red-400 transition-colors cursor-pointer"
                                 >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                 </button>
                             </>
                         ) : (
                             // Guest Items
                             <>
                                 <button 
                                    onClick={() => {
                                        setIsDropdownOpen(false);
                                        openLogin();
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors text-left"
                                 >
                                    <Calendar className="w-4 h-4" />
                                    My Bookings
                                 </button>
                                 <div className="my-2 h-[2px] bg-zinc-800"></div>
                                 <button 
                                    onClick={() => {
                                        setIsDropdownOpen(false);
                                        openLogin();
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors text-left"
                                 >
                                    <LogIn className="w-4 h-4" />
                                    Log In
                                 </button>
                                 <button 
                                    onClick={() => {
                                        setIsDropdownOpen(false);
                                        openSignup();
                                    }} 
                                    className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest bg-lime-500 hover:bg-lime-400 text-black transition-colors text-left mt-2 -skew-x-6 mx-2"
                                 >
                                    <span className="skew-x-6 flex items-center gap-3">
                                      <UserPlus className="w-4 h-4" />
                                      Sign Up
                                    </span>
                                 </button>
                             </>
                         )}
                      </div>
                   </div>
                 </>
               )}
             </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        initialView={authView}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
