"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import promptsData from "@/data/prompts.json";
import { getSavedPrompts, unsavePrompt } from "@/lib/storage";
import { Share2, Trash2 } from "lucide-react";

interface Prompt {
  id: string;
  text: string;
  category: string;
  effort: string;
  emoji: string;
}

const prompts: Prompt[] = promptsData;

const effortLabels: Record<string, string> = {
  quick: "QUICK",
  committed: "DEEP",
  fullsend: "ALL IN",
};

const categoryIcons: Record<string, string> = {
  creative: "◆",
  social: "◈",
  outdoors: "▲",
  learning: "●",
  wellness: "○",
  chaos: "✶",
};

export default function SavedPage() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [savedPrompts, setSavedPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    const ids = getSavedPrompts();
    setSavedIds(ids);
    setSavedPrompts(prompts.filter((p) => ids.includes(p.id)));
  }, []);

  const handleUnsave = (id: string) => {
    unsavePrompt(id);
    const newIds = savedIds.filter((i) => i !== id);
    setSavedIds(newIds);
    setSavedPrompts(prompts.filter((p) => newIds.includes(p.id)));
  };

  const handleShare = async (prompt: Prompt) => {
    const text = `${prompt.emoji} ${prompt.text}\n\n— from DRIFT`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "DRIFT",
          text: text,
        });
      } catch {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f1e8] pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-5xl md:text-6xl font-bold text-[#2c2419] mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            ARCHIVE
          </h1>
          <p className="text-[#5a5040] font-mono text-sm tracking-widest">
            YOUR COLLECTED ADVENTURES
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-12 bg-[#c75b39]" />
            <span className="text-[#c75b39]">✦</span>
            <div className="h-px w-12 bg-[#c75b39]" />
          </div>
        </motion.div>

        {savedPrompts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4 opacity-20">✦</div>
            <p className="text-[#5a5040] font-mono text-sm tracking-widest mb-2">
              NO SAVED CARDS
            </p>
            <p className="text-[#8a7a62] text-sm">
              Draw some cards and archive your favorites
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {savedPrompts.map((prompt, index) => {
              const rotation = ((index % 5) - 2) * 0.5;
              return (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative group"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <div className="bg-[#faf8f3] p-3 pb-4 shadow-[6px_6px_0_0_#d4c8b0] border border-[#d4c8b0]">
                    <div className="bg-[#2c2419] p-4 aspect-[4/3] flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <span className="text-2xl">{prompt.emoji}</span>
                        <span className="text-[10px] font-mono text-[#a09078] tracking-wider">
                          {effortLabels[prompt.effort]}
                        </span>
                      </div>
                      
                      <p className="text-[#f5f1e8] text-sm leading-relaxed">
                        {prompt.text}
                      </p>
                      
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[#a09078] text-xs font-mono">
                          {categoryIcons[prompt.category]} {prompt.category}
                        </span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleShare(prompt)}
                        className="flex-1 py-2 border border-[#d4c8b0] text-[#5a5040] hover:border-[#c9a227] hover:text-[#c9a227] transition-colors font-mono text-xs tracking-wider"
                      >
                        <Share2 className="w-3 h-3 inline mr-1" />
                        SHARE
                      </button>
                      <button
                        onClick={() => handleUnsave(prompt.id)}
                        className="flex-1 py-2 border border-[#d4c8b0] text-[#5a5040] hover:border-[#c75b39] hover:text-[#c75b39] transition-colors font-mono text-xs tracking-wider"
                      >
                        <Trash2 className="w-3 h-3 inline mr-1" />
                        REMOVE
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Count footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12 text-[#8a7a62] font-mono text-xs tracking-widest"
        >
          <p>{savedPrompts.length} CARD{savedPrompts.length !== 1 ? 'S' : ''} ARCHIVED</p>
        </motion.div>
      </div>
    </main>
  );
}
