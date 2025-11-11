import { motion } from 'motion/react';

interface TimerOrbitProps {
  timeLeft: number;
  isPracticeMode?: boolean;
}

export function TimerOrbit({ timeLeft, isPracticeMode = false }: TimerOrbitProps) {
  const maxTime = 60;
  const progress = isPracticeMode ? 100 : (timeLeft / maxTime) * 100;
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (progress / 100) * circumference;

  const getColor = () => {
    if (isPracticeMode) return '#10B981';
    if (timeLeft > 30) return '#10B981';
    if (timeLeft > 10) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 shadow-2xl border-2 border-white/20">
      <div className="relative w-24 h-24 md:w-32 md:h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={getColor()}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            animate={{
              strokeDashoffset: offset,
            }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Glowing effect */}
          {!isPracticeMode && timeLeft <= 10 && (
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={getColor()}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              opacity={0.5}
              animate={{
                r: [40, 45, 40],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          )}
        </svg>
        
        {/* Time display in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div 
            className="text-2xl md:text-3xl text-white"
            animate={!isPracticeMode && timeLeft <= 10 ? {
              scale: [1, 1.2, 1],
            } : {}}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          >
            {isPracticeMode ? '∞' : timeLeft}
          </motion.div>
          <div className="text-xs text-white/70">
            {isPracticeMode ? 'Practice' : 'sec'}
          </div>
        </div>

        {/* Orbiting planet/asteroid */}
        {!isPracticeMode && (
          <motion.div
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div 
              className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 shadow-lg"
              style={{
                transform: 'translate(40px, -50%)',
              }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}
