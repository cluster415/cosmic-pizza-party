import { motion } from 'motion/react';

interface FractionCardProps {
  question: string;
  feedback: 'correct' | 'wrong' | null;
}

export function FractionCard({ question, feedback }: FractionCardProps) {
  return (
    <motion.div
      className="relative"
      animate={
        feedback === 'correct' 
          ? { scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }
          : feedback === 'wrong'
          ? { x: [-10, 10, -10, 10, 0] }
          : {}
      }
      transition={{ duration: 0.5 }}
    >
      <div 
        className={`
          relative bg-gradient-to-br rounded-3xl p-8 md:p-12 shadow-2xl border-4 
          ${feedback === 'correct' 
            ? 'from-green-400 to-emerald-500 border-green-300' 
            : feedback === 'wrong'
            ? 'from-red-400 to-pink-500 border-red-300'
            : 'from-purple-400 to-pink-500 border-purple-300'
          }
          transition-all duration-300
        `}
      >
        {/* Decorative pizza corners */}
        <div className="absolute top-4 left-4 text-3xl md:text-4xl">🍕</div>
        <div className="absolute top-4 right-4 text-3xl md:text-4xl">🍕</div>
        <div className="absolute bottom-4 left-4 text-3xl md:text-4xl">🍕</div>
        <div className="absolute bottom-4 right-4 text-3xl md:text-4xl">🍕</div>

        {/* Question */}
        <div className="text-center">
          <div className="text-white text-sm md:text-base mb-4 opacity-90">
            Solve the fraction:
          </div>
          <div 
            className="text-white text-5xl md:text-7xl mb-4"
            style={{
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            {question}
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-8xl md:text-9xl">
              {feedback === 'correct' ? '✓' : '✗'}
            </div>
          </motion.div>
        )}

        {/* Sparkle effects for correct answer */}
        {feedback === 'correct' && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl"
                style={{
                  left: `${50 + 40 * Math.cos((i * Math.PI) / 4)}%`,
                  top: `${50 + 40 * Math.sin((i * Math.PI) / 4)}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1, 0], 
                  opacity: [0, 1, 0],
                  x: [0, 30 * Math.cos((i * Math.PI) / 4)],
                  y: [0, 30 * Math.sin((i * Math.PI) / 4)],
                }}
                transition={{ duration: 0.8 }}
              >
                ⭐
              </motion.div>
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
}
