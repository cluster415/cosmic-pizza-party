import { motion } from 'motion/react';
import { valueToDecimal, valueToFraction } from './gameTypes';

interface ScoreboardProps {
  targetFraction: number;
  currentTotal: number;
  score: number;
  streak: number;
  timeLeft: number;
  round: number;
  maxTime: number;
}

export function Scoreboard({
  targetFraction,
  currentTotal,
  score,
  streak,
  timeLeft,
  round,
  maxTime,
}: ScoreboardProps) {
  const timeProgress = Math.max(0, Math.min(1, timeLeft / maxTime));
  const completionProgress = Math.min(1, currentTotal / targetFraction || 0);

  return (
    <div className="w-full space-y-4 text-white">
      {/* Target + Round */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white/10 p-4 backdrop-blur">
        <div>
          <p className="text-sm uppercase tracking-wide text-white/70">Current Order</p>
          <p className="text-2xl font-bold">
            Make {valueToFraction(targetFraction)} ({valueToDecimal(targetFraction)})
          </p>
        </div>
        <div className="rounded-2xl bg-white/20 px-4 py-2 text-sm font-semibold tracking-wide">
          Round {round}
        </div>
      </div>

      {/* Bars */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
          <p className="text-sm uppercase tracking-wide text-white/70">Score</p>
          <p className="text-3xl font-bold">{score}</p>
        </div>
        <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
          <p className="text-sm uppercase tracking-wide text-white/70">Streak</p>
          <p className="text-3xl font-bold">{streak}🔥</p>
        </div>
        <div className="rounded-3xl bg-white/10 p-4 backdrop-blur">
          <p className="text-sm uppercase tracking-wide text-white/70">Time Left</p>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold">{timeLeft}s</p>
            <span className="text-xs text-white/70">Keep the oven hot!</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 rounded-3xl bg-white/10 p-4 backdrop-blur">
        <div>
          <p className="text-sm uppercase tracking-wide text-white/70">Current Build</p>
          <p className="text-xl font-semibold">
            {valueToDecimal(currentTotal)} / {valueToDecimal(targetFraction)} pizza
          </p>
        </div>
        <div className="space-y-2">
          <div className="h-3 rounded-full bg-white/10">
            <motion.div
              initial={false}
              animate={{ width: `${completionProgress * 100}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
              className="h-full rounded-full bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500"
            />
          </div>
          <div className="h-2 rounded-full bg-white/10">
            <motion.div
              initial={false}
              animate={{ width: `${timeProgress * 100}%` }}
              transition={{ duration: 0.3 }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-cyan-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
