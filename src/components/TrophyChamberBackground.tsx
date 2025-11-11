import { motion } from 'motion/react';

export function TrophyChamberBackground() {
  // Shooting stars
  const shootingStars = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    delay: i * 3,
    duration: 2,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Rich space gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1b4b] to-[#2d1b69]" />
      
      {/* Glowing orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Golden spotlight beams */}
      <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-yellow-400/30 via-yellow-400/10 to-transparent transform -skew-x-12" />
      <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-pink-400/30 via-pink-400/10 to-transparent transform skew-x-12" />

      {/* Floating holographic pizza trophies */}
      {[
        { x: 15, y: 20, delay: 0 },
        { x: 85, y: 25, delay: 1 },
        { x: 10, y: 75, delay: 2 },
        { x: 90, y: 70, delay: 1.5 },
      ].map((trophy, i) => (
        <motion.div
          key={i}
          className="absolute opacity-30"
          style={{
            left: `${trophy.x}%`,
            top: `${trophy.y}%`,
          }}
          animate={{
            y: [-15, 15, -15],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: trophy.delay,
            ease: "easeInOut"
          }}
        >
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            {/* Glass case */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl border-2 border-cyan-400/30 backdrop-blur-sm" />
            
            {/* Holographic pizza */}
            <svg viewBox="0 0 100 100" className="w-full h-full p-4">
              <defs>
                <linearGradient id={`holoGrad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8"/>
                  <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8"/>
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="40" fill={`url(#holoGrad-${i})`} opacity="0.6"/>
              <path d="M 50 50 L 50 10 A 40 40 0 0 1 85 50 Z" fill={`url(#holoGrad-${i})`} opacity="0.8"/>
            </svg>
            
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                boxShadow: '0 0 30px rgba(96, 165, 250, 0.4)',
              }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>
        </motion.div>
      ))}

      {/* Floating medals */}
      {[
        { x: 20, y: 50, emoji: '🥇', delay: 0 },
        { x: 80, y: 45, emoji: '🥈', delay: 0.5 },
        { x: 25, y: 85, emoji: '🥉', delay: 1 },
      ].map((medal, i) => (
        <motion.div
          key={`medal-${i}`}
          className="absolute text-5xl opacity-20"
          style={{
            left: `${medal.x}%`,
            top: `${medal.y}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            rotate: [-10, 10, -10],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: medal.delay,
            ease: "easeInOut"
          }}
        >
          {medal.emoji}
        </motion.div>
      ))}

      {/* Cheering alien chefs */}
      {[
        { x: 5, y: 40 },
        { x: 95, y: 55 },
      ].map((chef, i) => (
        <motion.div
          key={`chef-${i}`}
          className="absolute text-6xl opacity-25"
          style={{
            left: `${chef.x}%`,
            top: `${chef.y}%`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          👽
        </motion.div>
      ))}

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            boxShadow: '0 0 10px 2px rgba(255,255,255,0.8)',
          }}
          initial={{
            x: '0vw',
            y: `${Math.random() * 50}vh`,
            opacity: 0,
          }}
          animate={{
            x: '100vw',
            y: `${Math.random() * 50 + 20}vh`,
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "linear",
          }}
        />
      ))}

      {/* Ambient sparkles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 bg-yellow-300 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3,
            delay: Math.random() * 5,
            repeat: Infinity,
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Trophy shelves (subtle) */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-600/30 to-transparent" />
      <div className="absolute top-1/3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-600/20 to-transparent" />
    </div>
  );
}
