"use client";

import { motion } from "framer-motion";

interface EffortToggleProps {
  selected: string;
  onSelect: (effort: string) => void;
}

const efforts = [
  { id: "all", label: "Any", description: "Mix it up" },
  { id: "quick", label: "Quick", description: "5-15 min" },
  { id: "committed", label: "Committed", description: "30-60 min" },
  { id: "fullsend", label: "Full Send", description: "2+ hours" },
];

export default function EffortToggle({ selected, onSelect }: EffortToggleProps) {
  return (
    <div className="flex justify-center gap-2 px-4">
      {efforts.map((effort) => (
        <motion.button
          key={effort.id}
          onClick={() => onSelect(effort.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            flex flex-col items-center px-4 py-3 rounded-xl transition-all duration-300
            border min-w-[80px]
            ${selected === effort.id
              ? "bg-slate-700/80 border-cyan-400/50 shadow-lg shadow-cyan-500/10"
              : "bg-slate-800/30 border-slate-700/50 hover:border-slate-600"
            }
          `}
        >
          <span className={`text-sm font-semibold ${selected === effort.id ? "text-cyan-300" : "text-slate-300"}`}>
            {effort.label}
          </span>
          <span className="text-xs text-slate-500 mt-0.5">
            {effort.description}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
