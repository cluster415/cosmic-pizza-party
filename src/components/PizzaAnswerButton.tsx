import { motion } from 'motion/react';

interface PizzaAnswerButtonProps {
  answer: string;
  onClick: () => void;
  disabled: boolean;
  index: number;
}

export function PizzaAnswerButton({ answer, onClick, disabled, index }: PizzaAnswerButtonProps) {
  const colors = [
    { base: '#FCD34D', crust: '#F59E0B', shadow: '#D97706' },
    { base: '#FB923C', crust: '#F97316', shadow: '#EA580C' },
    { base: '#60A5FA', crust: '#3B82F6', shadow: '#2563EB' },
    { base: '#4ADE80', crust: '#22C55E', shadow: '#16A34A' },
  ];

  const color = colors[index];

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.1, rotate: index % 2 === 0 ? 5 : -5 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      className="relative w-full aspect-square disabled:opacity-50 disabled:cursor-not-allowed group"
      initial={{ opacity: 0, y: 50, rotate: -180 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: index * 0.1, type: "spring" }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
        <defs>
          {/* Main pizza gradient */}
          <radialGradient id={`pizzaGradient-${index}`} cx="30%" cy="30%">
            <stop offset="0%" stopColor={color.base} />
            <stop offset="100%" stopColor={color.crust} />
          </radialGradient>
          
          {/* Cheese gradient */}
          <radialGradient id={`cheeseGradient-${index}`} cx="40%" cy="40%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FCD34D" />
          </radialGradient>

          {/* Shadow filter */}
          <filter id={`shadow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="2" dy="4" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Pizza slice shape */}
        <g filter={`url(#shadow-${index})`}>
          {/* Main slice body */}
          <path
            d="M 100 100 L 50 20 A 90 90 0 0 1 150 20 Z"
            fill={`url(#pizzaGradient-${index})`}
            stroke={color.shadow}
            strokeWidth="3"
            className="transition-all group-hover:brightness-110"
          />
          
          {/* Crust edge highlight */}
          <path
            d="M 50 20 A 90 90 0 0 1 150 20"
            fill="none"
            stroke="#FEF3C7"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.6"
          />
          
          {/* Cheese drips/texture */}
          <path
            d="M 100 100 L 50 20 A 90 90 0 0 1 150 20 Z"
            fill={`url(#cheeseGradient-${index})`}
            opacity="0.3"
          />

          {/* Pepperoni toppings */}
          <circle cx="85" cy="50" r="8" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5"/>
          <circle cx="115" cy="55" r="7" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5"/>
          <circle cx="100" cy="70" r="7.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5"/>
          <circle cx="75" cy="65" r="6.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5"/>
          <circle cx="120" cy="70" r="6" fill="#DC2626" stroke="#991B1B" strokeWidth="1.5"/>
          
          {/* Cheese spots */}
          <circle cx="90" cy="60" r="4" fill="#FEF3C7" opacity="0.7"/>
          <circle cx="110" cy="65" r="3.5" fill="#FEF3C7" opacity="0.7"/>
          <circle cx="95" cy="75" r="3" fill="#FEF3C7" opacity="0.7"/>
        </g>
      </svg>

      {/* Answer text overlay */}
      <div className="absolute inset-0 flex items-center justify-center pt-8">
        <div 
          className="text-white text-3xl md:text-5xl drop-shadow-lg"
          style={{
            textShadow: '0 2px 8px rgba(0,0,0,0.4), 0 0 20px rgba(0,0,0,0.3)',
          }}
        >
          {answer}
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl -z-10"
        style={{ backgroundColor: color.base }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.4 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}