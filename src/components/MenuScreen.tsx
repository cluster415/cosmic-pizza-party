import { motion } from 'motion/react';
import { Sparkles, Trophy, Gamepad2, Settings } from 'lucide-react';
import { SpaceBackground } from './SpaceBackground';
import { AlienChef } from './AlienChef';

type Screen = 'menu' | 'game' | 'howToPlay' | 'leaderboard' | 'practice';

interface MenuScreenProps {
  onNavigate: (screen: Screen) => void;
}

export function MenuScreen({ onNavigate }: MenuScreenProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <SpaceBackground />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        
        {/* Title */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1, delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-center text-white mb-2" style={{ 
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            textShadow: '0 0 20px rgba(255,255,0,0.5), 0 0 40px rgba(255,100,255,0.3), 4px 4px 0 rgba(0,0,0,0.2)',
            fontWeight: '900',
            letterSpacing: '0.05em'
          }}>
            <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              COSMIC PIZZA
            </span>
          </h1>
          <h2 className="text-center text-white" style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            textShadow: '0 0 20px rgba(255,255,0,0.5), 0 0 40px rgba(255,100,255,0.3), 4px 4px 0 rgba(0,0,0,0.2)',
            fontWeight: '900',
            letterSpacing: '0.05em'
          }}>
            <span className="bg-gradient-to-r from-orange-300 via-red-400 to-pink-400 bg-clip-text text-transparent">
              PARTY! 🍕
            </span>
          </h2>
        </motion.div>

        {/* Animated Alien Chef Mascot */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-8"
        >
          <AlienChef />
        </motion.div>

        {/* Menu Buttons */}
        <div className="space-y-4 w-full max-w-md">
          <motion.button
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('game')}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 py-6 px-8 rounded-full shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center justify-center gap-3 text-2xl">
              <Sparkles className="w-8 h-8" />
              Let's Make Pizza!
              <Sparkles className="w-8 h-8" />
            </span>
          </motion.button>

          <motion.button
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('practice')}
            className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-5 px-8 rounded-full shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-300 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center justify-center gap-3 text-xl">
              <Gamepad2 className="w-6 h-6" />
              Pizza Lab (Practice)
            </span>
          </motion.button>

          <motion.button
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('howToPlay')}
            className="w-full bg-gradient-to-r from-blue-400 to-cyan-500 text-white py-5 px-8 rounded-full shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center justify-center gap-3 text-xl">
              <Settings className="w-6 h-6" />
              How to Play
            </span>
          </motion.button>

          <motion.button
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('leaderboard')}
            className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white py-5 px-8 rounded-full shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center justify-center gap-3 text-xl">
              <Trophy className="w-6 h-6" />
              Leaderboard
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
