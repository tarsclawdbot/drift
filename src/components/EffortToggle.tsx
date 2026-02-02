"use client";

import { motion } from "framer-motion";

interface EffortToggleProps {
  selected: string;
  onSelect: (effort: string) => void;
}

const efforts = [
  { id: "all", label: "ANY", description: "" },
  { id: "quick", label: "QUICK", description: "5-15 MIN" },
  { id: "committed", label: "DEEP", description: "30-60 MIN" },
  { id: "fullsend", label: "ALL IN", description: "2+ HOURS" },
];

export default function EffortToggle({ selected, onSelect }: EffortToggleProps) {
  return (
    <div className="flex justify-center gap-1 px-4">
      {efforts.map((effort) => (
        <motion.button
          key={effort.id}
          onClick={() => onSelect(effort.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            flex flex-col items-center px-5 py-3 transition-all duration-200
            border-2 min-w-[90px] relative
            ${selected === effort.id
              ? "bg-[#c75b39]/10 border-[#c75b39] text-[#c75b39]"
              : "bg-transparent border-[#d4c8b0] text-[#5a5040] hover:border-[#8a7a62]"
            }
          `}
        >
          <span className={`text-xs font-bold tracking-[0.1em] ${selected === effort.id ? "text-[#c75b39]" : ""}`}>
            {effort.label}
          </span>
          {effort.description && (
            <span className="text-[10px] font-mono tracking-wider opacity-60 mt-0.5">
              {effort.description}
            </span>
          )}
        </motion.button>
      ))}
    </div>
  );
}
