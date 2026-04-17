# Alter-Ego
**Borrow a better brain.**

[![Alter-Ego Council Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID/hqdefault.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

Alter-Ego is a highly stylized, decision-support web application that generates 5 diverse "cognitive lenses" (4 Domain Titans + 1 Chaotic Outlier) to analyze your specific situations. It leverages the new official `@google/genai` SDK and the `gemini-3-flash-preview` model for blazingly fast, token-optimized generations.

## ✨ Features
* **Stateless Token Optimization**: Employs raw schema formatting (`Type.OBJECT`) via native GenAI configurations instead of using cumbersome system prompts.
* **The "Reveal" UX:** A beautiful, responsive glassmorphism UI. Advice cards remain heavily blurred (concealing their contents) until clicked, fading in with a glowing pulse animation.
* **Magnetic Prompt Logic:** Personas are instructed to offer bold, vernacular-heavy, and occasionally controversial advice within tight 30-word limits—preventing LLM safe-play and boredom.
* **The Chaos Agent**: The 5th slot is perpetually reserved for exactly what you don't need—a medieval knight or a caffeinated squirrel offering lateral advice on your corporate mergers.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A Gemini API Key from Google AI Studio.

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Establish your Environment Variables:
Create a `.env` file in the root directory and add your API key:
```env
GEMINI_API_KEY="your_api_key_here"
```

3. Summon the Council:
```bash
npm run dev
```

Navigate to `http://localhost:5173` to start borrowing brains.

## ⚙️ Tech Stack
* **Vite + React.js**
* **Vanilla CSS** (Custom keyframes, deep variable theming, and backdrop-filters)
* **@google/genai SDK** ✨

## 🧠 Example Master-Prompt Output
* **User Input:** *"I bought 5000 units of a meme coin and it crashed 80%. Should I sell or hold?"*
* **Response:** Four crypto titans advising you to either HODL or cut risk, while a **14th-Century Pirate** screams at you to grab your remaining loot and burn the deck.

---
*Created as part of an Advanced Agentic Coding session with Antigravity.*
