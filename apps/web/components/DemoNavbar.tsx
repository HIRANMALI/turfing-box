"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, LogIn, UserPlus, Calendar, Sun, Moon, LogOut, Heart } from 'lucide-react';
import { useTheme } from "next-themes";
import AuthModal from './AuthModal';

export default function DemoNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Auth Modal State
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');

  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

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
      <nav className="absolute top-0 left-0 w-full z-50 bg-transparent py-4">
        <div className="container mx-auto px-4 h-[60px] flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 cursor-pointer group no-underline">
             <div className="text-2xl font-bold tracking-tighter text-foreground">
                Turf<span className="text-primary">Box</span>
             </div>
          </Link>

          {/* Right Actions - Exactly matching Navbar structure */}
          <div className="ml-auto flex items-center gap-4 md:gap-6 lg:gap-10 text-muted-foreground">
             <Link href="/quick-join" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-primary/10 text-sm font-semibold text-foreground hover:text-primary transition-all">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
               </span>
               Random Join
             </Link>

             {/* Profile / Dropdown */}
             <div className="relative">
               <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className="flex flex-col items-center gap-1 hover:text-foreground transition-colors cursor-pointer outline-none"
               >
                 {isLoggedIn ? (
                     <div className="w-9 h-9 rounded-full bg-secondary border border-border flex items-center justify-center text-foreground font-bold text-xs ring-2 ring-transparent hover:ring-primary/50 transition-all">
                        PS
                     </div>
                 ) : (
                     <div className="w-9 h-9 rounded-full bg-secondary/50 backdrop-blur-sm border border-border flex items-center justify-center text-foreground ring-2 ring-transparent hover:ring-primary/50 transition-all">
                        <User className="w-5 h-5" />
                     </div>
                 )}
               </button>

               {/* Dropdown Menu */}
               {isDropdownOpen && (
                 <>
                   <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                   <div className="absolute right-0 top-full mt-2 w-60 rounded-xl border border-border bg-card shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                      
                      {isLoggedIn && (
                          <div className="p-4 border-b border-border bg-secondary/10">
                             <p className="font-semibold text-sm text-foreground">Prashant Songara</p>
                             <p className="text-xs text-muted-foreground truncate">prashant@example.com</p>
                          </div>
                      )}
                      
                      <div className="p-2 flex flex-col gap-1">
                         
                         {/* Theme Toggle - Inside Dropdown like original Navbar */}
                         {mounted && (
                             <button 
                                onClick={toggleTheme}
                                className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-secondary text-foreground transition-colors cursor-pointer"
                             >
                                <div className="relative w-4 h-4">
                                    <Sun className="absolute w-4 h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                    <Moon className="absolute w-4 h-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                </div>
                                <span>{resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                             </button>
                         )}

                         {isLoggedIn ? (
                             <>
                                 <Link 
                                    href="/my-bookings" 
                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-secondary text-foreground transition-colors"
                                    onClick={() => setIsDropdownOpen(false)}
                                 >
                                    <Calendar className="w-4 h-4" />
                                    My Bookings
                                 </Link>
                                 
                                 <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-secondary text-foreground transition-colors cursor-pointer">
                                    <Heart className="w-4 h-4" />
                                    <span>Wishlist</span>
                                 </button>
                                 <Link 
                                    href="/profile" 
                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-secondary text-foreground transition-colors"
                                 >
                                    <User className="w-4 h-4" />
                                    Profile
                                 </Link>
                                 <div className="my-1 h-px bg-border"></div>
                                 <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-red-500/10 text-red-500 hover:text-red-600 transition-colors cursor-pointer"
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
                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-secondary text-foreground transition-colors text-left"
                                 >
                                    <Calendar className="w-4 h-4" />
                                    My Bookings
                                 </button>
                                 <div className="my-1 h-px bg-border"></div>
                                 <button 
                                    onClick={() => {
                                        setIsDropdownOpen(false);
                                        openLogin();
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-secondary text-foreground transition-colors text-left"
                                 >
                                    <LogIn className="w-4 h-4" />
                                    Log In
                                 </button>
                                 <button 
                                    onClick={() => {
                                        setIsDropdownOpen(false);
                                        openSignup();
                                    }} 
                                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-secondary text-foreground transition-colors text-left"
                                 >
                                    <UserPlus className="w-4 h-4" />
                                    Sign Up
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
