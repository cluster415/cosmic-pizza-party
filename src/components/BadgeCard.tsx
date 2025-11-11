import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock } from 'lucide-react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface BadgeCardProps {
  badge: Badge;
  isUnlocked: boolean;
  onClick: () => void;
  delay: number;
}

export function BadgeCard({ badge, isUnlocked, onClick, delay }: BadgeCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const rarityColors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-orange-500',
  };

  const rarityGlow = {
    common: 'rgba(156, 163, 175, 0.3)',
    rare: 'rgba(96, 165, 250, 0.5)',
    epic: 'rgba(167, 139, 250, 0.5)',
    legendary: 'rgba(251, 191, 36, 0.6)',
  };

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay, type: "spring", duration: 0.6 }}
      className="relative"
    >
      <motion.button
        whileHover={isUnlocked ? { scale: 1.05, y: -5 } : {}}
        whileTap={isUnlocked ? { scale: 0.95 } : {}}
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        disabled={!isUnlocked}
        className={`
          relative w-full aspect-square rounded-2xl p-4 transition-all
          ${isUnlocked 
            ? `bg-gradient-to-br ${badge.color} border-2 border-white/30 cursor-pointer` 
            : 'bg-white/10 border-2 border-white/10 cursor-not-allowed'
          }
        `}
      >
        {/* Rarity indicator */}
        <div className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br ${rarityColors[badge.rarity]}`} />

        {/* Badge Icon */}
        <div className="flex flex-col items-center justify-center h-full">
          {isUnlocked ? (
            <>
              <motion.div 
                className="text-5xl mb-2"
                animate={showTooltip ? { 
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1]
                } : {}}
                transition={{ duration: 0.5 }}
              >
                {badge.icon}
              </motion.div>
              <div className="text-white text-xs text-center truncate w-full">
                {badge.name}
              </div>
            </>
          ) : (
            <>
              <Lock className="w-8 h-8 text-white/30 mb-2" />
              <div className="text-white/30 text-xs text-center">Locked</div>
            </>
          )}
        </div>

        {/* Glow effect for unlocked badges */}
        {isUnlocked && (
          <>
            <motion.div
              className="absolute inset-0 rounded-2xl blur-xl -z-10"
              style={{ backgroundColor: rarityGlow[badge.rarity] }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            
            {/* Sparkles for legendary */}
            {badge.rarity === 'legendary' && (
              <>
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-yellow-300 text-sm"
                    style={{
                      left: `${25 + i * 20}%`,
                      top: `${10 + (i % 2) * 70}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.3,
                      repeat: Infinity,
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </>
            )}
          </>
        )}
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && isUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 pointer-events-none"
          >
            <div className={`bg-gradient-to-br ${badge.color} rounded-xl p-3 shadow-2xl border-2 border-white/30 min-w-[200px]`}>
              <div className="text-white text-center">
                <div className="text-lg mb-1">{badge.icon} {badge.name}</div>
                <div className="text-xs opacity-90">{badge.description}</div>
                <div className="text-xs opacity-70 mt-2 capitalize">{badge.rarity} Badge</div>
              </div>
              {/* Arrow */}
              <div 
                className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white/30"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
