import React, { useState, useEffect } from 'react';

const sampleWords = [
  { id: 1, word: 'because', sentence: 'I stayed home due to the rain.', category: 'tricky', difficulty: 'medium' },
  { id: 2, word: 'friend', sentence: "She's my best pal.", category: 'i-before-e', difficulty: 'easy' },
  { id: 3, word: 'decide', sentence: "I can't choose what to wear.", category: 'soft-c', difficulty: 'medium' },
  { id: 4, word: 'certain', sentence: "I'm absolutely sure about it.", category: 'soft-c', difficulty: 'hard' },
  { id: 5, word: 'accident', sentence: 'The crash happened this morning.', category: 'soft-c', difficulty: 'hard' },
];

const sampleRewards = [
  { id: 1, name: 'Pick Movie Night', cost: 100, icon: '🎬' },
  { id: 2, name: '30 Mins Extra Screen Time', cost: 200, icon: '📱' },
  { id: 3, name: 'Ice Cream Trip', cost: 500, icon: '🍦' },
  { id: 4, name: 'Day Out', cost: 1000, icon: '🎢' },
];

const badges = [
  { id: 'first', name: 'First Steps', icon: '👣', desc: 'Complete your first test' },
  { id: 'perfect', name: 'Perfect 10', icon: '⭐', desc: 'Get 100% on a test' },
  { id: 'streak3', name: 'Streak Starter', icon: '🔥', desc: '3-day streak' },
  { id: 'streak7', name: 'Week Warrior', icon: '💪', desc: '7-day streak' },
  { id: 'century', name: 'Century Club', icon: '💰', desc: 'Earn 100 coins' },
];

const Keyboard = ({ onKey, onBackspace, onSubmit }) => {
  const rows = [
    ['q','w','e','r','t','y','u','i','o','p'],
    ['a','s','d','f','g','h','j','k','l'],
    ['z','x','c','v','b','n','m']
  ];
  return (
    <div className="mt-4">
      {rows.map((row, i) => (
        <div key={i} className="flex justify-center gap-1 mb-1">
          {i === 2 && <button onClick={onBackspace} className="px-3 py-4 bg-red-400 text-white rounded-lg text-sm font-bold active:scale-95">←</button>}
          {row.map(k => (
            <button key={k} onClick={() => onKey(k)} className="w-8 h-12 bg-gray-200 rounded-lg text-lg font-semibold active:bg-gray-300 active:scale-95 uppercase">{k}</button>
          ))}
          {i === 2 && <button onClick={onSubmit} className="px-3 py-4 bg-green-500 text-white rounded-lg text-sm font-bold active:scale-95">✓</button>}
        </div>
      ))}
    </div>
  );
};

const CoinAnimation = ({ amount }) => {
  const [show, setShow] = useState(true);
  useEffect(() => { const t = setTimeout(() => setShow(false), 1500); return () => clearTimeout(t); }, []);
  if (!show) return null;
  return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-yellow-500 animate-bounce">+{amount} 🪙</div>;
};

