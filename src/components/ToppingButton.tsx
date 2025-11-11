import { motion } from 'motion/react';
import { Plus } from 'lucide-react';

interface Topping {
  id: string;
  name: string;
  color: string;
  fraction: number;
  emoji: string;
}

interface ToppingButtonProps {
  topping: Topping;
  onAdd: (id: string, fraction: number) => void;
}

export function ToppingButton({ topping, onAdd }: ToppingButtonProps) {
  // Convert decimal to fraction string
  const fractionStr = topping.fraction === 0.25 ? '1/4' 
    : topping.fraction === 0.5 ? '1/2'
    : topping.fraction === 0.333 ? '1/3'
    : topping.fraction === 0.666 ? '2/3'
    : topping.fraction.toFixed(2);

  return (
    <motion.button
      whileHover={{ scale: 1.05, x: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onAdd(topping.id, topping.fraction)}
      className="w-full bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm hover:from-white/30 hover:to-white/20 rounded-2xl p-3 shadow-lg border-2 border-white/30 transition-all group"
    >
      <div className="flex items-center gap-3">
        {/* Topping icon */}
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg"
          style={{ 
            backgroundColor: topping.color,
          }}
        >
          {topping.emoji}
        </div>

        {/* Topping info */}
        <div className="flex-1 text-left">
          <div className="text-white">{topping.name}</div>
          <div className="text-yellow-300 text-sm">{fractionStr} slice</div>
        </div>

        {/* Add button */}
        <motion.div
          className="bg-green-500 text-white rounded-full p-2 shadow-lg"
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          <Plus className="w-4 h-4" />
        </motion.div>
      </div>

      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl blur-xl -z-10"
        style={{ backgroundColor: topping.color }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.3 }}
      />
    </motion.button>
  );
}
