"use client";

import { motion } from "framer-motion";

interface CategoryPickerProps {
  selected: string;
  onSelect: (category: string) => void;
}

const categories = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "creative", label: "Creative", emoji: "🎨" },
  { id: "social", label: "Social", emoji: "💬" },
  { id: "outdoors", label: "Outdoors", emoji: "🌲" },
  { id: "learning", label: "Learning", emoji: "📚" },
  { id: "wellness", label: "Wellness", emoji: "🧘" },
  { id: "chaos", label: "Chaos", emoji: "🔥" },
];

export default function CategoryPicker({ selected, onSelect }: CategoryPickerProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-4">
      {categories.map((cat) => (
        <motion.button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
            border backdrop-blur-sm
            ${selected === cat.id
              ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-transparent shadow-lg shadow-orange-500/25"
              : "bg-slate-800/50 text-slate-300 border-slate-700 hover:border-slate-500 hover:bg-slate-700/50"
            }
          `}
        >
          <span className="mr-1">{cat.emoji}</span>
          {cat.label}
        </motion.button>
      ))}
    </div>
  );
}
