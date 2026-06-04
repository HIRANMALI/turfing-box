"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { ArrowLeft, ArrowRight, Clock, MapPin, Trophy, ShieldCheck, User, Lock, CheckCircle, CreditCard, Ticket } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function GameDetailsPage() {
    const params = useParams(); 
    // State for multiple selections (max 2)
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    
    type BookingStep = 'SELECT' | 'PAYMENT' | 'CONFIRMED';
    const [bookingStep, setBookingStep] = useState<BookingStep>('SELECT');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    // Auto-close popup after 5 seconds
    React.useEffect(() => {
        if (showSuccessPopup) {
            const timer = setTimeout(() => {
                setShowSuccessPopup(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showSuccessPopup]);

    // Mock Data logic for visuals
    const gameId = Number(params?.id) || 1;
    const isFootball = [1, 3, 5].includes(gameId); 
    
    // Team A vs Team B logic (e.g., 5 vs 5 + GK, or 6 vs 6. Total 12 slots for simplicity in standard turf)
    const TOTAL_SLOTS = 12; // 6 vs 6
    
    const game = {
        id: gameId,
        venue: isFootball ? "Old Trafford Turf" : "Oval Box Cricket",
        sport: isFootball ? "Football" : "Cricket",
        date: "Today, Feb 1st",
        time: "7:00 PM - 8:00 PM",
        price: 200,
        slotsLeft: 5,
        totalSlots: TOTAL_SLOTS,
        players: [
            { id: 1, name: "Host", role: "Host" }, // Slot 0 (Team A)
            { id: 2, name: "Rahul", role: "Player" }, // Slot 1 (Team A)
            { id: 3, name: "Amit", role: "Player" }, // Slot 2 (Team A)
            null, // Slot 3 (Team A)
            null, // Slot 4 (Team A)
            null, // Slot 5 (Team A)
            
            { id: 4, name: "Vikram", role: "Player" }, // Slot 6 (Team B)
            { id: 5, name: "Sarah", role: "Player" }, // Slot 7 (Team B)
            { id: 6, name: "Mike", role: "Player" }, // Slot 8 (Team B)
            { id: 7, name: "Tom", role: "Player" }, // Slot 9 (Team B)
            null, // Slot 10 (Team B)
            null, // Slot 11 (Team B)
        ]
    };

    const handleSlotClick = (index: number) => {
        if (bookingStep !== 'SELECT') return; // Disable selection changes during payment
        
        if (selectedIndices.includes(index)) {
            // Deselect
            setSelectedIndices(prev => prev.filter(i => i !== index));
        } else {
            // Select if < 2
            if (selectedIndices.length < 2) {
                setSelectedIndices(prev => [...prev, index]);
            }
        }
    };

    // Helper to render field
    const renderField = () => {
        // Digital Arena Container
        const containerClass = "relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/3] overflow-hidden select-none bg-[#050805] border-2 border-zinc-800 shadow-[inset_0_0_100px_rgba(163,230,53,0.05)]";
        
        return (
            <div className={containerClass}>
                {/* Visual Grid Layer */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                
                {isFootball ? (
                    /* Digital Football Markings */
                    <>
                        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-lime-500/30 -translate-y-1/2"></div>
                        <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-lime-500/30 rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                           <div className="w-2 h-2 bg-lime-500 rounded-full shadow-[0_0_10px_#a3e635]"></div>
                        </div>
                        <div className="absolute inset-8 border border-lime-500/20"></div>
                        {/* Corner Glows */}
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-lime-500/40"></div>
                        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-lime-500/40"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-lime-500/40"></div>
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-lime-500/40"></div>
                    </>
                ) : (
                    /* Digital Cricket Markings */
                    <>
                        {/* Glow Circle */}
                        <div className="absolute top-1/2 left-1/2 w-[75%] h-[75%] border border-lime-500/10 rounded-[50%] -translate-x-1/2 -translate-y-1/2 border-dashed"></div>
                        
                        {/* The High-Tech Pitch */}
                        <div className="absolute top-1/2 left-1/2 w-32 h-64 bg-zinc-900 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-between py-6 border-x border-lime-500/20 shadow-[0_0_30px_rgba(163,230,53,0.05)]">
                            <div className="w-full h-[1px] bg-lime-500/40"></div>
                            <div className="w-full h-[1px] bg-lime-500/40"></div>
                        </div>

                        {/* Digital Stumps */}
                        <div className="absolute top-[calc(50%-100px)] left-1/2 flex gap-1.5 -translate-x-1/2">
                            <div className="w-1 h-1 bg-lime-500 rounded-full shadow-[0_0_8px_#a3e635]"></div>
                            <div className="w-1 h-1 bg-lime-500 rounded-full shadow-[0_0_8px_#a3e635]"></div>
                            <div className="w-1 h-1 bg-lime-500 rounded-full shadow-[0_0_8px_#a3e635]"></div>
                        </div>
                        <div className="absolute bottom-[calc(50%-100px)] left-1/2 flex gap-1.5 -translate-x-1/2">
                            <div className="w-1 h-1 bg-lime-500 rounded-full shadow-[0_0_8px_#a3e635]"></div>
                            <div className="w-1 h-1 bg-lime-500 rounded-full shadow-[0_0_8px_#a3e635]"></div>
                            <div className="w-1 h-1 bg-lime-500 rounded-full shadow-[0_0_8px_#a3e635]"></div>
                        </div>
                    </>
                )}

                {/* Team Status Labels */}
                <div className="absolute top-4 left-6 mix-blend-difference">
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 italic">SQUAD_ALPHA // READY</p>
                </div>
                <div className="absolute bottom-4 right-6 mix-blend-difference text-right">
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 italic">SQUAD_BRAVO // ACTIVE</p>
                </div>

                {/* Slots Grid */}
                <div className="absolute inset-x-4 sm:inset-x-12 inset-y-12 sm:inset-y-20 flex flex-col justify-between z-10">
                    <div className="grid grid-cols-3 gap-y-12 sm:gap-y-16 justify-items-center">
                        {Array.from({ length: TOTAL_SLOTS / 2 }).map((_, i) => renderSlot(i))}
                    </div>
                    <div className="grid grid-cols-3 gap-y-12 sm:gap-y-16 justify-items-center items-end">
                        {Array.from({ length: TOTAL_SLOTS / 2 }).map((_, i) => renderSlot(i + (TOTAL_SLOTS / 2)))}
                    </div>
                </div>
            </div>
        );
    };

    const renderSlot = (index: number) => {
        const player = game.players[index];
        const isHost = index === 0;
        const isSelected = selectedIndices.includes(index);
        const isOccupied = !!player;
        const isTeamA = index < TOTAL_SLOTS / 2;

        return (
            <div 
                key={index}
                className="relative group/slot cursor-pointer"
                onClick={() => !isOccupied && !isHost ? handleSlotClick(index) : null}
            >
                {isOccupied ? (
                    <div className="flex flex-col items-center gap-2 animate-in zoom-in duration-300">
                        <div className={cn(
                            "w-10 h-10 sm:w-14 sm:h-14 -skew-x-12 border-2 flex items-center justify-center transition-all shadow-[4px_4px_0_rgba(0,0,0,0.3)]",
                            isHost ? "bg-white border-white text-black" : 
                            isTeamA ? "bg-red-600 border-red-700 text-white" : "bg-blue-600 border-blue-700 text-white"
                        )}>
                            {isHost ? <Lock className="w-4 h-4 sm:w-5 sm:h-5 skew-x-12" /> : <span className="font-black text-sm sm:text-lg skew-x-12 italic tracking-tighter">{player.name[0]}</span>}
                        </div>
                        <div className="bg-black/80 px-2 py-0.5 -skew-x-12 border border-zinc-700">
                           <p className="text-[7px] sm:text-[9px] font-black uppercase text-white skew-x-12 tracking-widest">{player.name.split(" ")[0]}</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 transition-transform active:scale-95">
                        <div className={cn(
                            "w-10 h-10 sm:w-14 sm:h-14 -skew-x-12 border-2 flex items-center justify-center transition-all",
                            isSelected 
                                ? "bg-lime-500 border-lime-400 text-black shadow-[0_0_20px_rgba(163,230,53,0.4)]" 
                                : "bg-zinc-950/50 border-dashed border-zinc-700 text-zinc-600 hover:border-lime-500/50 hover:text-lime-500"
                        )}>
                            <span className="text-xl sm:text-2xl font-black skew-x-12 leading-none">{isSelected ? '✓' : '+'}</span>
                        </div>
                        {isSelected && (
                           <div className="absolute -top-1 -right-1 w-3 h-3 bg-lime-500 rounded-full animate-ping"></div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    // Render Side Panel Content based on Step
    const renderSidePanel = () => {
        if (bookingStep === 'CONFIRMED') {
            return (
                <div className="text-center animate-in fade-in zoom-in duration-500">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-lime-500 flex items-center justify-center -skew-x-12 shadow-[4px_4px_0px_rgba(0,0,0,0.3)] shrink-0">
                            <CheckCircle className="w-6 h-6 text-black skew-x-12" />
                        </div>
                        <h2 className="text-3xl font-black uppercase italic tracking-tighter">You're <span className="text-lime-500">In!</span></h2>
                    </div>
                    
                    <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-8 px-4 leading-relaxed">
                        Mission accomplished. Squad connection secured.
                    </p>
                    
                    <div className="bg-zinc-950 border-2 border-zinc-800 -skew-x-2 p-5 text-left mb-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                             <Trophy className="w-20 h-20 text-lime-500" />
                        </div>
                        <div className="mb-4 skew-x-2">
                             <p className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-0.5">Arena Location</p>
                             <p className="font-black text-lg italic uppercase text-white tracking-tighter">{game.venue}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4 skew-x-2">
                             <div>
                                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-0.5">Deployment</p>
                                <p className="font-black italic uppercase text-white text-xs">{game.date}</p>
                             </div>
                             <div className="text-right">
                                <p className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-0.5">Kickoff</p>
                                <p className="font-black italic uppercase text-white text-xs">{game.time}</p>
                             </div>
                        </div>
                        <div className="pt-4 border-t border-dashed border-zinc-800 flex justify-between items-center skew-x-2">
                             <p className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-600">Squad Access</p>
                             <div className="flex gap-1.5">
                                 {selectedIndices.map((_, i) => (
                                     <span key={i} className="px-2 py-0.5 bg-lime-500 text-black text-[8px] font-black uppercase italic -skew-x-12">
                                         P{i+1}
                                     </span>
                                 ))}
                             </div>
                        </div>
                    </div>

                    <Link 
                        href="/quick-join" 
                        className="block w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-black uppercase tracking-widest text-[10px] transition-all -skew-x-12 shadow-[6px_6px_0px_#000]"
                    >
                        <span className="skew-x-12 inline-block">Hunt More Squads</span>
                    </Link>
                </div>
            )
        }
        if (bookingStep === 'PAYMENT') {
            return (
                <div className="animate-in slide-in-from-right-12 duration-500">
                     <button 
                        onClick={() => setBookingStep('SELECT')}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white mb-12 transition-colors group"
                     >
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> 
                        Re-evaluate Selection
                     </button>

                     <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-4 leading-none text-center">
                        Confirm <span className="text-lime-500">Slot</span>
                     </h2>
                     
                     <p className="text-[10px] font-bold text-center text-zinc-500 uppercase tracking-widest mb-12 leading-relaxed px-4">
                        Everything is set. Your squad is waiting for the final connection.
                     </p>

                     <button 
                        onClick={() => {
                            setShowSuccessPopup(true);
                            setBookingStep('CONFIRMED');
                        }}
                        className="relative w-full py-6 bg-lime-500 text-black font-black uppercase tracking-widest text-sm -skew-x-12 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[8px_8px_0px_#fff]"
                    >
                        <span className="skew-x-12 inline-flex items-center gap-3">
                           Initiate Payment - ₹{selectedIndices.length * game.price} <ShieldCheck className="w-5 h-5" />
                        </span>
                    </button>
                    
                    <p className="text-[8px] font-bold text-center text-zinc-600 uppercase tracking-widest mt-10 leading-relaxed">
                       Transaction secured by high-performance <br/> turfbox encryption protocols.
                    </p>
                </div>
            )
        }

        // Default: 'SELECT'
        return (
            <div className="animate-in fade-in duration-500">
                <div className="mb-10 lg:mb-12">
                   <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-1 bg-lime-500"></div>
                      <span className="text-[9px] font-black tracking-[0.4em] uppercase text-lime-500/80 italic">Verified Squad Game</span>
                   </div>
                   <h1 className="text-xl lg:text-2xl font-black uppercase italic tracking-tighter leading-none mb-3 group-hover/panel:text-lime-500 transition-colors">
                      {game.venue}
                   </h1>
                   <div className="flex items-center gap-2.5 text-zinc-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-black uppercase tracking-widest leading-none">Manchester Central // 1.2 KM</span>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="p-3 bg-zinc-950 border border-zinc-900 group/item hover:border-zinc-800 transition-colors">
                            <p className="text-[7.5px] font-black text-zinc-600 uppercase tracking-widest mb-0.5 group-hover/item:text-lime-500 transition-colors">Deployment</p>
                            <p className="font-black italic text-xs uppercase tracking-tighter">{game.time.split(' ')[0]} {game.time.split(' ')[1]}</p>
                        </div>
                        <div className="p-3 bg-zinc-950 border border-zinc-900 group/item hover:border-zinc-800 transition-colors">
                            <p className="text-[7.5px] font-black text-zinc-600 uppercase tracking-widest mb-0.5 group-hover/item:text-lime-500 transition-colors">Discipline</p>
                            <p className="font-black italic text-xs uppercase tracking-tighter">{TOTAL_SLOTS/2} V {TOTAL_SLOTS/2}</p>
                        </div>
                </div>

                <div className="p-4 bg-zinc-950 border-2 border-zinc-900 mb-6 group/price hover:border-lime-500/30 transition-colors">
                   <div className="flex justify-between items-center">
                      <div>
                         <p className="text-[7.5px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-0.5 group-hover/price:text-white transition-colors">Participation Fee</p>
                         <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black italic text-white tracking-tighter">₹{game.price}</span>
                            <span className="text-zinc-600 text-[8px] font-black uppercase tracking-widest">/ PPL</span>
                         </div>
                      </div>
                      <div className="w-10 h-10 bg-zinc-900 flex items-center justify-center -skew-x-12 border border-zinc-800">
                         <ShieldCheck className="w-5 h-5 text-lime-500 skew-x-12" />
                      </div>
                   </div>
                </div>

                {/* Slot Selection Console */}
                <div className="mb-6 p-4 bg-zinc-900 border border-zinc-800 -skew-x-6 transform -translate-x-1">
                    <div className="skew-x-6">
                        {selectedIndices.length === 0 ? (
                            <div className="flex items-center gap-3">
                               <div className="w-1.5 h-1.5 bg-zinc-800 animate-pulse rounded-full"></div>
                               <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 leading-tight">
                                  Select empty slots in the arena console to join squad.
                               </p>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                               <div>
                                  <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-0.5">Squad Selected</p>
                                  <p className="text-lg font-black italic text-white tracking-tighter">
                                     {selectedIndices.length} MISSION{selectedIndices.length > 1 ? 'S' : ''} ACTIVE
                                  </p>
                               </div>
                               <div className="text-right">
                                  <p className="text-[8px] font-black uppercase tracking-widest text-lime-500 mb-0.5 italic">Total Credits</p>
                                  <p className="text-lg font-black italic text-lime-500 tracking-tighter">₹{selectedIndices.length * game.price}</p>
                               </div>
                            </div>
                        )}
                    </div>
                </div>

                <button 
                    disabled={selectedIndices.length === 0}
                    onClick={() => setBookingStep('PAYMENT')}
                    className={cn(
                        "group relative w-full py-4 font-black uppercase tracking-widest text-xs transition-all -skew-x-12 overflow-hidden",
                        selectedIndices.length > 0 
                            ? "bg-lime-500 text-black shadow-[6px_6px_0px_#fff] hover:scale-[1.02] active:scale-[0.98] cursor-pointer" 
                            : "bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700"
                    )}
                >
                    <span className="relative z-10 skew-x-12 flex items-center justify-center gap-3 italic">
                        {selectedIndices.length > 0 ? (
                           <>Lock In & Proceed <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                        ) : 'Select Slots to Join'}
                    </span>
                    {selectedIndices.length > 0 && (
                       <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    )}
                </button>
            </div>
        )
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white selection:bg-lime-500 selection:text-black pb-20 overflow-x-hidden">
            <Navbar />
            
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 max-w-7xl">
                {/* 1. NAVIGATION & STATUS */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 lg:mb-12">
                    <Link 
                        href="/quick-join" 
                        className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-lime-500 transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Matchmaking
                    </Link>
                    
                    <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-4 py-2 -skew-x-12">
                        <div className="w-2 h-2 bg-lime-500 rounded-full animate-ping"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-lime-500 skew-x-12 italic">Live Connection established</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    
                    {/* 2. LEFT COLUMN: DIGITAL ARENA (FIELD) */}
                    <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
                        <div className="relative group/arena">
                            {/* Decorative Glows */}
                            <div className="absolute -inset-1 bg-lime-500/10 blur-xl opacity-0 group-hover/arena:opacity-100 transition-opacity"></div>
                            
                            <div className="relative bg-zinc-900 border-2 border-zinc-800 -skew-x-1 overflow-hidden shadow-2xl">
                                {/* SCAN LINE EFFECT */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_2px,3px_100%] pointer-events-none z-20 opacity-30"></div>
                                
                                <div className="p-4 sm:p-8 md:p-12 skew-x-1">
                                    {renderField()}
                                </div>
                            </div>

                            {/* ARENA LEGEND */}
                            <div className="mt-6 flex flex-wrap gap-6 justify-center lg:justify-start">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-500 to-rose-600 border border-white/20"></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Squad Alpha</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border border-white/20"></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Squad Bravo</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full border border-dashed border-zinc-700 bg-zinc-800"></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Available Slot</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. RIGHT COLUMN: MISSION CONTROL (SIDE PANEL) */}
                    <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2">
                        <div className="sticky top-28">
                            <div className="relative group/panel">
                                {/* Offset Background */}
                                <div className="absolute inset-0 bg-lime-500 -skew-x-2 translate-x-2 translate-y-2 opacity-5 scale-105"></div>
                                
                                <div className="relative bg-zinc-900 border-2 border-zinc-800 -skew-x-2 p-6 sm:p-8 shadow-2xl">
                                    <div className="skew-x-2">
                                        {renderSidePanel()}
                                    </div>
                                </div>
                            </div>

                            {/* Trust badges below panel */}
                            <div className="mt-8 grid grid-cols-2 gap-4">
                               <div className="bg-zinc-900/50 border border-zinc-800 p-3 -skew-x-12 flex items-center gap-3">
                                  <ShieldCheck className="w-5 h-5 text-lime-500 skew-x-12" />
                                  <div className="skew-x-12">
                                     <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Secured</p>
                                     <p className="text-[9px] font-black text-white italic">256-BIT ENCRYPTION</p>
                                  </div>
                               </div>
                               <div className="bg-zinc-900/50 border border-zinc-800 p-3 -skew-x-12 flex items-center gap-3">
                                  <Trophy className="w-5 h-5 text-lime-500 skew-x-12" />
                                  <div className="skew-x-12">
                                     <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Verified</p>
                                     <p className="text-[9px] font-black text-white italic">PRO ARENA HOST</p>
                                  </div>
                               </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* SUCCESS CELEBRATION POPUP */}
            {showSuccessPopup && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-sm bg-black/60 animate-in fade-in duration-300">
                    <div className="relative max-w-sm w-full bg-zinc-900 border-4 border-white -skew-x-2 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300">
                        {/* Celebrate Background Elements */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-lime-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-lime-500/10 rounded-full blur-3xl"></div>

                        <button 
                            onClick={() => setShowSuccessPopup(false)}
                            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors skew-x-2"
                        >
                            <span className="text-xl font-black">✕</span>
                        </button>

                        <div className="skew-x-2 text-center">
                            <div className="w-20 h-20 bg-lime-500 flex items-center justify-center mx-auto mb-6 -skew-x-12 shadow-[8px_8px_0px_#000]">
                                <Trophy className="w-10 h-10 text-black skew-x-12" />
                            </div>
                            
                            <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-3">
                                Match <span className="text-lime-500">Secured!</span>
                            </h3>
                            
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-8 leading-relaxed">
                                Slot reserved successfully. Get ready to dominate the arena.
                            </p>

                            <div className="bg-black/50 border border-zinc-800 p-4 mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Venue</span>
                                    <span className="text-xs font-black uppercase italic">{game.venue}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">Kickoff</span>
                                    <span className="text-xs font-black uppercase italic text-lime-500">{game.time}</span>
                                </div>
                            </div>

                            <div className="h-1 w-full bg-zinc-800 overflow-hidden">
                                <div className="h-full bg-lime-500 animate-[progress_5000ms_linear_forwards]"></div>
                            </div>
                        </div>
                    </div>
                    
                    <style jsx global>{`
                        @keyframes progress {
                            from { width: 100%; }
                            to { width: 0%; }
                        }
                    `}</style>
                </div>
            )}
        </div>
    );
}

// Sub-components/Helper for updated visuals
function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ');
}
