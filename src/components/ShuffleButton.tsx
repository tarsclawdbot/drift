"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ShuffleButtonProps {
  onClick: () => void;
  isShuffling: boolean;
}

export default function ShuffleButton({ onClick, isShuffling }: ShuffleButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={isShuffling}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="
        relative overflow-hidden
        px-8 py-4 rounded-2xl
        bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600
        text-white font-bold text-lg
        shadow-xl shadow-fuchsia-500/25
        disabled:opacity-70 disabled:cursor-not-allowed
        transition-all duration-300
        group
      "
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-600 via-fuchsia-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      <span className="relative flex items-center gap-2">
        <motion.span
          animate={isShuffling ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 1, repeat: isShuffling ? Infinity : 0, ease: "linear" }}
        >
          <Sparkles className="w-5 h-5" />
        </motion.span>
        {isShuffling ? "Drawing..." : "Draw a Card"}
      </span>
    </motion.button>
  );
}
