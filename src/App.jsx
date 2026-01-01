import React, { useState, useEffect } from 'react';
import ttsService from './services/tts';

// ============ EXPANDED WORD LIST ============
const allWords = [
  // Tricky words
  { id: 1, word: 'because', sentence: 'I stayed home due to the rain.', category: 'tricky', difficulty: 'medium' },
  { id: 2, word: 'said', sentence: 'She told me earlier.', category: 'tricky', difficulty: 'easy' },
  { id: 3, word: 'could', sentence: 'Maybe I can help.', category: 'tricky', difficulty: 'easy' },
  { id: 4, word: 'would', sentence: 'I wish you had come.', category: 'tricky', difficulty: 'easy' },
  { id: 5, word: 'should', sentence: 'You ought to try it.', category: 'tricky', difficulty: 'easy' },
  { id: 26, word: 'people', sentence: 'Many humans were there.', category: 'tricky', difficulty: 'medium' },
  { id: 27, word: 'answer', sentence: 'Can you reply to this?', category: 'tricky', difficulty: 'medium' },
  { id: 28, word: 'busy', sentence: 'I have lots to do.', category: 'tricky', difficulty: 'easy' },
  { id: 29, word: 'beautiful', sentence: 'The view was lovely.', category: 'tricky', difficulty: 'hard' },
  { id: 30, word: 'again', sentence: 'Do it once more.', category: 'tricky', difficulty: 'easy' },

  // I before E
  { id: 6, word: 'friend', sentence: "She's my best pal.", category: 'i-before-e', difficulty: 'easy' },
  { id: 7, word: 'believe', sentence: 'I think it will work out.', category: 'i-before-e', difficulty: 'medium' },
  { id: 8, word: 'receive', sentence: 'Did you get my message?', category: 'i-before-e', difficulty: 'hard' },
  { id: 9, word: 'piece', sentence: 'Can I have a slice?', category: 'i-before-e', difficulty: 'medium' },
  { id: 10, word: 'achieve', sentence: 'You can reach your goals.', category: 'i-before-e', difficulty: 'hard' },
  { id: 31, word: 'weird', sentence: 'That was very strange.', category: 'i-before-e', difficulty: 'medium' },
  { id: 32, word: 'neighbour', sentence: 'The person next door.', category: 'i-before-e', difficulty: 'hard' },
  { id: 33, word: 'either', sentence: 'Pick one or the other.', category: 'i-before-e', difficulty: 'medium' },

  // Soft C
  { id: 11, word: 'decide', sentence: "I can't choose what to wear.", category: 'soft-c', difficulty: 'medium' },
  { id: 12, word: 'certain', sentence: "I'm absolutely sure about it.", category: 'soft-c', difficulty: 'hard' },
  { id: 13, word: 'accident', sentence: 'The crash happened this morning.', category: 'soft-c', difficulty: 'hard' },
  { id: 14, word: 'circle', sentence: 'Draw a round shape.', category: 'soft-c', difficulty: 'medium' },
  { id: 15, word: 'celebrate', sentence: "Let's have a party!", category: 'soft-c', difficulty: 'hard' },
  { id: 34, word: 'necessary', sentence: 'You need to do this.', category: 'soft-c', difficulty: 'hard' },
  { id: 35, word: 'ceiling', sentence: 'Look up at the top.', category: 'soft-c', difficulty: 'medium' },
  { id: 36, word: 'notice', sentence: 'Did you spot it?', category: 'soft-c', difficulty: 'medium' },

  // Double letters
  { id: 16, word: 'different', sentence: 'This one is not the same.', category: 'double-letters', difficulty: 'medium' },
  { id: 17, word: 'beginning', sentence: 'This is just the start.', category: 'double-letters', difficulty: 'hard' },
  { id: 18, word: 'running', sentence: 'She was moving fast.', category: 'double-letters', difficulty: 'easy' },
  { id: 19, word: 'swimming', sentence: 'I love the pool.', category: 'double-letters', difficulty: 'medium' },
  { id: 20, word: 'happened', sentence: 'It occurred yesterday.', category: 'double-letters', difficulty: 'medium' },
  { id: 37, word: 'accommodation', sentence: 'We need a place to stay.', category: 'double-letters', difficulty: 'hard' },
  { id: 38, word: 'embarrass', sentence: "Don't make me feel awkward.", category: 'double-letters', difficulty: 'hard' },
  { id: 39, word: 'committee', sentence: 'The group made a choice.', category: 'double-letters', difficulty: 'hard' },
  { id: 40, word: 'address', sentence: 'Where do you live?', category: 'double-letters', difficulty: 'medium' },
  { id: 41, word: 'immediately', sentence: 'Do it right now.', category: 'double-letters', difficulty: 'hard' },

  // Silent letters
  { id: 21, word: 'knight', sentence: 'The warrior rode a horse.', category: 'silent-letters', difficulty: 'medium' },
  { id: 22, word: 'knife', sentence: 'Cut it with the blade.', category: 'silent-letters', difficulty: 'easy' },
  { id: 23, word: 'write', sentence: 'Put pen to paper.', category: 'silent-letters', difficulty: 'easy' },
  { id: 24, word: 'island', sentence: 'The land surrounded by water.', category: 'silent-letters', difficulty: 'medium' },
  { id: 25, word: 'castle', sentence: 'The king lived there.', category: 'silent-letters', difficulty: 'medium' },
  { id: 42, word: 'rhythm', sentence: 'The beat of the music.', category: 'silent-letters', difficulty: 'hard' },
  { id: 43, word: 'scissors', sentence: 'Use them to cut paper.', category: 'silent-letters', difficulty: 'medium' },
  { id: 44, word: 'climb', sentence: 'Go up the ladder.', category: 'silent-letters', difficulty: 'easy' },
  { id: 45, word: 'doubt', sentence: 'I am not sure.', category: 'silent-letters', difficulty: 'medium' },
  { id: 46, word: 'listen', sentence: 'Pay attention to this.', category: 'silent-letters', difficulty: 'easy' },

  // Endings (-tion, -sion, -ous)
  { id: 47, word: 'station', sentence: 'Wait at the platform.', category: 'endings', difficulty: 'medium' },
  { id: 48, word: 'mention', sentence: 'Did you talk about it?', category: 'endings', difficulty: 'medium' },
  { id: 49, word: 'question', sentence: 'Can I ask something?', category: 'endings', difficulty: 'medium' },
  { id: 50, word: 'direction', sentence: 'Which way should I go?', category: 'endings', difficulty: 'hard' },
  { id: 51, word: 'decision', sentence: 'What did you pick?', category: 'endings', difficulty: 'hard' },
  { id: 52, word: 'famous', sentence: 'Everyone knows them.', category: 'endings', difficulty: 'medium' },
  { id: 53, word: 'dangerous', sentence: 'This is not safe.', category: 'endings', difficulty: 'hard' },
  { id: 54, word: 'serious', sentence: 'This is very important.', category: 'endings', difficulty: 'hard' },

  // Homophones
  { id: 55, word: 'their', sentence: 'It belongs to them.', category: 'homophones', difficulty: 'medium' },
  { id: 56, word: 'there', sentence: 'Look over in that place.', category: 'homophones', difficulty: 'medium' },
  { id: 57, word: 'hear', sentence: 'Use your ears to listen.', category: 'homophones', difficulty: 'easy' },
  { id: 58, word: 'here', sentence: 'Come to this spot.', category: 'homophones', difficulty: 'easy' },
  { id: 59, word: 'where', sentence: 'In what place?', category: 'homophones', difficulty: 'easy' },
  { id: 60, word: 'wear', sentence: 'Put on your clothes.', category: 'homophones', difficulty: 'easy' },

  // Hard spellings
  { id: 61, word: 'definitely', sentence: 'I am totally sure.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 62, word: 'separate', sentence: 'Keep them apart.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 63, word: 'government', sentence: 'The leaders of our country.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 64, word: 'recommend', sentence: 'I suggest you try this.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 65, word: 'queue', sentence: 'Wait in the line.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 66, word: 'conscience', sentence: 'Knowing right from wrong.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 67, word: 'mischievous', sentence: 'Being a bit naughty.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 68, word: 'restaurant', sentence: 'A place to eat meals.', category: 'hard-spellings', difficulty: 'hard' },

  // More common words
  { id: 69, word: 'enough', sentence: 'I have plenty now.', category: 'tricky', difficulty: 'medium' },
  { id: 70, word: 'through', sentence: 'Go from one side to the other.', category: 'tricky', difficulty: 'hard' },
  { id: 71, word: 'thought', sentence: 'I had an idea.', category: 'tricky', difficulty: 'medium' },
  { id: 72, word: 'brought', sentence: 'I carried it here.', category: 'tricky', difficulty: 'medium' },
  { id: 73, word: 'caught', sentence: 'I grabbed the ball.', category: 'tricky', difficulty: 'medium' },
  { id: 74, word: 'taught', sentence: 'Someone showed me how.', category: 'tricky', difficulty: 'medium' },
  { id: 75, word: 'special', sentence: 'This is really important.', category: 'soft-c', difficulty: 'medium' },
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
  { id: 'century', name: 'Century Club', icon: '💰', desc: 'Earn 100 total coins' },
  { id: 'tests10', name: 'Practice Pro', icon: '📚', desc: 'Complete 10 tests' },
];

const categoryNames = {
  'tricky': 'Tricky Words',
  'i-before-e': 'I Before E',
  'soft-c': 'Soft C Words',
  'double-letters': 'Double Letters',
  'silent-letters': 'Silent Letters',
  'endings': 'Word Endings',
  'homophones': 'Sound-Alike Words',
  'hard-spellings': 'Challenge Words'
};

// ============ STORAGE HELPERS ============
const STORAGE_KEY = 'alba_spelling_data';

const getDefaultData = () => ({
  coins: 0,
  totalCoinsEarned: 0,
  streak: 0,
  bestStreak: 0,
  lastTestDate: null,
  earnedBadges: [],
  claimedRewards: [],
  testHistory: [],
  wordStats: {}, // { wordId: { attempts: 0, correct: 0, lastAttempt: date } }
});

const loadData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...getDefaultData(), ...JSON.parse(saved) };
  } catch (e) { console.error('Failed to load:', e); }
  return getDefaultData();
};

