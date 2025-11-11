import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Shuffle, Lightbulb, CheckCircle } from 'lucide-react';
import { SpaceKitchenBackground } from './SpaceKitchenBackground';
import { EditablePizza } from './EditablePizza';
import { ToppingButton } from './ToppingButton';
import { FractionToolsSidebar } from './FractionToolsSidebar';
import { PizzaProgressMeter } from './PizzaProgressMeter';

interface Challenge {
  goal: string;
  target: number; // Target fraction as decimal (e.g., 0.75 for 3/4)
  toppings: { [key: string]: number }; // Expected topping fractions
  description: string;
}

const challenges: Challenge[] = [
  {
    goal: "1/4 + 1/2 = ?",
    target: 0.75,
    toppings: { pepperoni: 0.25, mushrooms: 0.5 },
    description: "Add 1/4 pepperoni and 1/2 mushrooms"
  },
  {
    goal: "1/3 + 1/3 = ?",
    target: 0.666,
    toppings: { cheese: 0.333, olives: 0.333 },
    description: "Add 1/3 cheese and 1/3 olives"
  },
  {
    goal: "1/2 + 1/4 + 1/4 = ?",
    target: 1,
    toppings: { pepperoni: 0.5, peppers: 0.25, mushrooms: 0.25 },
    description: "Make a whole pizza: 1/2 pepperoni, 1/4 peppers, 1/4 mushrooms"
  },
  {
    goal: "2/3 + 1/6 = ?",
    target: 0.833,
    toppings: { cheese: 0.666, olives: 0.166 },
    description: "Add 2/3 cheese and 1/6 olives"
  }
];

interface PizzaLabScreenProps {
  onBackToMenu: () => void;
}

export function PizzaLabScreen({ onBackToMenu }: PizzaLabScreenProps) {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [pizzaToppings, setPizzaToppings] = useState<{ [key: string]: number }>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [starsEarned, setStarsEarned] = useState(0);

  const challenge = challenges[currentChallenge];
  
  const totalCoverage = Object.values(pizzaToppings).reduce((sum, val) => sum + val, 0);

  const availableToppings = [
    { id: 'pepperoni', name: 'Pepperoni', color: '#DC2626', fraction: 0.25, emoji: '🔴' },
    { id: 'mushrooms', name: 'Mushrooms', color: '#8B7355', fraction: 0.5, emoji: '🍄' },
    { id: 'cheese', name: 'Cheese', color: '#FCD34D', fraction: 0.333, emoji: '🧀' },
    { id: 'olives', name: 'Olives', color: '#1F2937', fraction: 0.333, emoji: '⚫' },
    { id: 'peppers', name: 'Peppers', color: '#22C55E', fraction: 0.25, emoji: '🫑' },
  ];

  const handleAddTopping = (toppingId: string, fraction: number) => {
    setPizzaToppings(prev => ({
      ...prev,
      [toppingId]: (prev[toppingId] || 0) + fraction
    }));
  };

  const handleCheckPizza = () => {
    // Check if the total coverage matches the target
    const tolerance = 0.05;
    const isCorrect = Math.abs(totalCoverage - challenge.target) < tolerance;

    if (isCorrect) {
      setShowSuccess(true);
      setStarsEarned(prev => prev + 1);
      setTimeout(() => {
        setShowSuccess(false);
        handleNextChallenge();
      }, 2500);
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    }
  };

  const handleNextChallenge = () => {
    setCurrentChallenge((prev) => (prev + 1) % challenges.length);
    setPizzaToppings({});
  };

  const handleReset = () => {
    setPizzaToppings({});
    setShowHint(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <SpaceKitchenBackground />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col p-4 md:p-6">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onBackToMenu}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 md:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            <span className="hidden md:inline">Back to Arcade</span>
          </motion.button>

          {/* Title */}
          <div className="flex-1 text-center">
            <h1 className="text-white mb-2" style={{
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              textShadow: '0 0 20px rgba(255,255,0,0.5), 4px 4px 0 rgba(0,0,0,0.2)',
            }}>
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                🍕 Pizza Lab 🧪
              </span>
            </h1>
            <p className="text-white/80 text-sm md:text-base">
              {challenge.description}
            </p>
          </div>

          {/* Progress Meter */}
          <PizzaProgressMeter 
            current={totalCoverage} 
            target={challenge.target}
            starsEarned={starsEarned}
          />
        </div>

        {/* Fraction Goal Display */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-4 md:p-6 shadow-2xl mb-6 text-center border-4 border-white/30"
        >
          <div className="text-white/80 text-sm md:text-base mb-2">Fraction Goal:</div>
          <div className="text-white text-3xl md:text-5xl">{challenge.goal}</div>
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 flex gap-6 flex-col lg:flex-row">
          
          {/* Left/Top - Topping Selection */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-4 shadow-2xl border-2 border-white/20">
              <h3 className="text-white text-center mb-4">🍕 Toppings</h3>
              <div className="space-y-3">
                {availableToppings.map((topping) => (
                  <ToppingButton
                    key={topping.id}
                    topping={topping}
                    onAdd={handleAddTopping}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Center - Pizza Canvas */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <EditablePizza 
              toppings={pizzaToppings}
              availableToppings={availableToppings}
            />
            
            {/* Current Coverage Display */}
            <motion.div
              className="mt-6 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 text-white text-xl"
              key={totalCoverage}
              animate={{ scale: [1.1, 1] }}
            >
              Total Coverage: <span className="text-yellow-300">{(totalCoverage * 100).toFixed(0)}%</span>
            </motion.div>
          </div>

          {/* Right - Fraction Tools */}
          <div className="lg:w-80 flex-shrink-0">
            <FractionToolsSidebar 
              current={totalCoverage}
              target={challenge.target}
            />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCheckPizza}
            disabled={totalCoverage === 0}
            className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-8 py-4 rounded-full shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 text-xl"
          >
            <CheckCircle className="w-6 h-6" />
            Check My Pizza!
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-4 rounded-full shadow-xl flex items-center gap-2"
          >
            <Shuffle className="w-5 h-5" />
            Start Over
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHint(!showHint)}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 px-6 py-4 rounded-full shadow-xl flex items-center gap-2"
          >
            <Lightbulb className="w-5 h-5" />
            Hint
          </motion.button>
        </div>

        {/* Hint Display */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 text-purple-900 text-center max-w-2xl mx-auto"
            >
              💡 Try clicking toppings to add them to your pizza! Each topping represents a fraction.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Success Animation */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl p-12 text-center shadow-2xl"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="text-9xl mb-4"
              >
                ✨🍕✨
              </motion.div>
              <h2 className="text-white mb-4">Perfect Pizza!</h2>
              <p className="text-white text-xl">You got the fractions right!</p>
              
              {/* Confetti */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl"
                  initial={{ 
                    x: 0, 
                    y: 0,
                    opacity: 1 
                  }}
                  animate={{ 
                    x: (Math.random() - 0.5) * 400,
                    y: (Math.random() - 0.5) * 400,
                    opacity: 0,
                    rotate: Math.random() * 720
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  {['🎉', '⭐', '🍕', '✨'][Math.floor(Math.random() * 4)]}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Animation */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="bg-gradient-to-br from-pink-400 to-red-500 rounded-3xl p-12 text-center shadow-2xl"
            >
              <motion.div
                animate={{ 
                  x: [-10, 10, -10, 10, 0],
                }}
                transition={{ duration: 0.5 }}
                className="text-9xl mb-4"
              >
                😅
              </motion.div>
              <h2 className="text-white mb-4">Oops! Try Again!</h2>
              <p className="text-white text-xl">Check your fractions and try again</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
