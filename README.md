# 🕹️ US States & Capitals - 8-Bit Learning Game

An addictive retro-style geography learning game where players race against time to identify all 50 US states and their capitals.

## 🎮 **Game Features**

### **🎯 Core Gameplay**
- **50 State Challenge**: Complete all US states in randomized order
- **Two-Phase Questions**: Identify state shape → Choose capital
- **High Stakes**: One wrong answer = Game Over
- **Speed Challenge**: Race against the clock for leaderboard position

### **🔊 8-Bit Experience**
- **Retro Visual Design**: Classic Game Boy inspired green color scheme
- **Pixel Perfect**: Press Start 2P font, pixel-art styling
- **Authentic Sounds**: Programmatically generated 8-bit audio effects
- **Smooth Animations**: Success/fail screens with retro transitions

### **♿ Accessibility First**
- **Full Keyboard Support**: Arrow keys + Enter + ESC navigation
- **Screen Reader Friendly**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear visual focus indicators
- **Mobile Responsive**: Touch and keyboard input on all devices

### **🏆 Competitive Features**
- **Precision Timer**: Millisecond accuracy with top-right display
- **Hall of Fame**: Persistent leaderboard via Shopify Quick.db
- **Initials Entry**: Classic arcade-style score saving
- **Challenge Mode**: Beat the top times

## 🎲 **Game Mechanics**

### **Question Structure**
1. **State Identification**: View state shape outline → Choose from 3 state names
2. **Capital Selection**: Choose capital from 3 options:
   - ✅ Correct capital (for the actual state)
   - 🎯 Capital of state you selected in Q1
   - 🎲 Random other state capital

### **Smart Answer Generation**
- **No Duplicates**: Never see the same option twice in one question
- **Strategic Wrong Answers**: Designed to test true knowledge
- **Randomized Order**: Different state sequence every game

### **Audio System**
- **Button Clicks**: Satisfying 8-bit button sounds
- **Success**: Ascending major chord progression
- **Failure**: Dramatic descending tones
- **Victory**: Epic completion fanfare
- **Menu Navigation**: Classic menu select sounds

## 🎮 **Controls**

### **Keyboard Navigation** (Recommended)
- **↑/↓ Arrow Keys**: Navigate multiple choice options
- **Enter**: Select highlighted option
- **ESC**: Exit game (shows confirmation)
- **Y/N**: Quick confirmation responses

### **Mouse/Touch**
- **Click**: Select any option directly
- **Red X Button**: Exit game
- **Full Touch Support**: All interactions work on mobile

## 🚀 **Technical Stack**

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS v4 with custom 8-bit theme
- **Audio**: Web Audio API with programmatic sound generation
- **Database**: Shopify Quick.db for persistent leaderboard
- **Deployment**: Static export for Shopify Quick hosting

## 📊 **Game Data**

### **Complete US States Database**
- **50 States**: All US states with accurate data
- **Capitals**: Official state capitals
- **Regional Info**: Geographic regions and statehood dates
- **Nicknames**: Official state nicknames for hints

### **Advanced Features**
- **State Shapes**: SVG-based geographic outlines (placeholder system ready for real data)
- **Game Randomization**: Different play experience every time
- **Progress Tracking**: Visual level progression
- **Time Management**: Precise millisecond timing

## 🏗️ **Development**

### **Run Locally**
```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run deploy       # Build and deploy to Quick
```

### **Project Structure**
```
src/
├── components/
│   ├── screens/           # Game screens (Menu, Playing, Success, etc.)
│   ├── PixelButton.tsx   # 8-bit styled button component
│   ├── GameTimer.tsx     # Precision timer display
│   ├── StateShape.tsx    # SVG state visualization
│   └── ...
├── hooks/
│   ├── useGameState.ts   # Comprehensive game state management
│   └── useAudio.ts       # 8-bit audio system
├── data/
│   └── states.ts         # Complete US states database
└── app/
    ├── globals.css       # 8-bit theme and animations
    └── ...
```

## 🎯 **Educational Value**

### **Geography Skills Developed**
- **State Recognition**: Visual shape identification
- **Capital Knowledge**: Memorization and recall
- **Regional Awareness**: Understanding US geographic regions
- **Pressure Performance**: Learning under time constraints

### **Game Design Lessons**
- **Progressive Difficulty**: Randomized but fair challenge
- **Immediate Feedback**: Clear success/failure states
- **Competitive Elements**: Leaderboard motivation
- **Accessibility**: Inclusive design patterns

## 🚀 **Deployment**

**Live Game**: Coming soon to Quick!

**To Deploy**:
```bash
npm run deploy
```

The game will be hosted at `us-states-and-capitals.quick.shopify.io` for internal Shopify access.

---

## 🏆 **Achievement System**

- **🥇 Geography Master**: Complete all 50 states
- **⚡ Speed Demon**: Finish in under 5 minutes  
- **🎯 Perfect Accuracy**: No wrong answers
- **🔥 Heat Streak**: Multiple perfect games

**Ready to test your geography skills? Start the challenge and claim your place on the leaderboard!** 🌟

---

*Built with ❤️ for educational gaming and retro nostalgia*