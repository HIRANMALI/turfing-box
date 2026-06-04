'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { getTurfById, Turf } from '@/lib/data';
import { CreditCard, CheckCircle, ArrowLeft, Lock, Zap, Shield, Crown, Info, Ticket, ChevronRight, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const turfId = searchParams.get('turfId');
  const slotsParam = searchParams.get('slots');
  
  const [turf, setTurf] = useState<Turf | undefined>(undefined);
  const [slots, setSlots] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [showMethods, setShowMethods] = useState(false);

  useEffect(() => {
    if (turfId) {
      const found = getTurfById(turfId);
      setTurf(found);
    }
    if (slotsParam) {
      try {
        setSlots(JSON.parse(slotsParam));
      } catch (e) {
        setSlots([]);
      }
    }
  }, [turfId, slotsParam]);

  const bookingFee = 20;
  const totalAmount = turf ? (turf.priceRaw * slots.length) + bookingFee : 0;
  
  // Mock Date
  const bookingDate = "Oct 24, 2023";

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMethod) {
       setShowMethods(true);
       return;
    }
    setIsProcessing(true);
    
    // Simulate payment delay
    setTimeout(() => {
       setIsProcessing(false);
       router.push('/confirmation');
    }, 2000);
  };

  if (!turf) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-lime-500/30 border-t-lime-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-black dark:text-white transition-colors duration-300">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-20 max-w-5xl">
        
        {/* MINIMAL HEADER TEXT */}
        <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-black italic tracking-tighter leading-none mb-2">
              Secure <span className="text-lime-600 dark:text-lime-500 font-bold">Checkout</span>
            </h1>
            <p className="text-[10px] font-bold text-zinc-500 tracking-widest flex items-center gap-2 italic">
              <Shield className="w-3 h-3 text-lime-600" />
              256-Bit encryption active • Slot reserved
            </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Order Summary (Left) */}
          <div className="lg:col-span-7">
             <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6 mb-6">
                    <div className="relative w-full sm:w-28 aspect-video sm:aspect-square border-2 border-zinc-100 dark:border-zinc-800 rounded-xl overflow-hidden">
                       <img src={turf.image} alt={turf.name} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1">
                      <span className="inline-block px-2 py-1 bg-lime-500 text-black text-[10px] font-black uppercase tracking-widest mb-2 rounded-md">Entry Pass</span>
                      <h2 className="text-xl font-black italic tracking-tighter text-black dark:text-white mb-1 leading-tight">{turf.name}</h2>
                      <div className="flex flex-col gap-1.5 mt-2">
                         <p className="text-zinc-500 dark:text-zinc-400 text-[11px] font-bold uppercase tracking-wide flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-lime-600" />
                            {turf.location}
                         </p>
                         <p className="text-zinc-500 dark:text-zinc-400 text-[10px] font-bold tracking-wide flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-white" />
                            {bookingDate}
                         </p>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                         {slots.map(s => (
                           <div key={s} className="px-3 py-1 bg-zinc-900 dark:bg-zinc-800 text-white text-[9px] font-bold tracking-widest border border-zinc-700/50 rounded-lg shadow-sm">
                             <span>{s}</span>
                           </div>
                         ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex justify-between items-center text-zinc-500 dark:text-zinc-400 font-bold tracking-widest text-[11px]">
                       <span>Game duration ({slots.length} Slots)</span>
                       <span className="text-black dark:text-white font-black italic">₹{turf.priceRaw * slots.length}</span>
                    </div>
                    
                    {/* BOOKING FEE & PRO OFFER */}
                    <div className="pt-2">
                       <div className="flex justify-between items-center text-zinc-500 dark:text-zinc-400 font-bold tracking-widest text-[11px] mb-3">
                         <span className="flex items-center gap-2">
                           Platform fee
                           <Info className="w-3 h-3 opacity-50" />
                         </span>
                         <span className="text-black dark:text-white font-black italic">₹{bookingFee}</span>
                       </div>
                       
                       {/* SUBTLE PRO INVITE */}
                       <Link href="/plans" className="group block p-4 bg-lime-500/5 dark:bg-lime-500/5 border border-lime-500/20 hover:border-lime-500/50 transition-all rounded-xl border-dashed">
                         <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                               <Zap className="w-4 h-4 text-lime-600 dark:text-lime-500 animate-pulse" />
                               <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 leading-tight">
                                 Paying <span className="text-black dark:text-white">₹{bookingFee}</span> in fees? Get <span className="text-lime-600 dark:text-lime-500 font-black italic">PRO</span> for <span className="text-black dark:text-white">₹29/mo</span> and pay <span className="bg-lime-500 text-black px-1 font-black">₹0</span> fees forever.
                               </p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-lime-600 group-hover:translate-x-1 transition-transform shrink-0" />
                         </div>
                       </Link>
                    </div>
                    
                   <div className="flex justify-between items-center pt-6 mt-4 border-t-2 border-zinc-900 dark:border-white">
                      <span className="text-lg font-black italic tracking-tighter text-black dark:text-white">Final Total</span>
                      <div className="text-right">
                        <span className="text-4xl font-black italic tracking-tighter text-black dark:text-white font-serif">₹{totalAmount}</span>
                        <p className="text-[10px] font-bold text-zinc-500 tracking-tight mt-1">Inclusive of GST & charges</p>
                      </div>
                   </div>
                  </div>
                </div>
             </div>
             
             {/* Security Badge */}
             <div className="mt-6 flex items-center justify-center gap-4 opacity-40">
                <Shield className="w-4 h-4" />
                <span className="text-[10px] font-black tracking-[0.2em]">Verified Secure Arena Partner</span>
             </div>
          </div>

          {/* Payment Intel (Right) */}
          <div className="lg:col-span-5">
             <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-lg">
                <div>
                   <div className="flex items-center gap-4 mb-8">
                      <h2 className="text-xl font-black italic tracking-tighter">Payment Intel</h2>
                   </div>

                   <div className="space-y-4">
                      <div 
                        className="group cursor-pointer"
                        onClick={() => setShowMethods(!showMethods)}
                      >
                         <div className="bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 p-4 rounded-xl flex items-center justify-between group-hover:border-lime-500 transition-colors">
                            <div>
                               <p className="text-[10px] font-bold tracking-widest text-zinc-400 mb-1">Select Gateway</p>
                               <h3 className="text-base font-black tracking-wide">
                                  {selectedMethod || "Choose Payment Method"}
                               </h3>
                            </div>
                            <ChevronRight className={cn("w-5 h-5 text-zinc-300 transition-all", showMethods && "rotate-90 text-lime-500")} />
                         </div>
                      </div>
                      
                      {/* PAYMENT OPTIONS LIST */}
                      {showMethods && (
                         <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                            {[
                               { label: 'UPI (PhonePe, GPay)', value: 'UPI' },
                               { label: 'Debit / Credit Card', value: 'CARD' },
                               { label: 'Pay at Location (₹500 Advance)', value: 'LOCATION' }
                            ].map((method) => (
                               <button 
                                 key={method.value}
                                 onClick={() => {
                                    setSelectedMethod(method.label);
                                    setShowMethods(false);
                                 }}
                                 className={cn(
                                    "w-full p-3 rounded-xl border-2 text-left transition-all flex items-center justify-between font-bold text-sm tracking-wide",
                                    selectedMethod === method.label 
                                       ? "border-lime-500 bg-lime-500/5 text-white" 
                                       : "border-zinc-800 hover:border-zinc-600 bg-black/20 text-zinc-400"
                                 )}
                               >
                                  {method.label}
                                  {selectedMethod === method.label && <CheckCircle className="w-4 h-4 text-lime-500" />}
                               </button>
                            ))}
                         </div>
                      )}

                      <button 
                       type="button" 
                       disabled={isProcessing || !selectedMethod}
                       onClick={handlePayment}
                       className="w-full bg-white text-black font-black uppercase tracking-widest py-4 rounded-full text-sm flex items-center justify-center gap-2 transition-all cursor-pointer hover:bg-zinc-200 hover:-translate-y-1 shadow-[4px_4px_0px_rgba(255,255,255,0.2)] dark:shadow-[4px_4px_0px_rgba(255,255,255,0.1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none mt-4"
                      >
                        {isProcessing ? (
                          <>
                             <div className="w-4 h-4 border-2 border-black border-t-zinc-400 rounded-full animate-spin"></div>
                             Processing...
                          </>
                        ) : (
                          <>
                            {selectedMethod 
                               ? (selectedMethod.includes('Advance') ? `PAY ADVANCE ₹500` : `PAY ₹${totalAmount}`) 
                               : 'Confirm All Details'}
                            <Zap className={cn("w-4 h-4", selectedMethod ? "fill-black" : "opacity-30")} />
                          </>
                        )}
                      </button>
                      
                      <div className="flex items-center justify-center gap-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 mt-4">
                         <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-zinc-400 italic">
                            <Shield className="w-3 h-3 text-lime-500" /> PCI DSS Protected
                         </div>
                         <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-zinc-400 italic">
                            <Lock className="w-3 h-3 text-lime-500" /> SSL Secure
                         </div>
                      </div>
                      
                      <p className="text-center text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-widest mt-6 opacity-60">
                         RazorPay & Stripe Secured Gateway
                      </p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-lime-500/30 border-t-lime-500 rounded-full animate-spin"></div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