const saveData = (data) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }
  catch (e) { console.error('Failed to save:', e); }
};

// ============ SMART WORD SELECTION ============
const selectSmartWords = (gameData, count = 5) => {
  const { wordStats, testHistory } = gameData;

  // Calculate category accuracy
  const categoryAccuracy = {};
  Object.keys(categoryNames).forEach(cat => {
    categoryAccuracy[cat] = { correct: 0, total: 0 };
  });

  testHistory.forEach(test => {
    test.words?.forEach(w => {
      if (categoryAccuracy[w.category]) {
        categoryAccuracy[w.category].total++;
        if (w.correct) categoryAccuracy[w.category].correct++;
      }
    });
  });

  // Score each word (lower = needs more practice)
  const scoredWords = allWords.map(word => {
    const stats = wordStats[word.id] || { attempts: 0, correct: 0 };
    const catStats = categoryAccuracy[word.category] || { correct: 0, total: 0 };
    const catAccuracy = catStats.total > 0 ? catStats.correct / catStats.total : 0.5;
    const wordAccuracy = stats.attempts > 0 ? stats.correct / stats.attempts : 0.5;

    // Lower score = higher priority (needs practice)
    let score = wordAccuracy * 0.6 + catAccuracy * 0.4;

    // Boost never-attempted words
    if (stats.attempts === 0) score -= 0.3;

    // Boost words from weak categories
    if (catAccuracy < 0.5) score -= 0.2;

    // Add randomness to prevent repetition
    score += Math.random() * 0.3;

    return { ...word, score };
  });

  // Sort by score (lowest first = needs most practice)
  scoredWords.sort((a, b) => a.score - b.score);

  // Take top candidates but ensure category variety
  const selected = [];
  const usedCategories = new Set();

  for (const word of scoredWords) {
    if (selected.length >= count) break;

    // Prefer variety in first 3 picks
    if (selected.length < 3 && usedCategories.has(word.category)) continue;

    selected.push(word);
    usedCategories.add(word.category);
  }

  // Fill remaining slots if needed
  while (selected.length < count) {
    const remaining = scoredWords.filter(w => !selected.includes(w));
    if (remaining.length === 0) break;
    selected.push(remaining[0]);
  }

  // Shuffle final selection
  return selected.sort(() => Math.random() - 0.5);
};

