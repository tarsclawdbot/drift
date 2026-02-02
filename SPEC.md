# Drift — Break the Routine

## Overview
Drift is a web app that serves you random micro-adventures, creative prompts, and spontaneous activities to break out of your daily routine. Think of it as a "shuffle" button for life.

## Problem
Modern life is predictable. We fall into patterns — same routes, same restaurants, same activities. This leads to monotony and the feeling that time is slipping away. People crave novelty but decision fatigue makes it hard to think of new things to do.

## Solution
Drift removes the friction of deciding "what should I do?" by giving you beautifully presented random prompts. Just open the app, pick your vibe, and get a fresh micro-adventure.

## Core Features

### 1. Prompt Categories
- **Creative** — Art projects, writing prompts, photography challenges
- **Social** — Connection prompts (text someone, compliment a stranger, etc.)
- **Outdoors** — Nature walks, urban exploration, weather-watching
- **Learning** — Learn something new in 30 minutes
- **Wellness** — Self-care, meditation, movement
- **Chaos** — Full random, anything goes

### 2. Effort Levels
- **Quick** — 5-15 minutes (can do right now)
- **Committed** — 30-60 minutes (need some time)
- **Full Send** — 2+ hours (make it an event)

### 3. Core Interactions
- **Draw a card** — Get a random prompt based on selected filters
- **Shuffle** — Don't like this one? Get another
- **Save** — Add to your personal drift list
- **Share** — Beautiful card to send to friends

### 4. Prompt Examples
- "Walk to the nearest body of water. Sit for 5 minutes."
- "Text someone you haven't talked to in 3+ months. Just say hi."
- "Order something you've never tried at a restaurant you've never been to."
- "Take 10 photos of interesting shadows."
- "Learn 5 phrases in a language you don't speak."
- "Write a letter to your future self, 1 year from now."
- "Find a bench with a view. People watch for 15 minutes."
- "Cook a dish from a country you've never visited."
- "Give 3 genuine compliments to strangers today."
- "Go somewhere within 10 miles you've never been. Explore for 1 hour."

## Design Direction

### Visual Style
- **Immersive, dreamy aesthetic** — Soft gradients, gentle animations
- **Card-based UI** — Each prompt is a beautiful, shareable card
- **Dark mode first** — Nighttime adventurers welcome
- **Organic shapes** — Rounded corners, flowing curves, nothing harsh
- **Subtle motion** — Cards float, shuffle animations, gentle parallax

### Color Palette
- Deep midnight blue (#0f172a) as base
- Warm sunset gradient accents (#f97316 → #ec4899 → #8b5cf6)
- Soft cream text for readability
- Glass morphism for cards

### Typography
- Modern, friendly sans-serif (Inter or similar)
- Large, bold prompt text
- Subtle, muted labels

### Animation
- Card flip/shuffle animation on draw
- Gentle floating idle animation
- Smooth category transitions
- Satisfying "save" animation

## Technical Stack
- **Next.js** with React
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **localStorage** for saving favorites
- **Static JSON** for prompt data (no backend needed)

## Pages/Views

### Home (Main View)
- Category pills at top
- Effort level toggle
- Large card area showing current prompt
- "Shuffle" button (primary action)
- Save/Share buttons

### Saved Drifts
- Grid of saved prompt cards
- Can remove or share

### About
- Brief explanation of the concept
- Credits

## File Structure
```
drift/
├── app/
│   ├── page.tsx              # Main prompt view
│   ├── saved/page.tsx        # Saved prompts
│   ├── about/page.tsx        # About page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── PromptCard.tsx        # The main prompt card
│   ├── CategoryPicker.tsx    # Category filter pills
│   ├── EffortToggle.tsx      # Effort level selector
│   ├── ShuffleButton.tsx     # Main action button
│   └── Navigation.tsx        # Bottom nav
├── data/
│   └── prompts.json          # All prompts with metadata
├── lib/
│   └── storage.ts            # localStorage helpers
├── public/
│   └── ...
├── tailwind.config.ts
├── package.json
└── README.md
```

## Prompt Data Schema
```json
{
  "id": "uuid",
  "text": "The prompt text...",
  "category": "creative|social|outdoors|learning|wellness|chaos",
  "effort": "quick|committed|fullsend",
  "emoji": "🎨"
}
```

## MVP Scope
1. Home page with prompt display
2. Category filtering
3. Effort level filtering
4. Shuffle animation
5. Save to localStorage
6. View saved prompts
7. Beautiful, polished UI
8. Mobile-first responsive design

## Post-MVP Ideas
- Daily drift notification
- Streak tracking (consecutive days of adventures)
- Community submitted prompts
- Location-aware prompts
- Seasonal/weather prompts
- Group drift mode (spin for the whole group)

---

**Build Notes:**
- Use Next.js with React
- Make it feel magical, not utilitarian
- Every interaction should feel satisfying
- Dark mode preferred, light mode optional

---

## Frontend Design Direction (CRITICAL)

**DO NOT** use generic AI aesthetics:
- No Inter, Roboto, Arial, or system fonts
- No purple gradients on white backgrounds
- No cookie-cutter Tailwind components
- No predictable layouts

**DO** create something distinctive:
- **Typography**: Use bold, characterful fonts. Consider: Clash Display, Cabinet Grotesk, Satoshi, or something unexpected. Pair with a refined body font.
- **Color**: Deep, immersive dark theme with warm organic accent colors. Think sunset over ocean vibes — not corporate SaaS.
- **Motion**: Meaningful animations. Card shuffle should feel satisfying. Framer Motion for React.
- **Atmosphere**: Add depth with noise textures, subtle gradients, soft glows. This should feel like opening a treasure chest, not clicking a button.
- **Layout**: Cards should feel tactile. Consider slight rotation, shadows that respond to interaction.

**Aesthetic direction**: Dreamy exploration. Like a compass pointing to adventure. Warm, inviting, mysterious. Not gamified or childish — sophisticated spontaneity.

**One memorable thing**: The shuffle animation should be the hero moment. Make it feel like destiny is being revealed.
