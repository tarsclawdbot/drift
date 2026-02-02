"use client";

import { motion } from "framer-motion";
import { Compass, Heart, Sparkles, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-8 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 mb-6">
            <Compass className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            About Drift
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-8"
        >
          <section className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
            <h2 className="text-xl font-bold text-slate-100 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              The Problem
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Modern life is predictable. We fall into patterns — same routes, same restaurants, 
              same activities. This leads to monotony and the feeling that time is slipping away. 
              We crave novelty but decision fatigue makes it hard to think of new things to do.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
            <h2 className="text-xl font-bold text-slate-100 mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-400" />
              The Solution
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Drift removes the friction of deciding "what should I do?" by giving you beautifully 
              presented random prompts. Just open the app, pick your vibe, and get a fresh micro-adventure. 
              No overthinking. Just drift.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
            <h2 className="text-xl font-bold text-slate-100 mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              How It Works
            </h2>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-sm text-slate-300">1</span>
                <span>Choose a category or go wild with "All"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-sm text-slate-300">2</span>
                <span>Select your effort level — quick, committed, or full send</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-sm text-slate-300">3</span>
                <span>Draw a card and embrace the adventure</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-sm text-slate-300">4</span>
                <span>Save your favorites, share with friends</span>
              </li>
            </ul>
          </section>

          <section className="p-6 rounded-2xl bg-gradient-to-br from-violet-900/30 to-fuchsia-900/30 border border-violet-800/30">
            <h2 className="text-xl font-bold text-slate-100 mb-3">
              Categories
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-slate-300">
                <span>🎨</span> Creative
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span>💬</span> Social
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span>🌲</span> Outdoors
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span>📚</span> Learning
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span>🧘</span> Wellness
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span>🔥</span> Chaos
              </div>
            </div>
          </section>

          <div className="text-center pt-8 text-slate-500 text-sm">
            <p>Built with 💜 for the routine-breakers</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
