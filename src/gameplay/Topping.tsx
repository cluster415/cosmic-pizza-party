import { motion } from 'motion/react';
import { ToppingDefinition } from './gameTypes';

interface ToppingProps {
  topping: ToppingDefinition;
  disabled?: boolean;
}

export function Topping({ topping, disabled = false }: ToppingProps) {
  // Store the topping id on the drag event so the pizza canvas can read it later.
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text/plain', topping.id);
    event.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <motion.div
      layout
      whileHover={{ scale: disabled ? 1 : 1.05, rotate: disabled ? 0 : 2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      draggable={!disabled}
      onDragStart={handleDragStart}
      className={`group relative rounded-2xl border border-white/20 p-4 text-white shadow-lg transition ${
        disabled
          ? 'cursor-not-allowed opacity-40'
          : 'cursor-grab hover:-translate-y-1 hover:shadow-2xl'
      }`}
    >
      <div
        className={`mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${topping.colorClasses} text-2xl shadow-inner`}
      >
        🍕
      </div>
      <p className="text-lg font-semibold">{topping.label}</p>
      <p className="text-sm text-white/70">{topping.description}</p>
      <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-wide text-white/60">
        <span>{topping.fractionLabel}</span>
        <span>{topping.decimalLabel}</span>
      </div>
    </motion.div>
  );
}
