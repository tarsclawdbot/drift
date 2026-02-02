"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import promptsData from "@/data/prompts.json";
import CategoryPicker from "@/components/CategoryPicker";
import EffortToggle from "@/components/EffortToggle";
import ShuffleButton from "@/components/ShuffleButton";
import PromptCard from "@/components/PromptCard";
import { savePrompt, unsavePrompt } from "@/lib/storage";

interface Prompt {
  id: string;
  text: string;
  category: string;
  effort: string;
  emoji: string;
}

const prompts: Prompt[] = promptsData;

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedEffort, setSelectedEffort] = useState("all");
  const [currentPrompt, setCurrentPrompt] = useState<Prompt | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [drawCount, setDrawCount] = useState(0);

  // Load saved prompts on mount
  useEffect(() => {
    const loadSaved = () => {
      const saved = localStorage.getItem("drift_saved_prompts");
      if (saved) {
        setSavedIds(JSON.parse(saved));
      }
    };
    loadSaved();
    window.addEventListener("storage", loadSaved);
    return () => window.removeEventListener("storage", loadSaved);
  }, []);

  const getFilteredPrompts = useCallback(() => {
    return prompts.filter((p) => {
      const categoryMatch = selectedCategory === "all" || p.category === selectedCategory;
      const effortMatch = selectedEffort === "all" || p.effort === selectedEffort;
      return categoryMatch && effortMatch;
    });
  }, [selectedCategory, selectedEffort]);

  const drawCard = useCallback(() => {
    setIsShuffling(true);
    const filtered = getFilteredPrompts();
    
    if (filtered.length === 0) {
      setIsShuffling(false);
      return;
    }

    // Shuffle animation effect
    let count = 0;
    const maxShuffles = 6;
    const interval = setInterval(() => {
      const randomPrompt = filtered[Math.floor(Math.random() * filtered.length)];
      setCurrentPrompt(randomPrompt);
      count++;
      
      if (count >= maxShuffles) {
        clearInterval(interval);
        const finalPrompt = filtered[Math.floor(Math.random() * filtered.length)];
        setCurrentPrompt(finalPrompt);
        setIsShuffling(false);
        setDrawCount(prev => prev + 1);
      }
    }, 80);
  }, [getFilteredPrompts]);

  const handleSave = () => {
    if (!currentPrompt) return;
    
    if (savedIds.includes(currentPrompt.id)) {
      unsavePrompt(currentPrompt.id);
      setSavedIds(savedIds.filter((id) => id !== currentPrompt.id));
    } else {
      savePrompt(currentPrompt.id);
      setSavedIds([...savedIds, currentPrompt.id]);
    }
  };

  const handleShare = async () => {
    if (!currentPrompt) return;
    
    const text = `${currentPrompt.emoji} ${currentPrompt.text}\n\n— from DRIFT`;
    
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
      {/* Background texture */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24px,#d4c8b0_25px)] bg-[length:100%_25px]" />
      </div>

      <div className="max-w-3xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* Postmark */}
          <div className="flex justify-center mb-6">
            <div className="postmark border-2 border-[#8a7a62] rounded-full px-4 py-2 text-[#8a7a62] text-xs uppercase tracking-[0.2em] font-mono transform -rotate-12">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>

          <h1 
            className="text-6xl md:text-8xl font-bold text-[#2c2419] mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            DRIFT
          </h1>
          
          <p className="text-[#5a5040] text-lg max-w-md mx-auto font-mono text-sm tracking-wide">
            A collection of micro-adventures for the restless soul
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-px w-16 bg-[#c75b39]" />
            <span className="text-[#c75b39] text-lg">✦</span>
            <div className="h-px w-16 bg-[#c75b39]" />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 space-y-4"
        >
          <CategoryPicker
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
          <EffortToggle
            selected={selectedEffort}
            onSelect={setSelectedEffort}
          />
        </motion.div>

        {/* Prompt Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <PromptCard
            prompt={currentPrompt}
            isSaved={currentPrompt ? savedIds.includes(currentPrompt.id) : false}
            onSave={handleSave}
            onShare={handleShare}
            drawCount={drawCount}
          />
        </motion.div>

        {/* Shuffle Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <ShuffleButton onClick={drawCard} isShuffling={isShuffling} />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 text-[#8a7a62] font-mono text-xs tracking-widest"
        >
          <p>{prompts.length} ADVENTURES IN THE ARCHIVE</p>
          {drawCount > 0 && (
            <p className="mt-2 text-[#c75b39]">{drawCount} CARD{drawCount !== 1 ? 'S' : ''} DRAWN</p>
          )}
        </motion.div>
      </div>
    </main>
  );
}
