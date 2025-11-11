import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Trophy, TrendingUp, Gift } from 'lucide-react';
import { TrophyChamberBackground } from './TrophyChamberBackground';
import { LeaderboardPanel } from './LeaderboardPanel';
import { TrophyWall } from './TrophyWall';
import { RewardSpinner } from './RewardSpinner';
import { StatsModal } from './StatsModal';
import { CounterDisplay } from './CounterDisplay';

interface RewardRoomScreenProps {
  onBackToMenu: () => void;
}

interface PlayerStats {
  stars: number;
  coins: number;
  rank: string;
  level: number;
  accuracy: number;
  gamesPlayed: number;
  badges: string[];
}

const mockPlayerStats: PlayerStats = {
  stars: 1247,
  coins: 850,
  rank: "Pizza Pro",
  level: 3,
  accuracy: 87,
  gamesPlayed: 42,
  badges: ['sliceHero', 'perfectPortions', 'speedDemon', 'mathWizard', 'consistency']
};

export function RewardRoomScreen({ onBackToMenu }: RewardRoomScreenProps) {
  const [showStats, setShowStats] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [recentlyUnlockedBadge, setRecentlyUnlockedBadge] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <TrophyChamberBackground />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col p-4 md:p-6">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBackToMenu}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 md:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            <span className="hidden md:inline">Back to Kitchen</span>
          </motion.button>

          {/* Galaxy Rank Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1 }}
            className="bg-gradient-to-br from-yellow-400 via-orange-500 to-pink-500 rounded-2xl px-6 py-3 shadow-2xl border-4 border-yellow-300"
          >
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-white" />
              <div className="text-white">
                <div className="text-xs opacity-80">Galaxy Rank</div>
                <div className="text-lg">{mockPlayerStats.rank} Level {mockPlayerStats.level}</div>
              </div>
            </div>
          </motion.div>

          {/* Counters */}
          <div className="flex gap-3 ml-auto">
            <CounterDisplay 
              icon="⭐" 
              count={mockPlayerStats.stars} 
              label="Stars"
              color="from-yellow-400 to-orange-500"
            />
            <CounterDisplay 
              icon="🪙" 
              count={mockPlayerStats.coins} 
              label="Coins"
              color="from-amber-400 to-yellow-600"
            />
          </div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-white mb-2" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            textShadow: '0 0 30px rgba(255,215,0,0.8), 4px 4px 0 rgba(0,0,0,0.3)',
          }}>
            <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              🏆 Reward Room 🏆
            </span>
          </h1>
          <p className="text-white/80">Your cosmic achievements await!</p>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 flex gap-6 flex-col lg:flex-row mb-6">
          
          {/* Left - Leaderboard Panel */}
          <div className="lg:w-1/2 flex-shrink-0">
            <LeaderboardPanel currentPlayerRank={5} />
          </div>

          {/* Right - Trophy Wall */}
          <div className="lg:w-1/2 flex-shrink-0">
            <TrophyWall 
              badges={mockPlayerStats.badges}
              onBadgeClick={(badgeId) => {
                setRecentlyUnlockedBadge(badgeId);
                setTimeout(() => setRecentlyUnlockedBadge(null), 3000);
              }}
            />
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSpinner(true)}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-8 py-4 rounded-full shadow-xl flex items-center gap-3 text-lg relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ opacity: 0.5 }}
            />
            <Gift className="w-6 h-6 relative z-10" />
            <span className="relative z-10">Spin for Rewards!</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowStats(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-full shadow-xl flex items-center gap-3 text-lg"
          >
            <TrendingUp className="w-6 h-6" />
            View My Stats
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full shadow-xl flex items-center gap-3 text-lg"
          >
            🍕 Unlock New Toppings
          </motion.button>
        </div>
      </div>

      {/* Badge Unlock Celebration */}
      <AnimatePresence>
        {recentlyUnlockedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none flex items-center justify-center z-50"
          >
            {/* Fireworks */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                initial={{ 
                  x: '50vw', 
                  y: '50vh',
                  scale: 0,
                  opacity: 1 
                }}
                animate={{ 
                  x: `${Math.random() * 100}vw`,
                  y: `${Math.random() * 100}vh`,
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0],
                  rotate: Math.random() * 720
                }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                {['✨', '⭐', '🎉', '🏆', '💫'][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Modal */}
      <AnimatePresence>
        {showStats && (
          <StatsModal 
            stats={mockPlayerStats}
            onClose={() => setShowStats(false)}
          />
        )}
      </AnimatePresence>

      {/* Reward Spinner */}
      <AnimatePresence>
        {showSpinner && (
          <RewardSpinner 
            onClose={() => setShowSpinner(false)}
            coins={mockPlayerStats.coins}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
