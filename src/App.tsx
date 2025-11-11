import { useState } from 'react';
import { MenuScreen } from './components/MenuScreen';
import { GameScreen } from './components/GameScreen';
import { PizzaLabScreen } from './components/PizzaLabScreen';
import { RewardRoomScreen } from './components/RewardRoomScreen';
import './styles/globals.css';

type Screen = 'menu' | 'game' | 'howToPlay' | 'leaderboard' | 'practice';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen w-full overflow-hidden bg-[#0a0e27]">
      {currentScreen === 'menu' && (
        <MenuScreen onNavigate={setCurrentScreen} />
      )}
      {currentScreen === 'game' && (
        <GameScreen 
          onBackToMenu={() => setCurrentScreen('menu')}
          score={score}
          setScore={setScore}
        />
      )}
      {currentScreen === 'howToPlay' && (
        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 max-w-2xl shadow-2xl">
            <h2 className="text-white text-center mb-6">How to Play</h2>
            <p className="text-white text-center mb-6">
              Solve fraction problems by selecting the correct pizza slice! 
              Earn points for correct answers and use power-ups to boost your score!
            </p>
            <button
              onClick={() => setCurrentScreen('menu')}
              className="mx-auto block bg-yellow-400 hover:bg-yellow-300 text-purple-900 px-8 py-4 rounded-full transition-all transform hover:scale-105"
            >
              Back to Menu
            </button>
          </div>
        </div>
      )}
      {currentScreen === 'leaderboard' && (
        <RewardRoomScreen onBackToMenu={() => setCurrentScreen('menu')} />
      )}
      {currentScreen === 'practice' && (
        <PizzaLabScreen onBackToMenu={() => setCurrentScreen('menu')} />
      )}
    </div>
  );
}