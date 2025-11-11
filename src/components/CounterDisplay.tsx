import { motion } from 'motion/react';

interface CounterDisplayProps {
  icon: string;
  count: number;
  label: string;
  color: string;
}

export function CounterDisplay({ icon, count, label, color }: CounterDisplayProps) {
  return (
    <motion.div
      initial={{ scale: 0, y: -20 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.6 }}
      className={`bg-gradient-to-br ${color} rounded-2xl px-4 py-3 shadow-xl border-2 border-white/30 min-w-[100px]`}
    >
      <div className="flex items-center gap-2">
        <motion.div 
          className="text-2xl"
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
        >
          {icon}
        </motion.div>
        <div>
          <div className="text-white text-sm opacity-80">{label}</div>
          <motion.div 
            className="text-white text-xl"
            key={count}
            animate={{ scale: [1.3, 1] }}
            transition={{ duration: 0.3 }}
          >
            {count.toLocaleString()}
          </motion.div>
        </div>
      </div>

      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-2xl blur-lg -z-10 bg-gradient-to-br ${color}`}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
    </motion.div>
  );
}
