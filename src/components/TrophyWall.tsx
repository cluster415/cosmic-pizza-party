import { motion } from 'motion/react';
import { BadgeCard } from './BadgeCard';

interface TrophyWallProps {
  badges: string[];
  onBadgeClick: (badgeId: string) => void;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const allBadges: Badge[] = [
  {
    id: 'sliceHero',
    name: 'Slice Hero',
    description: 'Complete 10 pizzas with perfect fractions',
    icon: '🍕',
    color: 'from-orange-400 to-red-500',
    rarity: 'common'
  },
  {
    id: 'perfectPortions',
    name: 'Perfect Portionist',
    description: 'Get 10 exact fraction matches in a row',
    icon: '🎯',
    color: 'from-green-400 to-emerald-500',
    rarity: 'rare'
  },
  {
    id: 'speedDemon',
    name: 'Speed Demon',
    description: 'Complete 5 challenges in under 2 minutes each',
    icon: '⚡',
    color: 'from-yellow-400 to-orange-500',
    rarity: 'rare'
  },
  {
    id: 'mathWizard',
    name: 'Math Wizard',
    description: 'Master all fraction types (1/2, 1/3, 1/4, 1/6)',
    icon: '🧙',
    color: 'from-purple-400 to-pink-500',
    rarity: 'epic'
  },
  {
    id: 'consistency',
    name: 'Consistency King',
    description: 'Play for 7 days in a row',
    icon: '👑',
    color: 'from-blue-400 to-cyan-500',
    rarity: 'epic'
  },
  {
    id: 'galaxyMaster',
    name: 'Galaxy Master',
    description: 'Reach the top of the global leaderboard',
    icon: '🌌',
    color: 'from-pink-500 to-purple-600',
    rarity: 'legendary'
  },
  {
    id: 'fractionMaster',
    name: 'Fraction Master',
    description: 'Complete 100 fraction challenges',
    icon: '📊',
    color: 'from-indigo-400 to-blue-500',
    rarity: 'rare'
  },
  {
    id: 'helpfulFriend',
    name: 'Helpful Friend',
    description: 'Help 5 friends with fraction problems',
    icon: '🤝',
    color: 'from-green-400 to-teal-500',
    rarity: 'common'
  },
  {
    id: 'cosmicCook',
    name: 'Cosmic Cook',
    description: 'Unlock all pizza toppings',
    icon: '👨‍🍳',
    color: 'from-red-400 to-pink-500',
    rarity: 'epic'
  },
];

export function TrophyWall({ badges, onBadgeClick }: TrophyWallProps) {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border-2 border-purple-400/30 h-full"
    >
      <h2 className="text-white text-center mb-4 flex items-center justify-center gap-2">
        <motion.span
          animate={{ 
            rotateY: [0, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🏅
        </motion.span>
        Trophy Wall
      </h2>

      <div className="text-white/70 text-sm text-center mb-4">
        {badges.length} of {allBadges.length} badges earned
      </div>

      {/* Progress bar */}
      <div className="bg-white/20 rounded-full h-3 mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${(badges.length / allBadges.length) * 100}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>

      {/* Badge Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {allBadges.map((badge, index) => {
          const isUnlocked = badges.includes(badge.id);
          return (
            <BadgeCard
              key={badge.id}
              badge={badge}
              isUnlocked={isUnlocked}
              onClick={() => isUnlocked && onBadgeClick(badge.id)}
              delay={index * 0.05}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t-2 border-white/20">
        <div className="text-white/60 text-xs text-center mb-2">Rarity Levels</div>
        <div className="flex justify-center gap-3 flex-wrap">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-gray-400" />
            <span className="text-white/60 text-xs">Common</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-400" />
            <span className="text-white/60 text-xs">Rare</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-purple-400" />
            <span className="text-white/60 text-xs">Epic</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="text-white/60 text-xs">Legendary</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </motion.div>
  );
}
