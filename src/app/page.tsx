"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import promptsData from "@/data/prompts.json";
import CategoryPicker from "@/components/CategoryPicker";
import EffortToggle from "@/components/EffortToggle";
import ShuffleButton from "@/components/ShuffleButton";
import PromptCard from "@/components/PromptCard";
import { savePrompt, unsavePrompt, isPromptSaved } from "@/lib/storage";

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
  const [showConfetti, setShowConfetti] = useState(false);

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
    const maxShuffles = 8;
    const interval = setInterval(() => {
      const randomPrompt = filtered[Math.floor(Math.random() * filtered.length)];
      setCurrentPrompt(randomPrompt);
      count++;
      
      if (count >= maxShuffles) {
        clearInterval(interval);
        const finalPrompt = filtered[Math.floor(Math.random() * filtered.length)];
        setCurrentPrompt(finalPrompt);
        setIsShuffling(false);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1000);
      }
    }, 100);
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
    
    const text = `${currentPrompt.emoji} ${currentPrompt.text}\n\n— From Drift`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Drift",
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
    <main className="min-h-screen bg-slate-950 pt-24 pb-8 px-4">
      {/* Confetti effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 1, 
                  x: 0, 
                  y: 0, 
                  scale: 0,
                  rotate: 0 
                }}
                animate={{ 
                  opacity: 0, 
                  x: (Math.random() - 0.5) * 400, 
                  y: (Math.random() - 0.5) * 400,
                  scale: Math.random() * 2 + 0.5,
                  rotate: Math.random() * 720 
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: ["#f472b6", "#a78bfa", "#22d3ee", "#fbbf24", "#34d399"][i % 5],
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto">
        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Break the Routine
          </h1>
          <p className="text-slate-400 text-lg max-w-md mx-auto">
            Draw a card. Get a micro-adventure. Shake up your day.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
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
          className="mb-8"
        >
          <PromptCard
            prompt={currentPrompt}
            isSaved={currentPrompt ? savedIds.includes(currentPrompt.id) : false}
            onSave={handleSave}
            onShare={handleShare}
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
          className="text-center mt-16 text-slate-600 text-sm"
        >
          <p>{prompts.length} adventures waiting for you</p>
        </motion.div>
      </div>
    </main>
  );
}
