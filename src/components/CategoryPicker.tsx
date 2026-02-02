"use client";

import { motion } from "framer-motion";

interface CategoryPickerProps {
  selected: string;
  onSelect: (category: string) => void;
}

const categories = [
  { id: "all", label: "ALL", emoji: "✦" },
  { id: "creative", label: "CREATIVE", emoji: "◆" },
  { id: "social", label: "SOCIAL", emoji: "◈" },
  { id: "outdoors", label: "OUTDOORS", emoji: "▲" },
  { id: "learning", label: "LEARNING", emoji: "●" },
  { id: "wellness", label: "WELLNESS", emoji: "○" },
  { id: "chaos", label: "CHAOS", emoji: "✶" },
];

export default function CategoryPicker({ selected, onSelect }: CategoryPickerProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-4">
      {categories.map((cat) => (
        <motion.button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          className={`
            px-4 py-2 text-xs font-mono tracking-[0.15em] transition-all duration-200
            border-2 relative overflow-hidden
            ${selected === cat.id
              ? "bg-[#2c2419] text-[#f5f1e8] border-[#2c2419]"
              : "bg-transparent text-[#5a5040] border-[#d4c8b0] hover:border-[#8a7a62] hover:text-[#2c2419]"
            }
          `}
        >
          <span className="mr-1.5 opacity-70">{cat.emoji}</span>
          {cat.label}
          {selected === cat.id && (
            <motion.div
              layoutId="category-active"
              className="absolute inset-0 bg-[#2c2419] -z-10"
              transition={{ type: "spring", duration: 0.4 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}
