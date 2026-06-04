'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Check, Trophy, Info } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Court } from '@/lib/data';

const TIME_SLOTS = [
  "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"
];

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface SlotPickerProps {
  turfId: string;
  turfName: string;
  courts: Court[];
}

export default function SlotPicker({ turfId, turfName, courts }: SlotPickerProps) {
  const router = useRouter();
  const [selectedCourt, setSelectedCourt] = useState<Court>(courts[0]);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  // Reset slots when court changes (optional, keeps logic clean)
  useEffect(() => {
    setSelectedSlots([]);
  }, [selectedCourt]);

  const toggleSlot = (slot: string) => {
    if (selectedSlots.includes(slot)) {
       setSelectedSlots(selectedSlots.filter(s => s !== slot));
    } else {
       setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const handleBook = () => {
    const params = new URLSearchParams();
    params.append('turfId', turfId);
    params.append('courtId', selectedCourt.id);
    params.append('slots', JSON.stringify(selectedSlots));
    router.push(`/checkout?${params.toString()}`);
  };

  if (!selectedCourt) return null;

  return (
    <div className="space-y-6">
      
      {/* Court Selection */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-lime-500" />
          Select Court
        </h3>
        <div className="flex flex-col gap-2">
            {courts.map(court => (
                <button 
                    key={court.id}
                    onClick={() => setSelectedCourt(court)}
                    className={cn(
                        "w-full p-3 rounded-xl border-2 text-left transition-all flex justify-between items-center group",
                        selectedCourt.id === court.id 
                            ? "bg-lime-500/10 border-lime-500"
                            : "bg-black/50 border-zinc-800 hover:border-zinc-600"
                    )}
                >
                    <div>
                        <div className={cn("font-black text-sm uppercase tracking-wide", selectedCourt.id === court.id ? "text-lime-400" : "text-zinc-200")}>
                            {court.name}
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{court.sport}</div>
                    </div>
                    <div className={cn("text-base font-black italic", selectedCourt.id === court.id ? "text-lime-400" : "text-zinc-400")}>
                        {court.price}
                    </div>
                </button>
            ))}
        </div>
      </div>

      <div className="h-px bg-zinc-800/50"></div>

      {/* Slots Selection */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-lime-500" />
            Select Date & Time
        </h3>

        <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((slot) => {
            const isSelected = selectedSlots.includes(slot);
            return (
                <button
                key={slot}
                onClick={() => toggleSlot(slot)}
                className={cn(
                    "py-2 px-1 font-bold text-xs rounded-lg transition-all duration-200 border-2",
                    isSelected 
                    ? "bg-lime-500 text-black border-lime-500 shadow-[2px_2px_0px_#a3e635]"
                    : "bg-black/50 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white"
                )}
                >
                <span>{slot}</span>
                </button>
            );
            })}
        </div>
      </div>

      <div className="h-px bg-zinc-800/50"></div>

      {/* Summary & Action */}
      <div>
        <button 
          onClick={handleBook}
          disabled={selectedSlots.length === 0}
          className="w-full bg-lime-500 text-black font-black uppercase tracking-widest py-4 rounded-xl text-sm hover:bg-lime-400 hover:-translate-y-1 transition-all disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[4px_4px_0px_#a3e635] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          {selectedSlots.length > 0 
             ? `Book - ₹${selectedSlots.length * selectedCourt.priceRaw}` 
             : 'Select Time'}
        </button>
      </div>
    </div>
  );
}
