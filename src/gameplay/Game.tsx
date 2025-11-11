import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PizzaCanvas } from './PizzaCanvas';
import { Scoreboard } from './Scoreboard';
import { Topping } from './Topping';
import {
  DroppedTopping,
  TOPPINGS,
  generateTargetFraction,
  getToppingById,
} from './gameTypes';
import successSfx from '../assets/sounds/success.mp3';
import streakSfx from '../assets/sounds/streak.mp3';
import missSfx from '../assets/sounds/miss.mp3';

interface GameProps {
  initialScore?: number;
  onScoreChange?: (score: number) => void;
  roundLength?: number;
}

const DEFAULT_ROUND_LENGTH = 90;
type SoundKey = 'success' | 'streak' | 'miss';

export function Game({ initialScore = 0, onScoreChange, roundLength = DEFAULT_ROUND_LENGTH }: GameProps) {
  const [targetFraction, setTargetFraction] = useState(generateTargetFraction());
  const [currentTotal, setCurrentTotal] = useState(0);
  const [droppedToppings, setDroppedToppings] = useState<DroppedTopping[]>([]);
  const [score, setScore] = useState(initialScore);
  const [streak, setStreak] = useState(0);
  const [round, setRound] = useState(1);
  const [timeLeft, setTimeLeft] = useState(roundLength);
  const [status, setStatus] = useState<'active' | 'success' | 'shake' | 'ended'>('active');
  const audioMap = useMemo(() => {
    if (typeof Audio === 'undefined') {
      return {} as Record<SoundKey, HTMLAudioElement>;
    }
    const createSound = (src: string) => {
      const audio = new Audio(src);
      audio.preload = 'auto';
      audio.volume = 0.55;
      return audio;
    };
    return {
      success: createSound(successSfx),
      streak: createSound(streakSfx),
      miss: createSound(missSfx),
    };
  }, []);

  const playAudio = useCallback(
    (key: SoundKey) => {
      const sound = audioMap[key];
      if (!sound) return;
      sound.currentTime = 0;
      sound.play().catch(() => null);
    },
    [audioMap],
  );

  const vibrate = useCallback((pattern: number | number[]) => {
    if (typeof window === 'undefined') return;
    const nav = navigator as Navigator & {
      vibrate?: (pattern: number | number[]) => boolean;
    };
    nav.vibrate?.(pattern);
  }, []);

  useEffect(() => {
    setScore(initialScore);
  }, [initialScore]);

  useEffect(() => {
    if (status === 'ended' || status === 'success') {
      return;
    }

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setStatus('ended');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [status]);

  const triggerShake = useCallback(() => {
    setStatus('shake');
    playAudio('miss');
    vibrate([0, 20, 40]);
    window.setTimeout(() => setStatus('active'), 600);
  }, [playAudio, vibrate]);

  const startNextRound = useCallback(() => {
    setDroppedToppings([]);
    setCurrentTotal(0);
    setRound((prev) => prev + 1);
    setTargetFraction((prevTarget) => {
      let next = generateTargetFraction();
      let guard = 0;
      while (next === prevTarget && guard < 5) {
        next = generateTargetFraction();
        guard += 1;
      }
      return next;
    });
    setStatus('active');
  }, []);

  const handleSuccess = useCallback(() => {
    setStatus('success');
    const basePoints = 150;
    const streakBonus = streak * 25;
    const timeBonus = Math.ceil(timeLeft / 5) * 5;
    const upcomingStreak = streak + 1;
    playAudio('success');
    vibrate([0, 60]);
    setScore((prev) => {
      const nextScore = prev + basePoints + streakBonus + timeBonus;
      onScoreChange?.(nextScore);
      return nextScore;
    });
    setStreak((prev) => prev + 1);
    if (upcomingStreak > 0 && upcomingStreak % 3 === 0) {
      playAudio('streak');
      vibrate([0, 30, 60, 30]);
    }

    window.setTimeout(() => {
      setTimeLeft(roundLength);
      startNextRound();
    }, 1200);
  }, [onScoreChange, playAudio, roundLength, startNextRound, streak, timeLeft, vibrate]);

  const evaluateTotal = useCallback(
    (nextTotal: number) => {
      if (nextTotal === targetFraction) {
        handleSuccess();
      } else if (nextTotal > targetFraction) {
        triggerShake();
      } else {
        setStatus('active');
      }
    },
    [handleSuccess, targetFraction, triggerShake],
  );

  const handleToppingDrop = useCallback(
    (toppingId: string) => {
      if (status === 'ended') {
        return;
      }
      const topping = getToppingById(toppingId);
      if (!topping) return;

      setDroppedToppings((prev) => [
        ...prev,
        {
          ...topping,
          instanceId: crypto.randomUUID(),
          rotation: Math.random() * 20 - 10,
          position: {
            x: 20 + Math.random() * 60,
            y: 20 + Math.random() * 60,
          },
        },
      ]);

      setCurrentTotal((prev) => {
        const nextTotal = prev + topping.value;
        evaluateTotal(nextTotal);
        return nextTotal;
      });
    },
    [evaluateTotal, status],
  );

  const handleToppingRemove = useCallback((instanceId: string) => {
    setDroppedToppings((prev) => {
      const target = prev.find((item) => item.instanceId === instanceId);
      if (!target) return prev;
      setCurrentTotal((prevTotal) => Math.max(0, prevTotal - target.value));
      return prev.filter((item) => item.instanceId !== instanceId);
    });
    setStatus('active');
  }, []);

  const handlePlayAgain = () => {
    setStatus('active');
    setTimeLeft(roundLength);
    setDroppedToppings([]);
    setCurrentTotal(0);
    setStreak(0);
    setRound(1);
    setTargetFraction(generateTargetFraction());
    setScore(0);
    onScoreChange?.(0);
  };

  const paletteDisabled = status === 'success' || status === 'ended';

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <div className="lg:w-1/3">
        <Scoreboard
          targetFraction={targetFraction}
          currentTotal={currentTotal}
          score={score}
          streak={streak}
          timeLeft={timeLeft}
          round={round}
          maxTime={roundLength}
        />
      </div>

      <div className="flex flex-1 flex-col items-center gap-6 rounded-3xl bg-white/5 p-6 text-white backdrop-blur">
        <p className="text-center text-sm uppercase tracking-[0.2em] text-white/60">
          Cosmic Pizza Builder
        </p>
        <PizzaCanvas
          droppedToppings={droppedToppings}
          onToppingDrop={handleToppingDrop}
          onToppingRemove={handleToppingRemove}
          isSuccess={status === 'success'}
          isShaking={status === 'shake'}
        />

        <AnimatePresence>
          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-2xl bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 px-6 py-4 text-center text-purple-900 shadow-2xl"
            >
              <p className="text-lg font-black uppercase tracking-wide">Order Complete!</p>
              <p className="text-sm">Launching new request...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="lg:w-1/3">
        <div className="grid gap-4 rounded-3xl bg-white/5 p-6 text-white backdrop-blur md:grid-cols-2 lg:grid-cols-1">
          {TOPPINGS.map((topping) => (
            <Topping key={topping.id} topping={topping} disabled={paletteDisabled} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {status === 'ended' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 flex items-center justify-center bg-black/80 p-6 text-white backdrop-blur"
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-full max-w-md rounded-3xl bg-gradient-to-br from-purple-600 to-pink-500 p-8 text-center shadow-2xl"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-white/80">Shift Complete</p>
              <p className="mt-3 text-4xl font-black">{score} pts</p>
              <p className="mt-2 text-white/80">Streak: {streak}</p>
              <button
                onClick={handlePlayAgain}
                className="mt-6 w-full rounded-full bg-yellow-300 py-3 font-bold text-purple-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-yellow-200"
              >
                Play Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
