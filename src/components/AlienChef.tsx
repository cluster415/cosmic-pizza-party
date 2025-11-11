import { motion } from 'motion/react';

export function AlienChef() {
  return (
    <div className="relative w-40 h-40 md:w-48 md:h-48">
      {/* Floating pizza being flipped */}
      <motion.div
        className="absolute left-1/2 top-0 -translate-x-1/2"
        animate={{
          y: [-20, -40, -20],
          rotate: [0, 360, 720],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg width="60" height="60" viewBox="0 0 100 100">
          <defs>
            <radialGradient id="pizzaGradient">
              <stop offset="0%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#F59E0B" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="40" fill="url(#pizzaGradient)" stroke="#D97706" strokeWidth="3"/>
          <circle cx="35" cy="40" r="6" fill="#DC2626" />
          <circle cx="60" cy="35" r="5" fill="#DC2626" />
          <circle cx="50" cy="55" r="6" fill="#DC2626" />
          <circle cx="65" cy="50" r="5" fill="#DC2626" />
          <circle cx="40" cy="60" r="5" fill="#DC2626" />
        </svg>
      </motion.div>

      {/* Alien Chef Character */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg width="120" height="120" viewBox="0 0 120 120">
          {/* Chef hat */}
          <ellipse cx="60" cy="35" rx="30" ry="12" fill="white" stroke="#E5E7EB" strokeWidth="2"/>
          <rect x="40" y="32" width="40" height="20" fill="white" stroke="#E5E7EB" strokeWidth="2" rx="2"/>
          
          {/* Alien head */}
          <ellipse cx="60" cy="70" rx="28" ry="32" fill="#A3E635" stroke="#84CC16" strokeWidth="2"/>
          
          {/* Eyes */}
          <motion.g
            animate={{
              scaleY: [1, 0.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          >
            <ellipse cx="50" cy="65" rx="6" ry="10" fill="#1F2937"/>
            <ellipse cx="70" cy="65" rx="6" ry="10" fill="#1F2937"/>
          </motion.g>
          
          {/* Eye highlights */}
          <circle cx="52" cy="62" r="2" fill="white"/>
          <circle cx="72" cy="62" r="2" fill="white"/>
          
          {/* Antennae */}
          <line x1="45" y1="45" x2="40" y2="30" stroke="#84CC16" strokeWidth="3" strokeLinecap="round"/>
          <line x1="75" y1="45" x2="80" y2="30" stroke="#84CC16" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="40" cy="30" r="4" fill="#FDE047"/>
          <circle cx="80" cy="30" r="4" fill="#FDE047"/>
          
          {/* Happy mouth */}
          <path d="M 50 80 Q 60 85 70 80" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round"/>
          
          {/* Body (chef coat) */}
          <rect x="45" y="95" width="30" height="20" fill="white" stroke="#E5E7EB" strokeWidth="2" rx="4"/>
          <circle cx="60" cy="102" r="2" fill="#60A5FA"/>
          <circle cx="60" cy="108" r="2" fill="#60A5FA"/>
        </svg>
      </motion.div>

      {/* Sparkles around the chef */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 2) * 40}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}
