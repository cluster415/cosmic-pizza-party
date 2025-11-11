import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface RewardSpinnerProps {
  onClose: () => void;
  coins: number;
}

const rewards = [
  { id: 1, label: '50 Coins', emoji: '🪙', value: 50, color: '#F59E0B' },
  { id: 2, label: '1 Star', emoji: '⭐', value: 1, color: '#FCD34D' },
  { id: 3, label: '100 Coins', emoji: '💰', value: 100, color: '#10B981' },
  { id: 4, label: '3 Stars', emoji: '✨', value: 3, color: '#A78BFA' },
  { id: 5, label: '25 Coins', emoji: '🪙', value: 25, color: '#F59E0B' },
  { id: 6, label: 'Badge', emoji: '🏅', value: 1, color: '#EC4899' },
  { id: 7, label: '75 Coins', emoji: '💎', value: 75, color: '#60A5FA' },
  { id: 8, label: '5 Stars', emoji: '🌟', value: 5, color: '#FDE047' },
];

export function RewardSpinner({ onClose, coins }: RewardSpinnerProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonReward, setWonReward] = useState<typeof rewards[0] | null>(null);
  const [rotation, setRotation] = useState(0);

  const handleSpin = () => {
    if (isSpinning || coins < 50) return;

    setIsSpinning(true);
    setWonReward(null);

    // Random reward
    const winningIndex = Math.floor(Math.random() * rewards.length);
    const winningReward = rewards[winningIndex];

    // Calculate rotation (multiple spins + landing position)
    const baseRotation = 360 * 5; // 5 full spins
    const segmentAngle = 360 / rewards.length;
    const targetAngle = winningIndex * segmentAngle;
    const finalRotation = baseRotation + (360 - targetAngle);

    setRotation(finalRotation);

    // Show result after spinning
    setTimeout(() => {
      setIsSpinning(false);
      setWonReward(winningReward);
    }, 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && !isSpinning && onClose()}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="bg-gradient-to-br from-purple-900 to-pink-900 rounded-3xl p-8 max-w-2xl w-full shadow-2xl border-4 border-purple-400 relative"
      >
        {/* Close button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </motion.button>

        <h2 className="text-white text-center mb-6">🎰 Reward Spinner 🎰</h2>
        <p className="text-white/80 text-center mb-8">Spin costs 50 coins!</p>

        {/* Spinner Wheel */}
        <div className="relative w-full max-w-md mx-auto mb-8">
          {/* Pointer */}
          <motion.div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <div className="text-5xl filter drop-shadow-lg">👇</div>
          </motion.div>

          {/* Wheel */}
          <motion.div
            className="relative w-full aspect-square"
            animate={{ rotate: rotation }}
            transition={{
              duration: 4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-2xl">
              <defs>
                {rewards.map((reward, i) => (
                  <linearGradient key={reward.id} id={`gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={reward.color} />
                    <stop offset="100%" stopColor={reward.color} stopOpacity="0.7" />
                  </linearGradient>
                ))}
              </defs>

              {/* Outer circle */}
              <circle cx="100" cy="100" r="95" fill="none" stroke="white" strokeWidth="4" />

              {/* Segments */}
              {rewards.map((reward, i) => {
                const segmentAngle = 360 / rewards.length;
                const startAngle = i * segmentAngle - 90;
                const endAngle = (i + 1) * segmentAngle - 90;

                const x1 = 100 + 90 * Math.cos((startAngle * Math.PI) / 180);
                const y1 = 100 + 90 * Math.sin((startAngle * Math.PI) / 180);
                const x2 = 100 + 90 * Math.cos((endAngle * Math.PI) / 180);
                const y2 = 100 + 90 * Math.sin((endAngle * Math.PI) / 180);

                return (
                  <g key={reward.id}>
                    <path
                      d={`M 100 100 L ${x1} ${y1} A 90 90 0 0 1 ${x2} ${y2} Z`}
                      fill={`url(#gradient-${i})`}
                      stroke="white"
                      strokeWidth="2"
                    />
                    {/* Text */}
                    <text
                      x="100"
                      y="100"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="24"
                      transform={`rotate(${startAngle + segmentAngle / 2} 100 100) translate(0 -60)`}
                    >
                      {reward.emoji}
                    </text>
                  </g>
                );
              })}

              {/* Center circle */}
              <circle cx="100" cy="100" r="25" fill="#7C3AED" stroke="white" strokeWidth="3" />
              <text x="100" y="105" textAnchor="middle" fontSize="20" fill="white">SPIN</text>
            </svg>
          </motion.div>
        </div>

        {/* Spin Button */}
        {!wonReward && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSpin}
            disabled={isSpinning || coins < 50}
            className={`
              w-full py-4 rounded-full text-white text-xl transition-all
              ${isSpinning || coins < 50
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-300 hover:to-emerald-400'
              }
            `}
          >
            {isSpinning ? 'Spinning...' : coins < 50 ? 'Not Enough Coins' : 'Spin Now! (50 coins)'}
          </motion.button>
        )}

        {/* Result */}
        <AnimatePresence>
          {wonReward && (
            <motion.div
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-center"
            >
              <motion.div
                className="text-7xl mb-4"
                animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                {wonReward.emoji}
              </motion.div>
              <h3 className="text-purple-900 mb-2">You Won!</h3>
              <p className="text-purple-900 text-xl">{wonReward.label}</p>
              
              {/* Celebration confetti */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-3xl"
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: (Math.random() - 0.5) * 300,
                    y: (Math.random() - 0.5) * 300,
                    opacity: 0,
                    rotate: Math.random() * 720,
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  {['🎉', '✨', '⭐', '🎊'][Math.floor(Math.random() * 4)]}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
