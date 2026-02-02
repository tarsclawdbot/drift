"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f5f1e8] pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-5xl md:text-6xl font-bold text-[#2c2419] mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            ABOUT
          </h1>
          
          {/* Decorative stamp */}
          <div className="flex justify-center mt-4">
            <div className="border-2 border-dashed border-[#c75b39] px-4 py-1 transform -rotate-3">
              <span className="text-[#c75b39] font-mono text-xs tracking-[0.2em]">
                EST. 2026
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-8"
        >
          {/* Manifesto card */}
          <div className="bg-[#faf8f3] p-8 shadow-[8px_8px_0_0_#d4c8b0] border border-[#d4c8b0]">
            <h2 className="font-mono text-xs tracking-[0.2em] text-[#8a7a62] mb-4">
              THE PROBLEM
            </h2>
            <p className="text-[#2c2419] text-lg leading-relaxed mb-4">
              Modern life is predictable. We fall into patterns — same routes, same restaurants, 
              same routines. Time starts to blur together.
            </p>
            <p className="text-[#5a5040] leading-relaxed">
              We crave novelty but decision fatigue makes it hard to think of new things to do. 
              The spark of spontaneity fades into the background.
            </p>
          </div>

          <div className="bg-[#2c2419] p-8 shadow-[8px_8px_0_0_#c75b39] text-[#f5f1e8]">
            <h2 className="font-mono text-xs tracking-[0.2em] text-[#c75b39] mb-4">
              THE SOLUTION
            </h2>
            <p className="text-xl leading-relaxed mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
              DRIFT removes the friction of deciding "what should I do?"
            </p>
            <p className="text-[#a09078] leading-relaxed">
              Each card is a small portal to something unexpected. A micro-adventure, 
              a creative prompt, a moment of spontaneity. You don't choose — 
              you simply draw, and let chance guide you.
            </p>
          </div>

          {/* Categories */}
          <div className="bg-[#faf8f3] p-8 shadow-[8px_8px_0_0_#d4c8b0] border border-[#d4c8b0]">
            <h2 className="font-mono text-xs tracking-[0.2em] text-[#8a7a62] mb-6">
              THE CATEGORIES
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: "◆", name: "CREATIVE", desc: "Art, writing, making" },
                { icon: "◈", name: "SOCIAL", desc: "Connection, people" },
                { icon: "▲", name: "OUTDOORS", desc: "Nature, exploration" },
                { icon: "●", name: "LEARNING", desc: "Skills, knowledge" },
                { icon: "○", name: "WELLNESS", desc: "Mind, body, rest" },
                { icon: "✶", name: "CHAOS", desc: "The unexpected" },
              ].map((cat) => (
                <div key={cat.name} className="text-center p-3 border border-[#e0d8c8]">
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <div className="font-mono text-xs tracking-wider text-[#2c2419]">{cat.name}</div>
                  <div className="text-[10px] text-[#8a7a62]">{cat.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Effort levels */}
          <div className="flex justify-center gap-4">
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-[#3d5a4a] flex items-center justify-center mb-2">
                <span className="font-mono text-xs text-[#3d5a4a] tracking-wider">5-15<br/>MIN</span>
              </div>
              <span className="font-mono text-xs text-[#8a7a62]">QUICK</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-[#c9a227] flex items-center justify-center mb-2">
                <span className="font-mono text-xs text-[#c9a227] tracking-wider">30-60<br/>MIN</span>
              </div>
              <span className="font-mono text-xs text-[#8a7a62]">DEEP</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-[#c75b39] flex items-center justify-center mb-2">
                <span className="font-mono text-xs text-[#c75b39] tracking-wider">2+<br/>HR</span>
              </div>
              <span className="font-mono text-xs text-[#8a7a62]">ALL IN</span>
            </div>
          </div>

          {/* Quote */}
          <div className="text-center py-8 border-t border-b border-[#d4c8b0]">
            <p className="text-xl text-[#2c2419] italic mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
              "Not all those who wander are lost."
            </p>
            <p className="font-mono text-xs text-[#8a7a62] tracking-widest">
              — J.R.R. TOLKIEN
            </p>
          </div>

          {/* Footer */}
          <div className="text-center text-[#8a7a62] font-mono text-xs tracking-widest">
            <p>BUILT FOR THE RESTLESS</p>
            <p className="mt-2 text-[#c75b39]">✦</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
