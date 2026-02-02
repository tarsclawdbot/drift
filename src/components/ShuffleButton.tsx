"use client";

import { motion } from "framer-motion";

interface ShuffleButtonProps {
  onClick: () => void;
  isShuffling: boolean;
}

export default function ShuffleButton({ onClick, isShuffling }: ShuffleButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={isShuffling}
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.99 }}
      className="
        relative overflow-hidden
        px-12 py-5
        bg-[#2c2419] text-[#f5f1e8]
        font-mono text-sm tracking-[0.2em]
        border-4 border-[#2c2419]
        disabled:opacity-60 disabled:cursor-not-allowed
        transition-all duration-200
        group
        shadow-[8px_8px_0_0_#d4c8b0]
        hover:shadow-[4px_4px_0_0_#d4c8b0]
        hover:translate-x-1 hover:translate-y-1
      "
    >
      <span className="relative flex items-center gap-3">
        <motion.span
          animate={isShuffling ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.8, repeat: isShuffling ? Infinity : 0, ease: "linear" }}
          className="text-lg"
        >
          ✦
        </motion.span>
        {isShuffling ? "DRAWING..." : "DRAW CARD"}
      </span>
      
      {/* Ink bleed effect on hover */}
      <div className="absolute inset-0 bg-[#c75b39] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
    </motion.button>
  );
}
