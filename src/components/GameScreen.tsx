import { motion } from 'motion/react';
import { Home } from 'lucide-react';
import { SpaceBackground } from './SpaceBackground';
import { Game } from '../gameplay/Game';

interface GameScreenProps {
  onBackToMenu: () => void;
  score: number;
  setScore: (score: number) => void;
}

export function GameScreen({ onBackToMenu, score, setScore }: GameScreenProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <SpaceBackground />
      <div className="relative z-10 flex min-h-screen flex-col gap-6 p-4 md:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBackToMenu}
            className="flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 text-white transition hover:bg-white/25"
          >
            <Home className="h-5 w-5" />
            Back to Menu
          </motion.button>

          <div className="rounded-full border border-white/20 px-6 py-2 text-white/80">
            Total XP: <span className="text-white font-semibold">{score}</span>
          </div>
        </div>

        <Game initialScore={score} onScoreChange={setScore} />
      </div>
    </div>
  );
}
