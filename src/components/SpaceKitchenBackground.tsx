import { motion } from 'motion/react';

export function SpaceKitchenBackground() {
  // Floating kitchen utensils
  const utensils = [
    { emoji: '🥄', x: 10, y: 20, duration: 8 },
    { emoji: '🍴', x: 85, y: 15, duration: 10 },
    { emoji: '🔪', x: 20, y: 70, duration: 9 },
    { emoji: '🥣', x: 90, y: 60, duration: 11 },
    { emoji: '🍳', x: 15, y: 85, duration: 7 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Warm kitchen gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1340] via-[#2d1b69] to-[#4a1f5c]" />
      
      {/* Glowing orbs for warmth */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-orange-500/20 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-yellow-500/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Space window with stars */}
      <div className="absolute top-10 right-10 w-48 h-48 md:w-64 md:h-64 rounded-full border-8 border-white/20 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27] to-[#1a1340]">
          {/* Stars in window */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Glowing oven on the left */}
      <div className="absolute bottom-0 left-0 w-64 h-80 hidden lg:block">
        <div className="relative w-full h-full">
          {/* Oven body */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-900 rounded-t-3xl border-4 border-gray-600">
            {/* Oven window */}
            <div className="absolute top-8 left-8 right-8 h-32 bg-gradient-to-br from-orange-500/60 to-red-500/60 rounded-xl border-4 border-gray-500 overflow-hidden">
              {/* Glowing effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-yellow-400/40 to-transparent"
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </div>
            
            {/* Oven controls */}
            <div className="absolute bottom-8 left-8 right-8 flex gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500 shadow-lg" />
              <div className="w-8 h-8 rounded-full bg-blue-500 shadow-lg" />
              <div className="w-8 h-8 rounded-full bg-green-500 shadow-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating utensils */}
      {utensils.map((utensil, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl md:text-5xl opacity-30"
          style={{
            left: `${utensil.x}%`,
            top: `${utensil.y}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            rotate: [-15, 15, -15],
          }}
          transition={{
            duration: utensil.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {utensil.emoji}
        </motion.div>
      ))}

      {/* Sparkles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-300 text-xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Bottom shelf decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}
