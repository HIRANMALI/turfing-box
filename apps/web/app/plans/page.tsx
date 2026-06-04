'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { Check, Zap, Crown, Shield, Trophy, Star, ArrowRight, Info, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-black dark:text-white transition-colors duration-300 overflow-x-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(163,230,53,0.3)_0,transparent_70%)]"></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime-500 text-black text-[10px] font-black uppercase tracking-widest -skew-x-12 mb-6 shadow-[4px_4px_0px_#000000]">
              <span className="skew-x-12 flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 fill-black" />
                Exclusive Membership
              </span>
           </div>
           <h1 className="text-5xl md:text-8xl xl:text-9xl font-black uppercase italic tracking-tighter leading-[0.8] mb-8">
              Unleash the <br/> <span className="text-lime-600 dark:text-lime-500">Pro Elite.</span>
           </h1>
           <p className="max-w-2xl mx-auto text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-xs md:text-sm mb-12 px-4 leading-relaxed">
              Stop paying for booking fees and start playing like a legend. <br className="hidden md:block"/> 
              Join 10,000+ athletes who have upgraded their game with TurfBox Pro.
           </p>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section className="container mx-auto px-4 pb-32">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            
            {/* Benefits Column */}
            <div className="space-y-8 order-2 md:order-1">
               <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-10">Why Upgrade <span className="text-lime-600">?</span></h2>
               
               <div className="space-y-6">
                  {[
                    { icon: <Zap />, title: "Zero Booking Fees", desc: "Save ₹20 on every single booking. Pays for itself in 2 games!" },
                    { icon: <Trophy />, title: "Priority Access", desc: "Get 15-minute early access to peak-hour slots before everyone else." },
                    { icon: <Shield />, title: "Elite Member Badge", desc: "A premium badge on your profile that signals your status to other players." },
                    { icon: <Star />, title: "Pro Tournaments", desc: "Invites to exclusive, high-stakes Pro-only weekend tournaments." }
                  ].map((benefit, i) => (
                    <div key={i} className="flex gap-5 group">
                       <div className="w-12 h-12 shrink-0 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 -skew-x-12 flex items-center justify-center text-lime-600 dark:text-lime-500 group-hover:bg-lime-500 group-hover:text-black transition-all">
                          <div className="skew-x-12 w-6 h-6">{benefit.icon}</div>
                       </div>
                       <div>
                          <h3 className="font-black uppercase italic tracking-wider text-sm mb-1 group-hover:text-lime-600 transition-colors">{benefit.title}</h3>
                          <p className="text-zinc-500 dark:text-zinc-400 text-xs font-bold leading-relaxed">{benefit.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* The Plan Card */}
            <div className="order-1 md:order-2">
               <div className="relative group">
                  {/* Decorative Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-lime-500 to-lime-400 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  
                  <div className="relative bg-black text-white rounded-[2rem] p-10 md:p-14 -skew-x-2 border-b-8 border-lime-500 shadow-[20px_20px_0px_rgba(163,230,53,0.1)]">
                     <div className="skew-x-2">
                        <div className="flex justify-between items-start mb-10">
                           <div>
                              <span className="text-lime-500 text-[10px] font-black uppercase tracking-[0.3em] block mb-2">Recommended</span>
                              <h3 className="text-4xl font-black uppercase italic tracking-tighter">Elite <span className="text-lime-500">Pro</span></h3>
                           </div>
                           <Crown className="w-10 h-10 text-lime-500 fill-lime-500" />
                        </div>

                        <div className="mb-10">
                           <div className="flex items-baseline gap-2">
                              <span className="text-7xl font-black italic tracking-tighter">₹29</span>
                              <span className="text-zinc-500 font-bold uppercase tracking-widest text-sm">/ MONTH</span>
                           </div>
                           <p className="text-zinc-400 text-xs mt-2 font-bold uppercase tracking-wider italic">Billed monthly. Cancel anytime.</p>
                        </div>

                        <ul className="space-y-4 mb-12">
                           {[
                             "Infinite Free Bookings",
                             "Priority Slot Reservation",
                             "Pro Member Profile Badge",
                             "Exclusive Tournament Access",
                             "24/7 Dedicated Support"
                           ].map((item, i) => (
                             <li key={i} className="flex items-center gap-3 text-sm font-bold tracking-tight">
                                <div className="w-5 h-5 bg-lime-500 flex items-center justify-center rounded-sm">
                                   <Check className="w-3 h-3 text-black stroke-[4px]" />
                                </div>
                                {item}
                             </li>
                           ))}
                        </ul>

                        <button className="w-full bg-lime-500 text-black font-black uppercase tracking-widest py-6 text-base hover:bg-white transition-all -skew-x-12 cursor-pointer shadow-[8px_8px_0px_#ffffff] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[6px_6px_0px_#ffffff] group/btn flex items-center justify-center gap-3">
                           <span className="skew-x-12">Upgrade to Elite Pro</span>
                           <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform skew-x-12" />
                        </button>
                        
                        <p className="text-center text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-8 flex items-center justify-center gap-2">
                           <Shield className="w-3 h-3" />
                           Safe & Secure SSL Payment
                        </p>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- COMPARISON TABLE --- */}
      <section className="bg-zinc-100 dark:bg-zinc-900/50 py-24 border-y-2 border-zinc-200 dark:border-zinc-800">
         <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-black uppercase italic tracking-tighter mb-16">The Difference</h2>
            
            <div className="max-w-4xl mx-auto overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 -skew-x-1 bg-white dark:bg-zinc-900">
               <div className="skew-x-1 overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="border-b-2 border-zinc-100 dark:border-zinc-800">
                           <th className="p-6 text-xs font-black uppercase tracking-widest text-zinc-400">Feature</th>
                           <th className="p-6 text-xs font-black uppercase tracking-widest text-zinc-400 text-center">Standard</th>
                           <th className="p-6 text-xs font-black uppercase tracking-widest text-lime-600 bg-lime-600/5 text-center">Pro Elite</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                        {[
                          { name: "Booking Fee", standard: "₹20", pro: "ZERO" },
                          { name: "Priority Access", standard: "NO", pro: "YES" },
                          { name: "Tournament Invites", standard: "LIMITED", pro: "UNLIMITED" },
                          { name: "Profile Status", standard: "BASIC", pro: "ELITE BADGE" },
                          { name: "Cancel Anytime", standard: "YES", pro: "YES" },
                        ].map((row, i) => (
                          <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                             <td className="p-6 text-xs font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400">{row.name}</td>
                             <td className="p-6 text-xs font-black uppercase tracking-widest text-center">{row.standard}</td>
                             <td className="p-6 text-xs font-black uppercase tracking-widest text-center text-lime-600 dark:text-lime-500 bg-lime-600/5 font-black italic">{row.pro}</td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </section>

      {/* --- FAQ / FOOTER CTA --- */}
      <section className="container mx-auto px-4 py-32 text-center">
         <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-8">Frequently Asked <span className="text-lime-600 font-normal">Questions</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-20 px-4">
               <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-lime-600 mb-2 underline decoration-2 underline-offset-4">How much can I save?</h4>
                  <p className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 leading-relaxed uppercase">
                    If you book more than 2 games a month, you are already saving money. Regular players save up to ₹500/month.
                  </p>
               </div>
               <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-lime-600 mb-2 underline decoration-2 underline-offset-4">Is it really ₹29/mo?</h4>
                  <p className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 leading-relaxed uppercase">
                    Yes. No hidden charges. No annual commitment. You can opt-out with a single click in your profile settings.
                  </p>
               </div>
            </div>

            <div className="p-12 bg-black text-white -skew-x-2 border-4 border-lime-500 shadow-[16px_16px_0px_#000000]">
               <div className="skew-x-2">
                  <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-6 underline decoration-lime-500 decoration-8 underline-offset-8">Still Deciding?</h3>
                  <p className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-10 max-w-lg mx-auto leading-relaxed">
                     Every minute you wait, someone else is taking that peak slot. <br/> Upgrade now and secure your dominance.
                  </p>
                  <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-lime-500 transition-all -skew-x-12 shadow-[4px_4px_0px_#65a30d]">
                     Join Elite Pro (₹29)
                  </button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
