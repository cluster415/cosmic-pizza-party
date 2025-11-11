import { motion } from 'motion/react';

interface PizzaProgressMeterProps {
  current: number;
  target: number;
  starsEarned: number;
}

export function PizzaProgressMeter({ current, target, starsEarned }: PizzaProgressMeterProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const isComplete = Math.abs(current - target) < 0.05;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 shadow-2xl border-2 border-white/20">
      <div className="flex flex-col items-center gap-2">
        {/* Circular progress pizza */}
        <div className="relative w-20 h-20 md:w-24 md:h-24">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="8"
            />
            
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={isComplete ? "#10B981" : "#FCD34D"}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 40}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
              animate={{ 
                strokeDashoffset: (2 * Math.PI * 40) * (1 - percentage / 100)
              }}
              transition={{ duration: 0.5 }}
            />
            
            {/* Pizza in center */}
            <circle cx="50" cy="50" r="30" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2"/>
            
            {/* Pepperoni on pizza */}
            <circle cx="42" cy="45" r="4" fill="#DC2626"/>
            <circle cx="58" cy="48" r="4" fill="#DC2626"/>
            <circle cx="50" cy="55" r="4" fill="#DC2626"/>
          </svg>

          {/* Percentage in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="text-white text-sm"
              key={percentage}
              animate={{ scale: [1.3, 1] }}
            >
              {Math.round(percentage)}%
            </motion.div>
          </div>

          {/* Sparkle when complete */}
          {isComplete && (
            <motion.div
              className="absolute -top-2 -right-2 text-2xl"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              ✨
            </motion.div>
          )}
        </div>

        {/* Stars earned */}
        <div className="flex items-center gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="text-2xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: i < starsEarned ? 1 : 0.5,
                rotate: 0,
                opacity: i < starsEarned ? 1 : 0.3,
              }}
              transition={{ delay: i * 0.1 }}
            >
              ⭐
            </motion.div>
          ))}
        </div>

        <div className="text-white/80 text-xs text-center">
          {starsEarned} star{starsEarned !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}
