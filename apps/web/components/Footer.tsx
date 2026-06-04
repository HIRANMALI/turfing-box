"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  if (pathname === '/checkout' || pathname === '/register-turf') return null;

  return (
    <footer className="bg-black text-white pt-20 pb-10 border-t-8 border-lime-500 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div className="space-y-6">
                <Link href="/" className="inline-block flex-shrink-0 cursor-pointer text-4xl font-black italic tracking-tighter uppercase text-white">
                   Turf<span className="text-lime-400">Box</span>
                </Link>
                <p className="text-zinc-500 text-sm leading-relaxed font-bold">
                    The ultimate platform for sports enthusiasts to discover, book, and play at premium arenas worldwide. Join the community today.
                </p>
                <div className="flex items-center gap-4 pt-2">
                    <a href="#" className="flex items-center justify-center w-10 h-10 bg-zinc-900 border-2 border-zinc-800 -skew-x-6 hover:border-lime-500 hover:text-lime-400 transition-all text-zinc-400">
                        <Instagram className="w-5 h-5 skew-x-6" />
                    </a>
                    <a href="#" className="flex items-center justify-center w-10 h-10 bg-zinc-900 border-2 border-zinc-800 -skew-x-6 hover:border-lime-500 hover:text-lime-400 transition-all text-zinc-400">
                        <Twitter className="w-5 h-5 skew-x-6" />
                    </a>
                    <a href="#" className="flex items-center justify-center w-10 h-10 bg-zinc-900 border-2 border-zinc-800 -skew-x-6 hover:border-lime-500 hover:text-lime-400 transition-all text-zinc-400">
                        <Linkedin className="w-5 h-5 skew-x-6" />
                    </a>
                    <a href="#" className="flex items-center justify-center w-10 h-10 bg-zinc-900 border-2 border-zinc-800 -skew-x-6 hover:border-lime-500 hover:text-lime-400 transition-all text-zinc-400">
                        <Facebook className="w-5 h-5 skew-x-6" />
                    </a>
                </div>
            </div>

            {/* Links - Company */}
            <div>
                <h3 className="text-lg font-black uppercase tracking-widest text-white mb-6 italic">Company</h3>
                <ul className="space-y-4 text-sm text-zinc-400 font-bold">
                    <li><Link href="/about" className="hover:text-lime-400 transition-colors uppercase tracking-wider">About Us</Link></li>
                    <li><Link href="/careers" className="hover:text-lime-400 transition-colors uppercase tracking-wider">Careers</Link></li>
                    <li><Link href="/blog" className="hover:text-lime-400 transition-colors uppercase tracking-wider">Blog</Link></li>
                    <li><Link href="/press" className="hover:text-lime-400 transition-colors uppercase tracking-wider">Press</Link></li>
                    <li><Link href="/register-turf" target="_blank" rel="noopener noreferrer" className="hover:text-lime-400 transition-colors uppercase tracking-wider">Partners</Link></li>
                </ul>
            </div>

            {/* Links - Support */}
            <div>
                <h3 className="text-lg font-black uppercase tracking-widest text-white mb-6 italic">Support</h3>
                <ul className="space-y-4 text-sm text-zinc-400 font-bold">
                    <li><Link href="/help" className="hover:text-lime-400 transition-colors uppercase tracking-wider">Help Center</Link></li>
                    <li><Link href="/safety" className="hover:text-lime-400 transition-colors uppercase tracking-wider">Safety Center</Link></li>
                    <li><Link href="/cancellation" className="hover:text-lime-400 transition-colors uppercase tracking-wider">Cancellation Options</Link></li>
                    <li><Link href="/covid" className="hover:text-lime-400 transition-colors uppercase tracking-wider">COVID-19 Response</Link></li>
                    <li><Link href="/contact" className="hover:text-lime-400 transition-colors uppercase tracking-wider">Contact Us</Link></li>
                </ul>
            </div>

            {/* Business CTA */}
            <div className="space-y-5">
                <div className="inline-flex px-3 py-1 bg-zinc-900 border-2 border-zinc-700 text-[10px] font-black uppercase tracking-widest text-lime-400 -skew-x-12">
                   <span className="skew-x-12">For Business</span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-white italic leading-none">Grow Your Business</h3>
                <p className="text-zinc-500 text-sm font-bold">
                    Own a sports arena? List your turf on TurfBox and reach thousands of players instantly.
                </p>
                <Link href="/register-turf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-lime-500 text-black font-black uppercase tracking-widest text-xs hover:bg-lime-400 transition-all -skew-x-12 shadow-[4px_4px_0px_#ffffff] mt-2 group">
                    <span className="skew-x-12 flex items-center gap-2">
                        Partner with Us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                </Link>
                <div className="pt-6 border-t-[3px] border-zinc-900/50 mt-4 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-zinc-400 font-bold group">
                        <div className="w-8 h-8 bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center -skew-x-6 group-hover:border-lime-500">
                           <Mail className="w-3.5 h-3.5 text-lime-400 skew-x-6" />
                        </div>
                        <span className="hover:text-white transition-colors cursor-pointer uppercase tracking-wider text-xs">business@turfbox.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-zinc-400 font-bold group">
                        <div className="w-8 h-8 bg-zinc-900 border-2 border-zinc-800 flex items-center justify-center -skew-x-6 group-hover:border-lime-500">
                           <Phone className="w-3.5 h-3.5 text-lime-400 skew-x-6" />
                        </div>
                        <span className="hover:text-white transition-colors cursor-pointer uppercase tracking-wider text-xs">+1 (555) 123-4567</span>
                    </div>
                </div>
            </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-[3px] border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">
                &copy; {new Date().getFullYear()} TurfBox Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-zinc-500 font-bold uppercase tracking-widest">
                <Link href="/privacy" className="hover:text-white hover:underline transition-all">Privacy</Link>
                <Link href="/terms" className="hover:text-white hover:underline transition-all">Terms</Link>
                <Link href="/sitemap" className="hover:text-white hover:underline transition-all">Sitemap</Link>
            </div>
        </div>

      </div>
    </footer>
  );
}
