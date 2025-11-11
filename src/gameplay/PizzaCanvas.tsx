import { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DroppedTopping } from './gameTypes';

interface PizzaCanvasProps {
  droppedToppings: DroppedTopping[];
  onToppingDrop: (toppingId: string) => void;
  onToppingRemove: (instanceId: string) => void;
  isSuccess: boolean;
  isShaking: boolean;
}

export function PizzaCanvas({
  droppedToppings,
  onToppingDrop,
  onToppingRemove,
  isSuccess,
  isShaking,
}: PizzaCanvasProps) {
  // Accept drops from the topping palette and pass the topping id up.
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const toppingId = event.dataTransfer.getData('text/plain');
    if (toppingId) {
      onToppingDrop(toppingId);
    }
  };
  // Precompute confetti layout each time a success triggers so bursts feel fresh.
  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, index) => ({
        id: `confetti-${index}`,
        left: 10 + Math.random() * 80,
        top: 10 + Math.random() * 80,
        color: ['#f97316', '#facc15', '#a855f7', '#14b8a6'][index % 4],
        delay: index * 0.05,
        size: 6 + Math.random() * 10,
        angle: Math.random() * 360,
      })),
    [isSuccess],
  );

  return (
    <div className="relative">
      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        className={`relative flex h-[360px] w-[360px] flex-col items-center justify-center rounded-full border-4 border-white/30 bg-gradient-to-br from-slate-900/70 to-slate-900/20 shadow-2xl transition-all ${
          isShaking ? 'shake' : ''
        }`}
      >
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-amber-200/80 via-orange-200/70 to-yellow-100/60 shadow-inner" />
        <div className="pointer-events-none absolute inset-0 rounded-full border-2 border-white/20" />

        <AnimatePresence>
          {droppedToppings.map((topping) => (
            <motion.button
              key={topping.instanceId}
              initial={{ scale: 0, rotate: -25 }}
              animate={{ scale: 1, rotate: topping.rotation }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              onClick={() => onToppingRemove(topping.instanceId)}
              className="absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/20 text-sm text-white shadow-lg backdrop-blur hover:border-white/90"
              whileHover={{ scale: 1.05 }}
              style={{
                left: `${topping.position.x}%`,
                top: `${topping.position.y}%`,
              }}
            >
              <span className="text-xs font-bold">
                {topping.fractionLabel}
                <br />
                {topping.decimalLabel}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-12 bottom-6 rounded-full border border-dashed border-white/30 py-2 text-center text-sm text-white/70">
          Drop toppings here
        </div>

        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-4 rounded-full border-2 border-yellow-300/80 shadow-[0_0_40px_rgba(253,224,71,0.6)]"
            >
              <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-yellow-200/20 to-transparent" />
              {confettiPieces.map((piece) => (
                <motion.span
                  key={piece.id}
                  initial={{ opacity: 0, scale: 0, y: 0 }}
                  animate={{ opacity: 1, scale: 1, y: -10 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: piece.delay, duration: 0.4 }}
                  className="absolute block rounded-full"
                  style={{
                    width: piece.size,
                    height: piece.size,
                    left: `${piece.left}%`,
                    top: `${piece.top}%`,
                    backgroundColor: piece.color,
                    transform: `rotate(${piece.angle}deg)`,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="mt-3 text-center text-sm text-white/70">
        Click a topping on the pizza to remove it.
      </p>
    </div>
  );
}
