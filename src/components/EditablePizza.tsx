import { motion } from 'motion/react';

interface Topping {
  id: string;
  name: string;
  color: string;
  fraction: number;
  emoji: string;
}

interface EditablePizzaProps {
  toppings: { [key: string]: number };
  availableToppings: Topping[];
}

export function EditablePizza({ toppings, availableToppings }: EditablePizzaProps) {
  const totalCoverage = Object.values(toppings).reduce((sum, val) => sum + val, 0);
  
  // Create sections based on toppings added
  const sections: Array<{ toppingId: string; fraction: number; color: string; emoji: string }> = [];
  
  Object.entries(toppings).forEach(([toppingId, fraction]) => {
    const topping = availableToppings.find(t => t.id === toppingId);
    if (topping && fraction > 0) {
      sections.push({
        toppingId,
        fraction,
        color: topping.color,
        emoji: topping.emoji
      });
    }
  });

  // Calculate slice angles
  let currentAngle = -90; // Start from top
  const slices = sections.map(section => {
    const angle = 360 * section.fraction;
    const slice = {
      ...section,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      angle
    };
    currentAngle += angle;
    return slice;
  });

  // Generate path for a pizza slice
  const getSlicePath = (startAngle: number, endAngle: number) => {
    const start = (startAngle * Math.PI) / 180;
    const end = (endAngle * Math.PI) / 180;
    const radius = 140;
    
    const x1 = 150 + radius * Math.cos(start);
    const y1 = 150 + radius * Math.sin(start);
    const x2 = 150 + radius * Math.cos(end);
    const y2 = 150 + radius * Math.sin(end);
    
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    
    return `M 150 150 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="relative">
      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-full p-8 shadow-2xl border-4 border-white/20"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <svg viewBox="0 0 300 300" className="w-full h-full max-w-md" style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))' }}>
          <defs>
            {/* Pizza dough gradient */}
            <radialGradient id="doughGradient" cx="40%" cy="40%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="70%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#F59E0B" />
            </radialGradient>
            
            {/* Sauce gradient */}
            <radialGradient id="sauceGradient" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#FCA5A5" />
              <stop offset="100%" stopColor="#DC2626" />
            </radialGradient>
          </defs>

          {/* Base pizza crust */}
          <circle cx="150" cy="150" r="145" fill="url(#doughGradient)" stroke="#D97706" strokeWidth="3"/>
          
          {/* Sauce base */}
          <circle cx="150" cy="150" r="140" fill="url(#sauceGradient)" opacity="0.6"/>

          {/* Grid lines to show fractions */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 150 + 140 * Math.cos(rad);
            const y = 150 + 140 * Math.sin(rad);
            return (
              <line
                key={i}
                x1="150"
                y1="150"
                x2={x}
                y2={y}
                stroke="white"
                strokeWidth="1"
                opacity="0.2"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Topping slices */}
          {slices.map((slice, i) => (
            <motion.g
              key={`${slice.toppingId}-${i}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1, type: "spring" }}
            >
              {/* Colored slice */}
              <path
                d={getSlicePath(slice.startAngle, slice.endAngle)}
                fill={slice.color}
                opacity="0.8"
                stroke="white"
                strokeWidth="2"
              />
              
              {/* Topping emoji */}
              <motion.text
                x={150 + 70 * Math.cos(((slice.startAngle + slice.endAngle) / 2) * Math.PI / 180)}
                y={150 + 70 * Math.sin(((slice.startAngle + slice.endAngle) / 2) * Math.PI / 180)}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="32"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                {slice.emoji}
              </motion.text>
            </motion.g>
          ))}

          {/* Center decoration */}
          <circle cx="150" cy="150" r="20" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2"/>
          <text 
            x="150" 
            y="150" 
            textAnchor="middle" 
            dominantBaseline="middle" 
            fontSize="24"
          >
            🍕
          </text>
        </svg>
      </motion.div>

      {/* Fraction labels around pizza */}
      {slices.map((slice, i) => {
        const midAngle = (slice.startAngle + slice.endAngle) / 2;
        const rad = (midAngle * Math.PI) / 180;
        const distance = 200;
        const x = distance * Math.cos(rad);
        const y = distance * Math.sin(rad);
        
        // Convert decimal to fraction string
        const fractionStr = slice.fraction === 0.25 ? '1/4' 
          : slice.fraction === 0.5 ? '1/2'
          : slice.fraction === 0.333 ? '1/3'
          : slice.fraction === 0.666 ? '2/3'
          : slice.fraction === 0.166 ? '1/6'
          : slice.fraction.toFixed(2);
        
        return (
          <motion.div
            key={`label-${i}`}
            className="absolute bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm text-purple-900 shadow-lg"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 + 0.3 }}
          >
            {fractionStr}
          </motion.div>
        );
      })}

      {/* Lock-in sparkles when toppings are added */}
      {slices.length > 0 && (
        <>
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45) * Math.PI / 180;
            const x = 180 * Math.cos(angle);
            const y = 180 * Math.sin(angle);
            return (
              <motion.div
                key={i}
                className="absolute text-yellow-300 text-2xl pointer-events-none"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                ✨
              </motion.div>
            );
          })}
        </>
      )}
    </div>
  );
}
