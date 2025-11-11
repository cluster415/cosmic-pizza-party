import { motion } from 'motion/react';

export function SpaceBackground() {
  // Generate random stars
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 3 + 2
  }));

  // Floating pizza asteroids
  const pizzaAsteroids = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 60 + 40,
    rotation: Math.random() * 360,
    duration: Math.random() * 20 + 15
  }));

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Deep space gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27] via-[#1a1340] to-[#2d1b69]" />
      
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-pink-500/20 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Stars */}
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Floating Pizza Asteroids */}
      {pizzaAsteroids.map(pizza => (
        <motion.div
          key={pizza.id}
          className="absolute"
          style={{
            left: `${pizza.x}%`,
            top: `${pizza.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [pizza.rotation, pizza.rotation + 360],
          }}
          transition={{
            duration: pizza.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div 
            className="relative opacity-40"
            style={{ 
              width: pizza.size, 
              height: pizza.size,
            }}
          >
            {/* Pizza slice SVG */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
              <defs>
                <linearGradient id={`pizzaGrad-${pizza.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FCD34D" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
              {/* Pizza slice shape */}
              <path
                d="M 50 50 L 50 10 A 40 40 0 0 1 85 50 Z"
                fill={`url(#pizzaGrad-${pizza.id})`}
                stroke="#D97706"
                strokeWidth="2"
              />
              {/* Pepperoni spots */}
              <circle cx="60" cy="35" r="4" fill="#DC2626" />
              <circle cx="70" cy="45" r="3.5" fill="#DC2626" />
              <circle cx="58" cy="45" r="3" fill="#DC2626" />
            </svg>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