export default function App() {
  const [screen, setScreen] = useState('home');
  const [coins, setCoins] = useState(75);
  const [streak, setStreak] = useState(2);
  const [earnedBadges, setEarnedBadges] = useState(['first']);
  const [testWords, setTestWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [showResult, setShowResult] = useState(null);
  const [coinAnim, setCoinAnim] = useState(null);
  const [speaking, setSpeaking] = useState(false);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      setSpeaking(true);
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.85;
      u.onend = () => setSpeaking(false);
      speechSynthesis.speak(u);
    }
  };

  const startTest = () => {
    setTestWords([...sampleWords].sort(() => Math.random() - 0.5).slice(0, 5));
    setCurrentIndex(0);
    setInput('');
    setResults([]);
    setShowResult(null);
    setScreen('test');
  };

  const handleKey = (k) => { if (showResult === null) setInput(prev => prev + k); };
  const handleBackspace = () => { if (showResult === null) setInput(prev => prev.slice(0, -1)); };

  const handleSubmit = () => {
    if (input.trim() === '' || showResult !== null) return;
    const word = testWords[currentIndex];
    const correct = input.toLowerCase().trim() === word.word.toLowerCase();
    const earned = correct ? 2 : 0;
    setResults(prev => [...prev, { word: word.word, attempt: input, correct, coins: earned }]);
    setShowResult({ correct, word: word.word });
    if (earned > 0) {
      setCoins(prev => prev + earned);
      setCoinAnim(earned);
      setTimeout(() => setCoinAnim(null), 1600);
    }
  };

  const nextWord = () => {
    if (currentIndex < testWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setInput('');
      setShowResult(null);
    } else {
      const correctCount = results.filter(r => r.correct).length + (showResult?.correct ? 1 : 0);
      const pct = ((correctCount) / testWords.length) * 100;
      let bonus = 5;
      if (pct === 100) bonus = 50;
      else if (pct >= 80) bonus = 25;
      else if (pct >= 60) bonus = 10;
      setCoins(prev => prev + bonus);
      setScreen('results');
    }
  };

  const currentWord = testWords[currentIndex];

  // Home Screen
  if (screen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-600 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🪙</span>
              <span className="text-2xl font-bold text-white">{coins}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <span className="text-xl font-bold text-white">{streak} days</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white text-center mb-2">Alba's Spelling</h1>
          <p className="text-white/80 text-center mb-8">Let's practice! 📚</p>

          <button onClick={startTest} className="w-full bg-white rounded-2xl p-6 mb-4 shadow-lg active:scale-98 flex items-center gap-4">
            <span className="text-4xl">✏️</span>
            <div className="text-left">
              <div className="font-bold text-lg text-gray-800">Start Test</div>
              <div className="text-gray-500 text-sm">5 words • Earn coins!</div>
            </div>
          </button>

          <button onClick={() => setScreen('rewards')} className="w-full bg-white/90 rounded-2xl p-6 mb-4 shadow-lg active:scale-98 flex items-center gap-4">
            <span className="text-4xl">🎁</span>
            <div className="text-left">
              <div className="font-bold text-lg text-gray-800">Rewards Shop</div>
              <div className="text-gray-500 text-sm">Spend your coins</div>
            </div>
          </button>

          <button onClick={() => setScreen('badges')} className="w-full bg-white/90 rounded-2xl p-6 mb-4 shadow-lg active:scale-98 flex items-center gap-4">
            <span className="text-4xl">🏆</span>
            <div className="text-left">
              <div className="font-bold text-lg text-gray-800">Badges</div>
              <div className="text-gray-500 text-sm">{earnedBadges.length}/{badges.length} earned</div>
            </div>
          </button>

          <button onClick={() => setScreen('progress')} className="w-full bg-white/90 rounded-2xl p-6 shadow-lg active:scale-98 flex items-center gap-4">
            <span className="text-4xl">📊</span>
            <div className="text-left">
              <div className="font-bold text-lg text-gray-800">Progress</div>
              <div className="text-gray-500 text-sm">See how you're doing</div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // Test Screen
  if (screen === 'test' && currentWord) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-500 to-cyan-600 p-4 relative">
        {coinAnim && <CoinAnimation amount={coinAnim} />}
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setScreen('home')} className="text-white/80 text-sm">✕ Quit</button>
            <div className="flex items-center gap-2">
              <span className="text-xl">🪙</span>
              <span className="text-lg font-bold text-white">{coins}</span>
            </div>
          </div>

          <div className="bg-white/20 rounded-full h-2 mb-6">
            <div className="bg-white rounded-full h-2 transition-all" style={{ width: `${((currentIndex + 1) / testWords.length) * 100}%` }} />
          </div>
          <p className="text-white/80 text-center text-sm mb-4">Word {currentIndex + 1} of {testWords.length}</p>

          <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
            <button onClick={() => speak(currentWord.word + '. ' + currentWord.sentence)} disabled={speaking} className="w-full bg-indigo-100 rounded-xl p-4 mb-4 flex items-center justify-center gap-2 active:bg-indigo-200">
              <span className="text-2xl">{speaking ? '🔊' : '🔈'}</span>
              <span className="font-semibold text-indigo-700">Hear Word</span>
            </button>

            <p className="text-gray-500 text-center text-sm mb-4">"{currentWord.sentence}"</p>

            <div className="bg-gray-100 rounded-xl p-4 min-h-16 flex items-center justify-center mb-2">
              <span className="text-2xl font-bold tracking-wider text-gray-800">{input || <span className="text-gray-400">Type here...</span>}</span>
            </div>

            {showResult !== null && (
              <div className={`rounded-xl p-4 mb-2 ${showResult.correct ? 'bg-green-100' : 'bg-red-100'}`}>
                <p className={`text-center font-bold ${showResult.correct ? 'text-green-700' : 'text-red-700'}`}>
                  {showResult.correct ? '✓ Correct! +2 🪙' : `✗ It's spelled: ${showResult.word}`}
                </p>
              </div>
            )}
          </div>

          {showResult === null ? (
            <Keyboard onKey={handleKey} onBackspace={handleBackspace} onSubmit={handleSubmit} />
          ) : (
            <button onClick={nextWord} className="w-full bg-white rounded-xl p-4 font-bold text-indigo-600 text-lg active:scale-98">
              {currentIndex < testWords.length - 1 ? 'Next Word →' : 'See Results'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Results Screen
  if (screen === 'results') {
    const correctCount = results.filter(r => r.correct).length;
    const pct = (correctCount / results.length) * 100;
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-500 to-emerald-600 p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <span className="text-6xl">{pct === 100 ? '🌟' : pct >= 60 ? '👏' : '💪'}</span>
            <h1 className="text-3xl font-bold text-white mt-4">Test Complete!</h1>
            <p className="text-white/80 text-xl mt-2">{correctCount}/{results.length} correct</p>
          </div>

          <div className="bg-white rounded-2xl p-4 mb-6">
            {results.map((r, i) => (
              <div key={i} className={`flex items-center justify-between p-3 ${i > 0 ? 'border-t' : ''}`}>
                <div>
                  <span className={`font-bold ${r.correct ? 'text-green-600' : 'text-red-600'}`}>{r.word}</span>
                  {!r.correct && <span className="text-gray-400 text-sm ml-2">({r.attempt})</span>}
                </div>
                <span>{r.correct ? '✓' : '✗'}</span>
              </div>
            ))}
          </div>

          <div className="bg-white/20 rounded-2xl p-4 mb-6 text-center">
            <p className="text-white font-bold text-lg">Coins Earned</p>
            <p className="text-3xl text-white">🪙 {results.reduce((a, r) => a + r.coins, 0) + (pct === 100 ? 50 : pct >= 80 ? 25 : pct >= 60 ? 10 : 5)}</p>
          </div>

          <button onClick={() => setScreen('home')} className="w-full bg-white rounded-xl p-4 font-bold text-green-600 text-lg">
            Done
          </button>
        </div>
      </div>
    );
  }

  // Rewards Screen
  if (screen === 'rewards') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-500 to-orange-500 p-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setScreen('home')} className="text-white/80">← Back</button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🪙</span>
              <span className="text-xl font-bold text-white">{coins}</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-6">🎁 Rewards Shop</h1>

          {sampleRewards.map(r => (
            <div key={r.id} className="bg-white rounded-2xl p-4 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{r.icon}</span>
                <div>
                  <div className="font-bold text-gray-800">{r.name}</div>
                  <div className="text-yellow-600 font-semibold">🪙 {r.cost}</div>
                </div>
              </div>
              <button disabled={coins < r.cost} className={`px-4 py-2 rounded-lg font-bold ${coins >= r.cost ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                {coins >= r.cost ? 'Claim' : 'Locked'}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Badges Screen
  if (screen === 'badges') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-500 to-rose-600 p-4">
        <div className="max-w-md mx-auto">
          <button onClick={() => setScreen('home')} className="text-white/80 mb-6">← Back</button>
          <h1 className="text-2xl font-bold text-white text-center mb-6">🏆 Badges</h1>

          <div className="grid grid-cols-3 gap-3">
            {badges.map(b => {
              const earned = earnedBadges.includes(b.id);
              return (
                <div key={b.id} className={`bg-white rounded-xl p-4 text-center ${!earned && 'opacity-50'}`}>
                  <span className="text-3xl">{b.icon}</span>
                  <p className="text-xs font-bold mt-2 text-gray-700">{b.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Progress Screen
  if (screen === 'progress') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-500 to-cyan-600 p-4">
        <div className="max-w-md mx-auto">
          <button onClick={() => setScreen('home')} className="text-white/80 mb-6">← Back</button>
          <h1 className="text-2xl font-bold text-white text-center mb-6">📊 Progress</h1>

          <div className="bg-white rounded-2xl p-6 mb-4">
            <h2 className="font-bold text-gray-800 mb-4">Weekly Target</h2>
            <div className="bg-gray-100 rounded-full h-4 mb-2">
              <div className="bg-teal-500 rounded-full h-4" style={{ width: '60%' }} />
            </div>
            <p className="text-gray-500 text-sm">150 / 250 coins this week</p>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-4">
            <h2 className="font-bold text-gray-800 mb-3">Problem Areas</h2>
            <div className="space-y-2">
              <div className="flex justify-between"><span className="text-gray-600">Soft C words</span><span className="text-red-500 font-bold">42%</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Double letters</span><span className="text-yellow-500 font-bold">68%</span></div>
              <div className="flex justify-between"><span className="text-gray-600">Silent letters</span><span className="text-green-500 font-bold">85%</span></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-bold text-gray-800 mb-3">Stats</h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div><p className="text-2xl font-bold text-teal-600">23</p><p className="text-gray-500 text-sm">Tests Done</p></div>
              <div><p className="text-2xl font-bold text-teal-600">71%</p><p className="text-gray-500 text-sm">Avg Score</p></div>
              <div><p className="text-2xl font-bold text-teal-600">2</p><p className="text-gray-500 text-sm">Day Streak</p></div>
              <div><p className="text-2xl font-bold text-teal-600">5</p><p className="text-gray-500 text-sm">Best Streak</p></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
