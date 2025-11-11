import { motion } from 'motion/react';

interface ScoreMeterProps {
  score: number;
  streak: number;
}

export function ScoreMeter({ score, streak }: ScoreMeterProps) {
  const maxSlices = 8;
  const filledSlices = Math.min(Math.floor(score / 200), maxSlices);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 shadow-2xl border-2 border-white/20">
      <div className="flex items-center gap-4">
        {/* Pizza Score Meter */}
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
            {/* Pizza circle background */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="#FCD34D"
              stroke="#F59E0B"
              strokeWidth="2"
            />
            
            {/* Pizza slices that light up */}
            {Array.from({ length: maxSlices }).map((_, i) => {
              const angle = (360 / maxSlices) * i;
              const nextAngle = (360 / maxSlices) * (i + 1);
              const isFilled = i < filledSlices;
              
              return (
                <motion.path
                  key={i}
                  d={`
                    M 50 50
                    L ${50 + 40 * Math.cos((angle * Math.PI) / 180)} ${50 + 40 * Math.sin((angle * Math.PI) / 180)}
                    A 40 40 0 0 1 ${50 + 40 * Math.cos((nextAngle * Math.PI) / 180)} ${50 + 40 * Math.sin((nextAngle * Math.PI) / 180)}
                    Z
                  `}
                  fill={isFilled ? "#F59E0B" : "#FEF3C7"}
                  stroke="#D97706"
                  strokeWidth="1.5"
                  initial={{ opacity: 0.5 }}
                  animate={{ 
                    opacity: isFilled ? 1 : 0.5,
                    scale: isFilled ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.3 }}
                />
              );
            })}
            
            {/* Center circle */}
            <circle cx="50" cy="50" r="15" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2"/>
          </svg>
          
          {/* Score display in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="text-center"
              key={score}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.3 }}
            >
              <div className="text-lg md:text-xl text-orange-900">{score}</div>
            </motion.div>
          </div>
        </div>

        {/* Score Info */}
        <div className="text-white">
          <div className="text-sm opacity-80 mb-1">Score</div>
          <motion.div 
            className="text-2xl md:text-3xl mb-2"
            key={score}
            initial={{ scale: 1.2, color: '#FCD34D' }}
            animate={{ scale: 1, color: '#FFFFFF' }}
            transition={{ duration: 0.3 }}
          >
            {score}
          </motion.div>
          {streak > 0 && (
            <motion.div
              initial={{ scale: 0, x: -20 }}
              animate={{ scale: 1, x: 0 }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 px-3 py-1 rounded-full text-sm inline-flex items-center gap-1"
            >
              🔥 {streak}x Streak!
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
