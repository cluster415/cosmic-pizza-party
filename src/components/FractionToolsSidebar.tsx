import { motion } from 'motion/react';

interface FractionToolsSidebarProps {
  current: number;
  target: number;
}

export function FractionToolsSidebar({ current, target }: FractionToolsSidebarProps) {
  // Convert decimals to fraction strings
  const currentFraction = current === 0.25 ? '1/4' 
    : current === 0.5 ? '1/2'
    : current === 0.75 ? '3/4'
    : current === 0.333 ? '1/3'
    : current === 0.666 ? '2/3'
    : current === 0.833 ? '5/6'
    : current === 1 ? '4/4'
    : (current * 100).toFixed(0) + '%';

  const targetFraction = target === 0.25 ? '1/4' 
    : target === 0.5 ? '1/2'
    : target === 0.75 ? '3/4'
    : target === 0.333 ? '1/3'
    : target === 0.666 ? '2/3'
    : target === 0.833 ? '5/6'
    : target === 1 ? '4/4'
    : (target * 100).toFixed(0) + '%';

  const currentPercent = (current / target) * 100;
  const isClose = Math.abs(current - target) < 0.05;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-2 border-white/20 space-y-6">
      <h3 className="text-white text-center mb-4">📊 Fraction Tools</h3>

      {/* Visual Fraction Bar - Current */}
      <div>
        <div className="text-white/80 text-sm mb-2">Your Pizza:</div>
        <div className="bg-white/20 rounded-full h-8 overflow-hidden relative">
          <motion.div
            className={`h-full rounded-full ${
              isClose ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-blue-400 to-cyan-500'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(currentPercent, 100)}%` }}
            transition={{ type: "spring", duration: 0.8 }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-white text-sm">
            {currentFraction}
          </div>
        </div>
      </div>

      {/* Visual Fraction Bar - Target */}
      <div>
        <div className="text-white/80 text-sm mb-2">Target:</div>
        <div className="bg-white/20 rounded-full h-8 overflow-hidden relative">
          <div
            className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
            style={{ width: '100%' }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-purple-900">
            {targetFraction}
          </div>
        </div>
      </div>

      {/* Comparison indicator */}
      <div className="bg-white/10 rounded-2xl p-4">
        <div className="text-white/80 text-sm text-center mb-2">Status:</div>
        <motion.div 
          className={`text-center text-lg ${
            isClose ? 'text-green-300' : current < target ? 'text-yellow-300' : 'text-orange-300'
          }`}
          key={current}
          animate={{ scale: [1.2, 1] }}
        >
          {isClose && '✓ Perfect!'}
          {!isClose && current < target && '↑ Need more'}
          {!isClose && current > target && '↓ Too much'}
        </motion.div>
      </div>

      {/* Fraction Simplifier */}
      <div className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl p-4 border-2 border-purple-400/50">
        <div className="text-white text-sm text-center mb-3">💡 Fraction Simplifier</div>
        <div className="space-y-2 text-center">
          <div className="text-white/80 text-sm">Common Equivalents:</div>
          <div className="grid grid-cols-2 gap-2 text-xs text-white">
            <div className="bg-white/10 rounded-lg p-2">2/4 = 1/2</div>
            <div className="bg-white/10 rounded-lg p-2">4/8 = 1/2</div>
            <div className="bg-white/10 rounded-lg p-2">3/6 = 1/2</div>
            <div className="bg-white/10 rounded-lg p-2">2/8 = 1/4</div>
          </div>
        </div>
      </div>

      {/* Pizza vs Bar Comparison */}
      <div className="bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-2xl p-4 border-2 border-blue-400/50">
        <div className="text-white text-sm text-center mb-3">🍕 Pizza = Bar</div>
        
        {/* Mini pizza visual */}
        <div className="mb-3">
          <svg viewBox="0 0 100 50" className="w-full">
            <circle cx="25" cy="25" r="20" fill="#FCD34D" stroke="#F59E0B" strokeWidth="2"/>
            <line x1="25" y1="25" x2="25" y2="5" stroke="white" strokeWidth="1" opacity="0.5"/>
            <line x1="25" y1="25" x2="45" y2="25" stroke="white" strokeWidth="1" opacity="0.5"/>
            
            {/* Arrow */}
            <path d="M 50 25 L 55 25" stroke="white" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="white" />
              </marker>
            </defs>
            
            {/* Bar */}
            <rect x="60" y="15" width="35" height="20" fill="none" stroke="white" strokeWidth="2" rx="2"/>
            <rect x="60" y="15" width="17.5" height="20" fill="#F59E0B" rx="2"/>
          </svg>
        </div>
        
        <div className="text-white/80 text-xs text-center">
          Fractions work the same whether shown as pizza slices or bars!
        </div>
      </div>

      {/* Progress indicator */}
      <div className="text-center">
        <div className="text-white/60 text-xs mb-2">Overall Progress</div>
        <div className="flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-8 h-8 rounded-full ${
                i < Math.floor(currentPercent / 20) ? 'bg-yellow-400' : 'bg-white/20'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              {i < Math.floor(currentPercent / 20) && (
                <div className="w-full h-full flex items-center justify-center text-purple-900">
                  ⭐
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
