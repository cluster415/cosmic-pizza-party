import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface PowerUpIconProps {
  icon: ReactNode;
  label: string;
  count: number;
  color: string;
  onClick: () => void;
  disabled: boolean;
}

export function PowerUpIcon({ icon, label, count, color, onClick, disabled }: PowerUpIconProps) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.1, y: -5 } : {}}
      whileTap={!disabled ? { scale: 0.9 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative bg-gradient-to-br ${color} 
        rounded-2xl p-3 md:p-4 shadow-xl
        transition-all
        ${disabled ? 'opacity-40 cursor-not-allowed grayscale' : 'hover:shadow-2xl'}
      `}
    >
      {/* Icon */}
      <div className="text-white mb-1 flex justify-center">
        {icon}
      </div>

      {/* Label */}
      <div className="text-white text-xs text-center whitespace-nowrap mb-1">
        {label}
      </div>

      {/* Count badge */}
      <motion.div
        className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm border-2 border-white shadow-lg"
        key={count}
        animate={count > 0 ? { scale: [1.3, 1] } : {}}
        transition={{ duration: 0.2 }}
      >
        {count}
      </motion.div>

      {/* Glow effect when available */}
      {!disabled && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl blur-md -z-10`}
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      )}
    </motion.button>
  );
}