// ============ COMPONENTS ============
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

const BadgePopup = ({ badge, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 text-center animate-bounce">
        <span className="text-6xl">{badge.icon}</span>
        <h2 className="text-2xl font-bold mt-4 text-gray-800">Badge Earned!</h2>
        <p className="text-xl font-semibold text-purple-600 mt-2">{badge.name}</p>
        <p className="text-gray-500 mt-1">{badge.desc}</p>
      </div>
    </div>
  );
};

// ============ MAIN APP ============
export default function App() {
  const [screen, setScreen] = useState('home');
  const [gameData, setGameData] = useState(loadData);
  const [testWords, setTestWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [showResult, setShowResult] = useState(null);
  const [coinAnim, setCoinAnim] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [newBadge, setNewBadge] = useState(null);

  // Persist on change
  useEffect(() => { saveData(gameData); }, [gameData]);

  // Check streak on load
  useEffect(() => {
    const today = new Date().toDateString();
    const last = gameData.lastTestDate;
    if (last) {
      const lastDate = new Date(last);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastDate.toDateString() !== today && lastDate.toDateString() !== yesterday.toDateString()) {
        setGameData(prev => ({ ...prev, streak: 0 }));
      }
    }
  }, []);

  const { coins, streak, earnedBadges, totalCoinsEarned, bestStreak, testHistory, claimedRewards, wordStats } = gameData;

  // Badge checking
  const checkBadges = (data) => {
    const newBadges = [];
    if (!data.earnedBadges.includes('first') && data.testHistory.length >= 1) newBadges.push('first');
    if (!data.earnedBadges.includes('perfect') && data.testHistory.some(t => t.score === t.total)) newBadges.push('perfect');
    if (!data.earnedBadges.includes('streak3') && data.streak >= 3) newBadges.push('streak3');
    if (!data.earnedBadges.includes('streak7') && data.streak >= 7) newBadges.push('streak7');
    if (!data.earnedBadges.includes('century') && data.totalCoinsEarned >= 100) newBadges.push('century');
    if (!data.earnedBadges.includes('tests10') && data.testHistory.length >= 10) newBadges.push('tests10');

    if (newBadges.length > 0) {
      setNewBadge(badges.find(b => b.id === newBadges[0]));
      return [...data.earnedBadges, ...newBadges];
    }
    return data.earnedBadges;
  };

  const speak = async (text) => {
    setSpeaking(true);
    await ttsService.speak(text, () => setSpeaking(true), () => setSpeaking(false), () => setSpeaking(false));
  };

  const startTest = () => {
    const words = selectSmartWords(gameData, 5);
    setTestWords(words);
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
    setResults(prev => [...prev, { word: word.word, wordId: word.id, attempt: input, correct, coins: earned, category: word.category }]);
    setShowResult({ correct, word: word.word });
    if (earned > 0) {
      setCoinAnim(earned);
      setTimeout(() => setCoinAnim(null), 1600);
    }
  };

  const finishTest = () => {
    const allResults = [...results];
    const correctCount = allResults.filter(r => r.correct).length;
    const pct = (correctCount / testWords.length) * 100;
    let bonus = 5;
    if (pct === 100) bonus = 50;
    else if (pct >= 80) bonus = 25;
    else if (pct >= 60) bonus = 10;

    const totalEarned = allResults.reduce((a, r) => a + r.coins, 0) + bonus;
    const today = new Date().toDateString();
    const last = gameData.lastTestDate;

    let newStreak = 1;
    if (last) {
      const lastDate = new Date(last);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastDate.toDateString() === today) newStreak = gameData.streak;
      else if (lastDate.toDateString() === yesterday.toDateString()) newStreak = gameData.streak + 1;
    }

    // Update word stats
    const newWordStats = { ...gameData.wordStats };
    allResults.forEach(r => {
      const prev = newWordStats[r.wordId] || { attempts: 0, correct: 0 };
      newWordStats[r.wordId] = {
        attempts: prev.attempts + 1,
        correct: prev.correct + (r.correct ? 1 : 0),
        lastAttempt: today
      };
    });

    const newData = {
      ...gameData,
      coins: gameData.coins + totalEarned,
      totalCoinsEarned: gameData.totalCoinsEarned + totalEarned,
      streak: newStreak,
      bestStreak: Math.max(gameData.bestStreak, newStreak),
      lastTestDate: today,
      testHistory: [...gameData.testHistory, { date: today, score: correctCount, total: testWords.length, words: allResults.map(r => ({ word: r.word, wordId: r.wordId, correct: r.correct, category: r.category })) }],
      wordStats: newWordStats
    };

    newData.earnedBadges = checkBadges(newData);
    setGameData(newData);
    setScreen('results');
  };

  const nextWord = () => {
    if (currentIndex < testWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setInput('');
      setShowResult(null);
    } else {
      finishTest();
    }
  };

  const claimReward = (reward) => {
    if (coins >= reward.cost && !claimedRewards.includes(reward.id)) {
      setGameData(prev => ({ ...prev, coins: prev.coins - reward.cost, claimedRewards: [...prev.claimedRewards, reward.id] }));
    }
  };

  // Calculate stats
  const getStats = () => {
    if (testHistory.length === 0) return { testsDone: 0, avgScore: 0, weeklyCoins: 0 };
    const totalCorrect = testHistory.reduce((a, t) => a + t.score, 0);
    const totalQ = testHistory.reduce((a, t) => a + t.total, 0);
    const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);
    const recentTests = testHistory.filter(t => new Date(t.date) >= weekAgo);
    const weeklyCoins = recentTests.reduce((a, t) => {
      const wc = t.words.filter(w => w.correct).length * 2;
      const pct = (t.score / t.total) * 100;
      return a + wc + (pct === 100 ? 50 : pct >= 80 ? 25 : pct >= 60 ? 10 : 5);
    }, 0);
    return { testsDone: testHistory.length, avgScore: Math.round((totalCorrect / totalQ) * 100), weeklyCoins };
  };

  // Category analysis
  const getCategoryStats = () => {
    const catData = {};
    testHistory.forEach(test => {
      test.words?.forEach(w => {
        if (!catData[w.category]) catData[w.category] = { correct: 0, total: 0 };
        catData[w.category].total++;
        if (w.correct) catData[w.category].correct++;
      });
    });
    return Object.entries(catData).map(([cat, data]) => ({
      category: cat,
      name: categoryNames[cat] || cat,
      pct: Math.round((data.correct / data.total) * 100),
      total: data.total
    })).sort((a, b) => a.pct - b.pct);
  };

  // Get recommendation
  const getRecommendation = () => {
    const cats = getCategoryStats();
    if (cats.length === 0) return { text: "Start your first test to see recommendations!", type: 'info' };
    const weakest = cats[0];
    if (weakest.pct < 50) return { text: `Focus on ${weakest.name} - only ${weakest.pct}% correct`, type: 'warning' };
    if (weakest.pct < 70) return { text: `${weakest.name} needs more practice (${weakest.pct}%)`, type: 'tip' };
    return { text: "Great work! Keep practicing to stay sharp!", type: 'success' };
  };

  const stats = getStats();
  const categoryStats = getCategoryStats();
  const recommendation = getRecommendation();
  const currentWord = testWords[currentIndex];

  // ============ SCREENS ============

  if (screen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-600 p-4">
        {newBadge && <BadgePopup badge={newBadge} onClose={() => setNewBadge(null)} />}
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
          <p className="text-white/80 text-center mb-4">Let's practice! 📚</p>

          {/* Smart Recommendation */}
          <div className={`rounded-xl p-3 mb-4 ${recommendation.type === 'warning' ? 'bg-yellow-100' : recommendation.type === 'success' ? 'bg-green-100' : 'bg-blue-100'}`}>
            <p className={`text-sm font-semibold text-center ${recommendation.type === 'warning' ? 'text-yellow-700' : recommendation.type === 'success' ? 'text-green-700' : 'text-blue-700'}`}>
              💡 {recommendation.text}
            </p>
          </div>

          <button onClick={startTest} className="w-full bg-white rounded-2xl p-6 mb-4 shadow-lg active:scale-98 flex items-center gap-4">
            <span className="text-4xl">✏️</span>
            <div className="text-left">
              <div className="font-bold text-lg text-gray-800">Start Smart Test</div>
              <div className="text-gray-500 text-sm">5 words picked for you!</div>
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

          <button onClick={() => setScreen('progress')} className="w-full bg-white/90 rounded-2xl p-6 mb-4 shadow-lg active:scale-98 flex items-center gap-4">
            <span className="text-4xl">📊</span>
            <div className="text-left">
              <div className="font-bold text-lg text-gray-800">Progress</div>
              <div className="text-gray-500 text-sm">See how you're doing</div>
            </div>
          </button>

          <button onClick={() => setScreen('settings')} className="w-full bg-white/10 rounded-2xl p-4 shadow active:scale-98 flex items-center justify-center gap-2">
            <span className="text-2xl">⚙️</span>
            <span className="text-white text-sm">Settings (Dad only)</span>
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'settings') {
    return <SettingsScreen ttsService={ttsService} onBack={() => setScreen('home')} onOpenDashboard={() => setScreen('dashboard')} />;
  }

  if (screen === 'dashboard') {
    return <ParentDashboard gameData={gameData} onBack={() => setScreen('settings')} />;
  }

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

  if (screen === 'results') {
    const correctCount = results.filter(r => r.correct).length;
    const pct = results.length > 0 ? (correctCount / results.length) * 100 : 0;
    const totalEarned = results.reduce((a, r) => a + r.coins, 0) + (pct === 100 ? 50 : pct >= 80 ? 25 : pct >= 60 ? 10 : 5);

    return (
      <div className="min-h-screen bg-gradient-to-b from-green-500 to-emerald-600 p-4">
        {newBadge && <BadgePopup badge={newBadge} onClose={() => setNewBadge(null)} />}
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
            <p className="text-3xl text-white">🪙 {totalEarned}</p>
          </div>

          <button onClick={() => setScreen('home')} className="w-full bg-white rounded-xl p-4 font-bold text-green-600 text-lg">Done</button>
        </div>
      </div>
    );
  }

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

          {sampleRewards.map(r => {
            const claimed = claimedRewards.includes(r.id);
            return (
              <div key={r.id} className="bg-white rounded-2xl p-4 mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{r.icon}</span>
                  <div>
                    <div className="font-bold text-gray-800">{r.name}</div>
                    <div className="text-yellow-600 font-semibold">🪙 {r.cost}</div>
                  </div>
                </div>
                {claimed ? (
                  <span className="px-4 py-2 rounded-lg font-bold bg-purple-100 text-purple-600">Claimed ✓</span>
                ) : (
                  <button onClick={() => claimReward(r)} disabled={coins < r.cost} className={`px-4 py-2 rounded-lg font-bold ${coins >= r.cost ? 'bg-green-500 text-white active:scale-95' : 'bg-gray-200 text-gray-400'}`}>
                    {coins >= r.cost ? 'Claim' : 'Locked'}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

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
                <div key={b.id} className={`bg-white rounded-xl p-4 text-center ${!earned && 'opacity-40 grayscale'}`}>
                  <span className="text-3xl">{b.icon}</span>
                  <p className="text-xs font-bold mt-2 text-gray-700">{b.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'progress') {
    const weeklyTarget = 250;
    const weeklyPct = Math.min(100, Math.round((stats.weeklyCoins / weeklyTarget) * 100));

    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-500 to-cyan-600 p-4">
        <div className="max-w-md mx-auto">
          <button onClick={() => setScreen('home')} className="text-white/80 mb-6">← Back</button>
          <h1 className="text-2xl font-bold text-white text-center mb-6">📊 Progress</h1>

          <div className="bg-white rounded-2xl p-6 mb-4">
            <h2 className="font-bold text-gray-800 mb-4">Weekly Target</h2>
            <div className="bg-gray-100 rounded-full h-4 mb-2">
              <div className="bg-teal-500 rounded-full h-4 transition-all" style={{ width: `${weeklyPct}%` }} />
            </div>
            <p className="text-gray-500 text-sm">{stats.weeklyCoins} / {weeklyTarget} coins this week</p>
          </div>

          {categoryStats.length > 0 && (
            <div className="bg-white rounded-2xl p-6 mb-4">
              <h2 className="font-bold text-gray-800 mb-3">Category Accuracy</h2>
              <div className="space-y-2">
                {categoryStats.map((cat, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-gray-600">{cat.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-100 rounded-full h-2">
                        <div className={`h-2 rounded-full ${cat.pct < 50 ? 'bg-red-500' : cat.pct < 75 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${cat.pct}%` }} />
                      </div>
                      <span className={`font-bold text-sm ${cat.pct < 50 ? 'text-red-500' : cat.pct < 75 ? 'text-yellow-500' : 'text-green-500'}`}>{cat.pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl p-6 mb-4">
            <h2 className="font-bold text-gray-800 mb-3">Stats</h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div><p className="text-2xl font-bold text-teal-600">{stats.testsDone}</p><p className="text-gray-500 text-sm">Tests Done</p></div>
              <div><p className="text-2xl font-bold text-teal-600">{stats.avgScore}%</p><p className="text-gray-500 text-sm">Avg Score</p></div>
              <div><p className="text-2xl font-bold text-teal-600">{streak}</p><p className="text-gray-500 text-sm">Day Streak</p></div>
              <div><p className="text-2xl font-bold text-teal-600">{bestStreak}</p><p className="text-gray-500 text-sm">Best Streak</p></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-bold text-gray-800 mb-3">All Time</h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div><p className="text-2xl font-bold text-teal-600">{totalCoinsEarned}</p><p className="text-gray-500 text-sm">Total Coins</p></div>
              <div><p className="text-2xl font-bold text-teal-600">{earnedBadges.length}</p><p className="text-gray-500 text-sm">Badges</p></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// Settings component (separate to avoid useState rules violation)
function SettingsScreen({ ttsService, onBack, onOpenDashboard }) {
  const [apiKey, setApiKey] = useState(ttsService.getApiKey() || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    ttsService.setApiKey(apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 to-gray-900 p-4">
      <div className="max-w-md mx-auto">
        <button onClick={onBack} className="text-white/80 mb-6">← Back</button>
        <h1 className="text-2xl font-bold text-white text-center mb-6">⚙️ Settings</h1>

        <div className="bg-white rounded-2xl p-6 mb-4">
          <h2 className="font-bold text-gray-800 mb-4">📊 Parent Dashboard</h2>
          <button onClick={onOpenDashboard} className="w-full py-3 rounded-lg font-bold text-white bg-purple-600 active:scale-98">
            View Detailed Report
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 mb-4">
          <h2 className="font-bold text-gray-800 mb-2">OpenAI API Key</h2>
          <p className="text-gray-600 text-sm mb-4">For high-quality voice. Get key from platform.openai.com</p>
          <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="sk-..." className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none mb-3 font-mono text-sm" />
          <button onClick={handleSave} className={`w-full py-3 rounded-lg font-bold text-white ${saved ? 'bg-green-500' : 'bg-blue-500'} active:scale-98`}>
            {saved ? '✓ Saved!' : 'Save API Key'}
          </button>
          {ttsService.hasApiKey() && <div className="mt-3 p-3 bg-green-50 rounded-lg"><p className="text-green-700 text-sm font-semibold">✓ OpenAI TTS Active</p></div>}
        </div>

        <div className="bg-white rounded-2xl p-6">
          <h2 className="font-bold text-gray-800 mb-2">Audio Cache</h2>
          <button onClick={() => { ttsService.clearCache(); alert('Cache cleared!'); }} className="w-full py-3 rounded-lg font-bold text-red-600 bg-red-50 active:scale-98">Clear Audio Cache</button>
        </div>
      </div>
    </div>
  );
}

// Parent Dashboard component
function ParentDashboard({ gameData, onBack }) {
  const { testHistory, wordStats, coins, totalCoinsEarned, streak, bestStreak, earnedBadges } = gameData;

  // Calculate problem words (< 50% success rate, min 2 attempts)
  const problemWords = Object.entries(wordStats)
    .map(([wordId, stats]) => {
      const word = allWords.find(w => w.id === parseInt(wordId));
      const successRate = stats.attempts > 0 ? Math.round((stats.correct / stats.attempts) * 100) : 0;
      return { word, stats, successRate };
    })
    .filter(w => w.word && w.stats.attempts >= 2 && w.successRate < 50)
    .sort((a, b) => a.successRate - b.successRate);

  // Words that need practice (< 75% success rate)
  const needsPractice = Object.entries(wordStats)
    .map(([wordId, stats]) => {
      const word = allWords.find(w => w.id === parseInt(wordId));
      const successRate = stats.attempts > 0 ? Math.round((stats.correct / stats.attempts) * 100) : 0;
      return { word, stats, successRate };
    })
    .filter(w => w.word && w.stats.attempts >= 2 && w.successRate >= 50 && w.successRate < 75)
    .sort((a, b) => a.successRate - b.successRate);

  // Weekly stats
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const recentTests = testHistory.filter(t => new Date(t.date) >= weekAgo);
  const weeklyTests = recentTests.length;
  const weeklyCorrect = recentTests.reduce((sum, t) => sum + t.score, 0);
  const weeklyTotal = recentTests.reduce((sum, t) => sum + t.total, 0);
  const weeklyAccuracy = weeklyTotal > 0 ? Math.round((weeklyCorrect / weeklyTotal) * 100) : 0;

  // Category performance
  const catData = {};
  testHistory.forEach(test => {
    test.words?.forEach(w => {
      if (!catData[w.category]) catData[w.category] = { correct: 0, total: 0 };
      catData[w.category].total++;
      if (w.correct) catData[w.category].correct++;
    });
  });
  const categoryStats = Object.entries(catData).map(([cat, data]) => ({
    category: cat,
    name: categoryNames[cat] || cat,
    pct: Math.round((data.correct / data.total) * 100),
    correct: data.correct,
    total: data.total
  })).sort((a, b) => a.pct - b.pct);

  // Export data as CSV
  const exportData = () => {
    let csv = 'Test Date,Score,Total,Accuracy\n';
    testHistory.forEach(t => {
      csv += `${t.date},${t.score},${t.total},${Math.round((t.score/t.total)*100)}%\n`;
    });
    csv += '\n\nWord,Category,Attempts,Correct,Success Rate\n';
    Object.entries(wordStats).forEach(([wordId, stats]) => {
      const word = allWords.find(w => w.id === parseInt(wordId));
      if (word) {
        const rate = Math.round((stats.correct / stats.attempts) * 100);
        csv += `${word.word},${word.category},${stats.attempts},${stats.correct},${rate}%\n`;
      }
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alba-spelling-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-700 p-4">
      <div className="max-w-2xl mx-auto">
        <button onClick={onBack} className="text-white/80 mb-4">← Back</button>
        <h1 className="text-3xl font-bold text-white text-center mb-6">📊 Parent Dashboard</h1>

        {/* Weekly Summary */}
        <div className="bg-white rounded-2xl p-6 mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📅 This Week</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-purple-600">{weeklyTests}</p>
              <p className="text-gray-600 text-sm">Tests Taken</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">{weeklyAccuracy}%</p>
              <p className="text-gray-600 text-sm">Accuracy</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">{recentTests.reduce((sum, t) => {
                const pct = (t.score / t.total) * 100;
                return sum + t.words.filter(w => w.correct).length * 2 + (pct === 100 ? 50 : pct >= 80 ? 25 : pct >= 60 ? 10 : 5);
              }, 0)}</p>
              <p className="text-gray-600 text-sm">Coins Earned</p>
            </div>
          </div>
        </div>

        {/* Problem Words */}
        {problemWords.length > 0 && (
          <div className="bg-white rounded-2xl p-6 mb-4">
            <h2 className="text-xl font-bold text-red-600 mb-4">🚨 Problem Words ({"<"}50%)</h2>
            <div className="space-y-2">
              {problemWords.slice(0, 10).map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-bold text-gray-800">{item.word.word}</p>
                    <p className="text-xs text-gray-500">{item.stats.attempts} attempts • {item.stats.correct} correct</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">{item.successRate}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Needs Practice */}
        {needsPractice.length > 0 && (
          <div className="bg-white rounded-2xl p-6 mb-4">
            <h2 className="text-xl font-bold text-yellow-600 mb-4">⚠️ Needs Practice (50-75%)</h2>
            <div className="space-y-2">
              {needsPractice.slice(0, 10).map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-bold text-gray-800">{item.word.word}</p>
                    <p className="text-xs text-gray-500">{item.stats.attempts} attempts • {item.stats.correct} correct</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-yellow-600">{item.successRate}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Performance */}
        {categoryStats.length > 0 && (
          <div className="bg-white rounded-2xl p-6 mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">📚 Category Performance</h2>
            <div className="space-y-3">
              {categoryStats.map((cat, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-gray-700">{cat.name}</span>
                    <span className={`font-bold ${cat.pct < 50 ? 'text-red-600' : cat.pct < 75 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {cat.pct}% ({cat.correct}/{cat.total})
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${cat.pct < 50 ? 'bg-red-500' : cat.pct < 75 ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${cat.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Overall Stats */}
        <div className="bg-white rounded-2xl p-6 mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📈 All Time Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">{testHistory.length}</p>
              <p className="text-gray-600 text-sm">Total Tests</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">{Object.keys(wordStats).length}</p>
              <p className="text-gray-600 text-sm">Words Attempted</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">{bestStreak}</p>
              <p className="text-gray-600 text-sm">Best Streak</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">{totalCoinsEarned}</p>
              <p className="text-gray-600 text-sm">Total Coins</p>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={exportData}
          className="w-full py-4 rounded-lg font-bold text-white bg-green-600 active:scale-98 mb-4"
        >
          📥 Export Data (CSV)
        </button>
      </div>
    </div>
  );
}
