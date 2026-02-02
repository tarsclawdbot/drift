"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Share2, Check } from "lucide-react";

interface Prompt {
  id: string;
  text: string;
  category: string;
  effort: string;
  emoji: string;
}

interface PromptCardProps {
  prompt: Prompt | null;
  isSaved: boolean;
  onSave: () => void;
  onShare: () => void;
  drawCount: number;
}

const effortStamps: Record<string, { text: string; color: string }> = {
  quick: { text: "QUICK HIT", color: "#3d5a4a" },
  committed: { text: "DEEP DIVE", color: "#c9a227" },
  fullsend: { text: "ALL IN", color: "#c75b39" },
};

const categoryIcons: Record<string, string> = {
  creative: "◆",
  social: "◈",
  outdoors: "▲",
  learning: "●",
  wellness: "○",
  chaos: "✶",
};

export default function PromptCard({ prompt, isSaved, onSave, onShare, drawCount }: PromptCardProps) {
  if (!prompt) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div 
          className="bg-[#faf8f3] p-3 pb-16 shadow-[8px_8px_0_0_#d4c8b0] border border-[#d4c8b0]"
          style={{ transform: 'rotate(-0.5deg)' }}
        >
          <div className="aspect-[4/5] bg-[#f0ece0] border-2 border-dashed border-[#d4c8b0] flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4 opacity-30">✦</div>
              <p className="text-[#8a7a62] font-mono text-sm tracking-widest">
                DRAW A CARD
              </p>
              <p className="text-[#a09078] text-xs mt-2 italic">
                Begin your journey
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const effort = effortStamps[prompt.effort] || { text: "ADVENTURE", color: "#5a5040" };
  const rotation = ((parseInt(prompt.id) % 7) - 3) * 0.3; // Slight random rotation

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${prompt.id}-${drawCount}`}
          initial={{ opacity: 0, y: 30, rotate: rotation - 2 }}
          animate={{ opacity: 1, y: 0, rotate: rotation }}
          exit={{ opacity: 0, y: -20, rotate: rotation + 2, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          {/* Polaroid frame */}
          <div 
            className="bg-[#faf8f3] p-3 pb-6 shadow-[12px_12px_0_0_rgba(44,36,25,0.08)] border border-[#e0d8c8]"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {/* Photo area */}
            <div className="relative bg-[#2c2419] aspect-[4/5] overflow-hidden">
              {/* Vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(44,36,25,0.4)_100%)] z-10" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-20">
                {/* Top row - icon and stamp */}
                <div className="flex items-start justify-between">
                  <motion.span
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-3xl"
                  >
                    {prompt.emoji}
                  </motion.span>
                  
                  {/* Effort stamp */}
                  <motion.div
                    initial={{ opacity: 0, scale: 1.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="border-2 border-dashed px-2 py-1 transform rotate-[-8deg]"
                    style={{ borderColor: effort.color, color: effort.color }}
                  >
                    <span className="text-[10px] font-bold tracking-[0.15em]">
                      {effort.text}
                    </span>
                  </motion.div>
                </div>

                {/* Prompt text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex-grow flex items-center"
                >
                  <h2 
                    className="text-xl md:text-2xl font-bold text-[#f5f1e8] leading-relaxed"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {prompt.text}
                  </h2>
                </motion.div>

                {/* Category */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-[#a09078] text-sm">{categoryIcons[prompt.category]}</span>
                  <span className="text-[#a09078] text-xs font-mono tracking-[0.2em] uppercase">
                    {prompt.category}
                  </span>
                </motion.div>
              </div>

              {/* Film grain overlay */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />
            </div>

            {/* Bottom margin - polaroid style */}
            <div className="h-4" />

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-3 px-1"
            >
              <button
                onClick={onSave}
                className={`
                  flex-1 flex items-center justify-center gap-2 py-3
                  border-2 transition-all duration-200 font-mono text-xs tracking-wider
                  ${isSaved
                    ? "bg-[#3d5a4a]/10 border-[#3d5a4a] text-[#3d5a4a]"
                    : "bg-transparent border-[#d4c8b0] text-[#5a5040] hover:border-[#3d5a4a] hover:text-[#3d5a4a]"
                  }
                `}
              >
                {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                {isSaved ? "ARCHIVED" : "ARCHIVE"}
              </button>

              <button
                onClick={onShare}
                className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-[#d4c8b0] text-[#5a5040] hover:border-[#c9a227] hover:text-[#c9a227] transition-all duration-200 font-mono text-xs tracking-wider"
              >
                <Share2 className="w-4 h-4" />
                SHARE
              </button>
            </motion.div>
          </div>

          {/* Postmark decoration */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -top-3 -right-3 w-16 h-16 border-2 border-[#8a7a62] rounded-full flex items-center justify-center transform rotate-12 pointer-events-none"
          >
            <span className="text-[8px] font-mono text-[#8a7a62] text-center leading-tight">
              OFFICIAL<br/>DRIFT
            </span>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
