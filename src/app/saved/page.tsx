"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import promptsData from "@/data/prompts.json";
import { getSavedPrompts, unsavePrompt } from "@/lib/storage";
import { Trash2, Share2 } from "lucide-react";

interface Prompt {
  id: string;
  text: string;
  category: string;
  effort: string;
  emoji: string;
}

const prompts: Prompt[] = promptsData;

const categoryColors: Record<string, string> = {
  creative: "from-pink-500 to-rose-500",
  social: "from-cyan-500 to-blue-500",
  outdoors: "from-emerald-500 to-teal-500",
  learning: "from-amber-500 to-orange-500",
  wellness: "from-violet-500 to-purple-500",
  chaos: "from-red-500 to-pink-600",
};

const effortLabels: Record<string, string> = {
  quick: "⚡",
  committed: "🔥",
  fullsend: "🚀",
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
    const text = `${prompt.emoji} ${prompt.text}\n\n— From Drift`;
    
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
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Saved Drifts
          </h1>
          <p className="text-slate-400 text-lg">
            Your collection of adventures waiting to happen
          </p>
        </motion.div>

        {savedPrompts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-slate-500 text-lg mb-4">No saved drifts yet</p>
            <p className="text-slate-600">
              Go back home and draw some cards you love!
            </p>
          </motion.div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {savedPrompts.map((prompt, index) => {
              const gradient = categoryColors[prompt.category] || "from-slate-500 to-slate-600";
              return (
                <motion.div
                  key={prompt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative group"
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-30 blur rounded-2xl transition-opacity`} />
                  <div className="relative p-6 rounded-2xl bg-slate-900/80 border border-slate-800 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{prompt.emoji}</span>
                      <span className="text-lg" title={prompt.effort}>
                        {effortLabels[prompt.effort]}
                      </span>
                    </div>
                    
                    <p className="text-slate-200 mb-4 flex-grow" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {prompt.text}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                      <span className="text-xs text-slate-500 uppercase tracking-wider">
                        {prompt.category}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleShare(prompt)}
                          className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleUnsave(prompt.id)}
                          className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
