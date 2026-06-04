import { 
  Trophy,
  Activity,
  Target,
  CircleDot,
  Goal,
} from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const SPORTS_CATEGORIES = [
  { id: "Football", label: "Football", icon: Goal },
  { id: "Cricket", label: "Box Cricket", icon: Target },
  { id: "Tennis", label: "Tennis", icon: Activity },
  { id: "Basketball", label: "Basketball", icon: CircleDot },
  { id: "Badminton", label: "Badminton", icon: Trophy },
];

interface SportsFilterProps {
  selectedSports: string[];
  onToggle: (id: string) => void;
  visibleCategories?: string[];
}

export default function SportsFilter({ selectedSports, onToggle, visibleCategories }: SportsFilterProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className="bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900 sticky top-[90px] z-40">
        <div className="container mx-auto py-0.5">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar px-4 py-2.5">
             {SPORTS_CATEGORIES.filter((s: { id: string }) => !visibleCategories || visibleCategories.includes(s.id)).map((sport: { id: string, label: string, icon: any }, idx: number) => {
               const Icon = sport.icon;
               const isSelected = selectedSports.includes(sport.id);
               return (
                 <button 
                    key={sport.id}
                    onClick={() => onToggle(sport.id)}
                    className={`
                      flex items-center gap-1.5 px-3.5 py-1.5 transition-all duration-200 shrink-0 cursor-pointer -skew-x-12 border
                      ${isSelected 
                        ? 'bg-lime-500 text-black border-lime-500 shadow-[3px_3px_0px_rgba(0,0,0,0.1)] font-black uppercase italic' 
                        : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-bold uppercase'
                      }
                    `}
                 >
                    <div className="skew-x-12 flex items-center gap-1.5">
                      <span className={`text-[8px] ${isSelected ? 'text-black/40' : 'text-lime-600/40'}`}>0{idx + 1}</span>
                      <Icon className={`w-3.5 h-3.5 ${isSelected ? 'stroke-[3.5px]' : 'stroke-[1.5]'}`} />
                      <span className="text-[10px] tracking-wider">{sport.label}</span>
                    </div>
                 </button>
               );
             })}
          </div>
        </div>
      </div>
  );
}
