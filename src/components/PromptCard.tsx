"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Bookmark, Check } from "lucide-react";

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
}

const categoryColors: Record<string, string> = {
  creative: "from-pink-500 to-rose-500",
  social: "from-cyan-500 to-blue-500",
  outdoors: "from-emerald-500 to-teal-500",
  learning: "from-amber-500 to-orange-500",
  wellness: "from-violet-500 to-purple-500",
  chaos: "from-red-500 to-pink-600",
};

const effortLabels: Record<string, string> = {
  quick: "⚡ Quick",
  committed: "🔥 Committed",
  fullsend: "🚀 Full Send",
};

export default function PromptCard({ prompt, isSaved, onSave, onShare }: PromptCardProps) {
  if (!prompt) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="aspect-[4/5] rounded-3xl bg-slate-800/30 border border-slate-700/50 flex items-center justify-center">
          <p className="text-slate-500 text-lg">Draw a card to begin...</p>
        </div>
      </div>
    );
  }

  const gradient = categoryColors[prompt.category] || "from-slate-500 to-slate-600";

  return (
    <div className="w-full max-w-md mx-auto perspective-1000">
      <AnimatePresence mode="wait">
        <motion.div
          key={prompt.id}
          initial={{ opacity: 0, y: 20, rotateY: -10 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          exit={{ opacity: 0, y: -20, rotateY: 10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative"
        >
          {/* Card glow effect */}
          <div className={`absolute -inset-1 bg-gradient-to-br ${gradient} opacity-20 blur-xl rounded-3xl`} />
          
          {/* Main card */}
          <div className="relative aspect-[4/5] rounded-3xl bg-slate-900 border border-slate-700/50 overflow-hidden shadow-2xl">
            {/* Top gradient bar */}
            <div className={`h-2 w-full bg-gradient-to-r ${gradient}`} />
            
            {/* Content */}
            <div className="p-8 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="text-5xl"
                >
                  {prompt.emoji}
                </motion.span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${gradient} text-white`}>
                  {effortLabels[prompt.effort]}
                </span>
              </div>

              {/* Prompt text */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl font-bold text-slate-100 leading-relaxed flex-grow"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {prompt.text}
              </motion.h2>

              {/* Category badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6"
              >
                <span className="text-sm text-slate-500 uppercase tracking-wider">
                  {prompt.category}
                </span>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-3 mt-8"
              >
                <button
                  onClick={onSave}
                  className={`
                    flex-1 flex items-center justify-center gap-2 py-3 rounded-xl
                    border transition-all duration-300
                    ${isSaved
                      ? "bg-pink-500/20 border-pink-500/50 text-pink-400"
                      : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-pink-500/50 hover:text-pink-400"
                    }
                  `}
                >
                  {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  <span className="text-sm font-medium">
                    {isSaved ? "Saved" : "Save"}
                  </span>
                </button>

                <button
                  onClick={onShare}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
