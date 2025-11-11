import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Globe, GraduationCap } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  stars: number;
  time: string;
  isCurrentPlayer?: boolean;
}

interface LeaderboardPanelProps {
  currentPlayerRank: number;
}

type LeaderboardTab = 'friends' | 'global' | 'classroom';

const mockLeaderboardData: { [key in LeaderboardTab]: LeaderboardEntry[] } = {
  friends: [
    { rank: 1, name: "Alex the Great", avatar: "👨‍🚀", stars: 2450, time: "2:15" },
    { rank: 2, name: "Pizza Master Mia", avatar: "👩‍🍳", stars: 2380, time: "2:22" },
    { rank: 3, name: "Cosmic Carlos", avatar: "🧑‍🚀", stars: 2210, time: "2:35" },
    { rank: 4, name: "Fraction Frankie", avatar: "🤓", stars: 1890, time: "2:48" },
    { rank: 5, name: "You", avatar: "😊", stars: 1247, time: "3:02", isCurrentPlayer: true },
    { rank: 6, name: "Math Wizard Sam", avatar: "🧙", stars: 1180, time: "3:15" },
    { rank: 7, name: "Space Cadet Zoe", avatar: "👩‍🚀", stars: 1050, time: "3:28" },
  ],
  global: [
    { rank: 1, name: "🌟 GalaxyKing", avatar: "👑", stars: 15420, time: "1:45" },
    { rank: 2, name: "🔥 PizzaLegend", avatar: "🍕", stars: 14800, time: "1:52" },
    { rank: 3, name: "⚡ FractionFlash", avatar: "⚡", stars: 13950, time: "1:58" },
    { rank: 4, name: "🎯 MathNinja", avatar: "🥷", stars: 12200, time: "2:05" },
    { rank: 5, name: "🌙 CosmicChef", avatar: "👨‍🍳", stars: 11500, time: "2:12" },
  ],
  classroom: [
    { rank: 1, name: "Emma - Room 204", avatar: "👧", stars: 3200, time: "2:10" },
    { rank: 2, name: "Liam - Room 204", avatar: "👦", stars: 2950, time: "2:18" },
    { rank: 3, name: "Olivia - Room 204", avatar: "👩", stars: 2700, time: "2:25" },
    { rank: 4, name: "Noah - Room 204", avatar: "👨", stars: 2400, time: "2:32" },
    { rank: 5, name: "You - Room 204", avatar: "😊", stars: 1247, time: "3:02", isCurrentPlayer: true },
  ]
};

export function LeaderboardPanel({ currentPlayerRank }: LeaderboardPanelProps) {
  const [activeTab, setActiveTab] = useState<LeaderboardTab>('friends');
  
  const leaderboard = mockLeaderboardData[activeTab];

  const tabs: { id: LeaderboardTab; label: string; icon: React.ReactNode }[] = [
    { id: 'friends', label: 'Friends', icon: <Users className="w-4 h-4" /> },
    { id: 'global', label: 'Global', icon: <Globe className="w-4 h-4" /> },
    { id: 'classroom', label: 'Classroom', icon: <GraduationCap className="w-4 h-4" /> },
  ];

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border-2 border-blue-400/30 h-full"
    >
      <h2 className="text-white text-center mb-4 flex items-center justify-center gap-2">
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🏆
        </motion.span>
        Leaderboard
      </h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2 rounded-full flex items-center justify-center gap-2 transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {tab.icon}
            <span className="text-sm hidden sm:inline">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Leaderboard List */}
      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {leaderboard.map((entry, index) => (
          <motion.div
            key={entry.rank}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, x: 5 }}
            className={`
              rounded-2xl p-4 transition-all
              ${entry.isCurrentPlayer 
                ? 'bg-gradient-to-r from-yellow-400/30 to-orange-500/30 border-2 border-yellow-400' 
                : 'bg-white/10 hover:bg-white/20 border-2 border-transparent'
              }
            `}
          >
            <div className="flex items-center gap-4">
              {/* Rank */}
              <div className="flex-shrink-0">
                {entry.rank <= 3 ? (
                  <motion.div 
                    className="text-3xl"
                    animate={entry.rank === 1 ? { 
                      rotate: [-5, 5, -5],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                  </motion.div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                    #{entry.rank}
                  </div>
                )}
              </div>

              {/* Avatar */}
              <div className="text-3xl flex-shrink-0">
                {entry.avatar}
              </div>

              {/* Name and Stats */}
              <div className="flex-1 min-w-0">
                <div className={`truncate ${entry.isCurrentPlayer ? 'text-yellow-300' : 'text-white'}`}>
                  {entry.name}
                </div>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <span className="flex items-center gap-1">
                    ⭐ {entry.stars.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    ⏱️ {entry.time}
                  </span>
                </div>
              </div>

              {/* Neon glow effect on hover */}
              {!entry.isCurrentPlayer && (
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.2 }}
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.5), transparent)',
                  }}
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Current Player Highlight (if not visible) */}
      {currentPlayerRank > 7 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 pt-4 border-t-2 border-white/20"
        >
          <div className="text-white/60 text-sm text-center mb-2">Your Rank</div>
          <div className="bg-gradient-to-r from-yellow-400/30 to-orange-500/30 border-2 border-yellow-400 rounded-2xl p-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                #{currentPlayerRank}
              </div>
              <div className="text-3xl">😊</div>
              <div className="flex-1">
                <div className="text-yellow-300">You</div>
                <div className="text-sm text-white/70">Keep climbing!</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

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
  );
}
