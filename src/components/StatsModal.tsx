import { motion } from 'motion/react';
import { X, Target, Zap, TrendingUp, Award } from 'lucide-react';

interface PlayerStats {
  stars: number;
  coins: number;
  rank: string;
  level: number;
  accuracy: number;
  gamesPlayed: number;
  badges: string[];
}

interface StatsModalProps {
  stats: PlayerStats;
  onClose: () => void;
}

export function StatsModal({ stats, onClose }: StatsModalProps) {
  const fractionTypes = [
    { type: '1/2 (Halves)', mastery: 95, problems: 45 },
    { type: '1/4 (Quarters)', mastery: 88, problems: 38 },
    { type: '1/3 (Thirds)', mastery: 82, problems: 32 },
    { type: '1/6 (Sixths)', mastery: 75, problems: 28 },
    { type: '1/8 (Eighths)', mastery: 68, problems: 22 },
  ];

  const recentActivity = [
    { date: 'Today', stars: 125, accuracy: 90 },
    { date: 'Yesterday', stars: 148, accuracy: 88 },
    { date: '2 days ago', stars: 112, accuracy: 85 },
    { date: '3 days ago', stars: 98, accuracy: 92 },
    { date: '4 days ago', stars: 105, accuracy: 87 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0, y: 100 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-cyan-400 relative custom-scrollbar"
      >
        {/* Close button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors z-10"
        >
          <X className="w-6 h-6 text-white" />
        </motion.button>

        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="text-6xl mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📊
          </motion.div>
          <h2 className="text-white mb-2">Your Stats</h2>
          <p className="text-white/70">Track your cosmic pizza journey!</p>
        </div>

        {/* Overall Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-4 text-center"
          >
            <Target className="w-8 h-8 text-white mx-auto mb-2" />
            <div className="text-3xl text-white mb-1">{stats.accuracy}%</div>
            <div className="text-white/90 text-sm">Accuracy</div>
          </motion.div>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-4 text-center"
          >
            <Zap className="w-8 h-8 text-white mx-auto mb-2" />
            <div className="text-3xl text-white mb-1">{stats.gamesPlayed}</div>
            <div className="text-white/90 text-sm">Games Played</div>
          </motion.div>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-4 text-center"
          >
            <TrendingUp className="w-8 h-8 text-white mx-auto mb-2" />
            <div className="text-3xl text-white mb-1">{stats.level}</div>
            <div className="text-white/90 text-sm">Current Level</div>
          </motion.div>

          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl p-4 text-center"
          >
            <Award className="w-8 h-8 text-white mx-auto mb-2" />
            <div className="text-3xl text-white mb-1">{stats.badges.length}</div>
            <div className="text-white/90 text-sm">Badges Earned</div>
          </motion.div>
        </div>

        {/* Fraction Mastery */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8">
          <h3 className="text-white mb-4 flex items-center gap-2">
            🎯 Fraction Type Mastery
          </h3>
          <div className="space-y-4">
            {fractionTypes.map((fraction, i) => (
              <motion.div
                key={fraction.type}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm">{fraction.type}</span>
                  <span className="text-white/70 text-sm">{fraction.problems} problems solved</span>
                </div>
                <div className="bg-white/20 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${fraction.mastery}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  />
                </div>
                <div className="text-right text-green-300 text-sm mt-1">{fraction.mastery}% mastery</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
          <h3 className="text-white mb-4 flex items-center gap-2">
            📅 Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <motion.div
                key={activity.date}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="bg-white/10 rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <div className="text-white">{activity.date}</div>
                  <div className="text-white/60 text-sm">{activity.accuracy}% accuracy</div>
                </div>
                <div className="text-yellow-300 flex items-center gap-2">
                  <span>⭐</span>
                  <span className="text-xl">{activity.stars}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-8 text-center bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-6"
        >
          <div className="text-4xl mb-3">🌟</div>
          <p className="text-white">
            {stats.accuracy >= 90 
              ? "You're a fraction master! Keep up the amazing work!"
              : stats.accuracy >= 75
              ? "Great progress! You're becoming a pizza pro!"
              : "Keep practicing! Every slice makes you better!"}
          </p>
        </motion.div>

        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
          }
        `}</style>
      </motion.div>
    </motion.div>
  );
}
