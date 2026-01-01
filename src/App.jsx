import React, { useState, useEffect } from 'react';
import ttsService from './services/tts';
import { mathsQuestions, mathsCategories } from './data/mathsQuestions';

// ============ MASSIVE WORD LIST (160+ words) ============
const allWords = [
  // ===== TRICKY WORDS (20) =====
  { id: 1, word: 'because', sentence: 'I stayed home due to the rain.', category: 'tricky', difficulty: 'medium' },
  { id: 2, word: 'said', sentence: 'She told me earlier.', category: 'tricky', difficulty: 'easy' },
  { id: 3, word: 'could', sentence: 'Maybe I can help.', category: 'tricky', difficulty: 'easy' },
  { id: 4, word: 'would', sentence: 'I wish you had come.', category: 'tricky', difficulty: 'easy' },
  { id: 5, word: 'should', sentence: 'You ought to try it.', category: 'tricky', difficulty: 'easy' },
  { id: 6, word: 'people', sentence: 'Many humans were there.', category: 'tricky', difficulty: 'medium' },
  { id: 7, word: 'answer', sentence: 'Can you reply to this?', category: 'tricky', difficulty: 'medium' },
  { id: 8, word: 'busy', sentence: 'I have lots to do.', category: 'tricky', difficulty: 'easy' },
  { id: 9, word: 'beautiful', sentence: 'The view was lovely.', category: 'tricky', difficulty: 'hard' },
  { id: 10, word: 'again', sentence: 'Do it once more.', category: 'tricky', difficulty: 'easy' },
  { id: 11, word: 'enough', sentence: 'I have plenty now.', category: 'tricky', difficulty: 'medium' },
  { id: 12, word: 'through', sentence: 'Walk from one side to the other.', category: 'tricky', difficulty: 'hard' },
  { id: 13, word: 'thought', sentence: 'I had an idea.', category: 'tricky', difficulty: 'medium' },
  { id: 14, word: 'brought', sentence: 'I carried it here.', category: 'tricky', difficulty: 'medium' },
  { id: 15, word: 'caught', sentence: 'I grabbed the ball.', category: 'tricky', difficulty: 'medium' },
  { id: 16, word: 'taught', sentence: 'Someone showed me how.', category: 'tricky', difficulty: 'medium' },
  { id: 17, word: 'although', sentence: 'Even so, I tried.', category: 'tricky', difficulty: 'hard' },
  { id: 18, word: 'favourite', sentence: 'This is the one I like best.', category: 'tricky', difficulty: 'medium' },
  { id: 19, word: 'surprise', sentence: 'I did not expect that!', category: 'tricky', difficulty: 'medium' },
  { id: 20, word: 'library', sentence: 'A place full of books.', category: 'tricky', difficulty: 'medium' },

  // ===== I BEFORE E (15) =====
  { id: 21, word: 'friend', sentence: "She is my best pal.", category: 'i-before-e', difficulty: 'easy' },
  { id: 22, word: 'believe', sentence: 'I think it will work out.', category: 'i-before-e', difficulty: 'medium' },
  { id: 23, word: 'receive', sentence: 'Did you get my message?', category: 'i-before-e', difficulty: 'hard' },
  { id: 24, word: 'piece', sentence: 'Can I have a slice?', category: 'i-before-e', difficulty: 'medium' },
  { id: 25, word: 'achieve', sentence: 'You can reach your goals.', category: 'i-before-e', difficulty: 'hard' },
  { id: 26, word: 'weird', sentence: 'That was very strange.', category: 'i-before-e', difficulty: 'medium' },
  { id: 27, word: 'neighbour', sentence: 'The person next door.', category: 'i-before-e', difficulty: 'hard' },
  { id: 28, word: 'either', sentence: 'Pick one or the other.', category: 'i-before-e', difficulty: 'medium' },
  { id: 29, word: 'ceiling', sentence: 'Look up at the top.', category: 'i-before-e', difficulty: 'medium' },
  { id: 30, word: 'field', sentence: 'The cows were in the grass.', category: 'i-before-e', difficulty: 'easy' },
  { id: 31, word: 'shield', sentence: 'The knight held it for protection.', category: 'i-before-e', difficulty: 'medium' },
  { id: 32, word: 'thief', sentence: 'Someone who steals things.', category: 'i-before-e', difficulty: 'medium' },
  { id: 33, word: 'chief', sentence: 'The leader of the group.', category: 'i-before-e', difficulty: 'medium' },
  { id: 34, word: 'relief', sentence: 'I felt so much better.', category: 'i-before-e', difficulty: 'medium' },
  { id: 35, word: 'niece', sentence: 'My sister has a daughter.', category: 'i-before-e', difficulty: 'medium' },

  // ===== SOFT C (15) =====
  { id: 36, word: 'decide', sentence: 'I cannot choose what to wear.', category: 'soft-c', difficulty: 'medium' },
  { id: 37, word: 'certain', sentence: 'I am absolutely sure about it.', category: 'soft-c', difficulty: 'hard' },
  { id: 38, word: 'accident', sentence: 'The crash happened this morning.', category: 'soft-c', difficulty: 'hard' },
  { id: 39, word: 'circle', sentence: 'Draw a round shape.', category: 'soft-c', difficulty: 'medium' },
  { id: 40, word: 'celebrate', sentence: 'Let us have a party!', category: 'soft-c', difficulty: 'hard' },
  { id: 41, word: 'necessary', sentence: 'You need to do this.', category: 'soft-c', difficulty: 'hard' },
  { id: 42, word: 'notice', sentence: 'Did you spot it?', category: 'soft-c', difficulty: 'medium' },
  { id: 43, word: 'special', sentence: 'This is really important.', category: 'soft-c', difficulty: 'medium' },
  { id: 44, word: 'medicine', sentence: 'Take this to feel better.', category: 'soft-c', difficulty: 'hard' },
  { id: 45, word: 'exercise', sentence: 'Running keeps you fit.', category: 'soft-c', difficulty: 'hard' },
  { id: 46, word: 'science', sentence: 'We learn about nature.', category: 'soft-c', difficulty: 'medium' },
  { id: 47, word: 'experience', sentence: 'I have done this before.', category: 'soft-c', difficulty: 'hard' },
  { id: 48, word: 'difference', sentence: 'Can you spot what changed?', category: 'soft-c', difficulty: 'hard' },
  { id: 49, word: 'sentence', sentence: 'A group of words together.', category: 'soft-c', difficulty: 'medium' },
  { id: 50, word: 'peace', sentence: 'Calm and quiet everywhere.', category: 'soft-c', difficulty: 'medium' },

  // ===== DOUBLE LETTERS (18) =====
  { id: 51, word: 'different', sentence: 'This one is not the same.', category: 'double-letters', difficulty: 'medium' },
  { id: 52, word: 'beginning', sentence: 'This is just the start.', category: 'double-letters', difficulty: 'hard' },
  { id: 53, word: 'running', sentence: 'She was moving fast.', category: 'double-letters', difficulty: 'easy' },
  { id: 54, word: 'swimming', sentence: 'I love the pool.', category: 'double-letters', difficulty: 'medium' },
  { id: 55, word: 'happened', sentence: 'It occurred yesterday.', category: 'double-letters', difficulty: 'medium' },
  { id: 56, word: 'embarrass', sentence: 'Do not make me feel awkward.', category: 'double-letters', difficulty: 'hard' },
  { id: 57, word: 'committee', sentence: 'The group made a choice.', category: 'double-letters', difficulty: 'hard' },
  { id: 58, word: 'address', sentence: 'Where do you live?', category: 'double-letters', difficulty: 'medium' },
  { id: 59, word: 'immediately', sentence: 'Do it right now.', category: 'double-letters', difficulty: 'hard' },
  { id: 60, word: 'occasion', sentence: 'A special event or time.', category: 'double-letters', difficulty: 'hard' },
  { id: 61, word: 'success', sentence: 'You did really well!', category: 'double-letters', difficulty: 'medium' },
  { id: 62, word: 'possible', sentence: 'It might happen.', category: 'double-letters', difficulty: 'medium' },
  { id: 63, word: 'tomorrow', sentence: 'The day after today.', category: 'double-letters', difficulty: 'medium' },
  { id: 64, word: 'follow', sentence: 'Come along behind me.', category: 'double-letters', difficulty: 'easy' },
  { id: 65, word: 'recommend', sentence: 'I suggest you try this.', category: 'double-letters', difficulty: 'hard' },
  { id: 66, word: 'connect', sentence: 'Join these two together.', category: 'double-letters', difficulty: 'medium' },
  { id: 67, word: 'appear', sentence: 'Suddenly it showed up.', category: 'double-letters', difficulty: 'medium' },
  { id: 68, word: 'sudden', sentence: 'It was very quick.', category: 'double-letters', difficulty: 'easy' },

  // ===== SILENT LETTERS (18) =====
  { id: 69, word: 'knight', sentence: 'The warrior rode a horse.', category: 'silent-letters', difficulty: 'medium' },
  { id: 70, word: 'knife', sentence: 'Cut it with the blade.', category: 'silent-letters', difficulty: 'easy' },
  { id: 71, word: 'write', sentence: 'Put pen to paper.', category: 'silent-letters', difficulty: 'easy' },
  { id: 72, word: 'island', sentence: 'The land surrounded by water.', category: 'silent-letters', difficulty: 'medium' },
  { id: 73, word: 'castle', sentence: 'The king lived there.', category: 'silent-letters', difficulty: 'medium' },
  { id: 74, word: 'rhythm', sentence: 'The beat of the music.', category: 'silent-letters', difficulty: 'hard' },
  { id: 75, word: 'scissors', sentence: 'Use them to cut paper.', category: 'silent-letters', difficulty: 'medium' },
  { id: 76, word: 'climb', sentence: 'Go up the ladder.', category: 'silent-letters', difficulty: 'easy' },
  { id: 77, word: 'doubt', sentence: 'I am not sure.', category: 'silent-letters', difficulty: 'medium' },
  { id: 78, word: 'listen', sentence: 'Pay attention to this.', category: 'silent-letters', difficulty: 'easy' },
  { id: 79, word: 'honest', sentence: 'Always tell the truth.', category: 'silent-letters', difficulty: 'medium' },
  { id: 80, word: 'hour', sentence: 'Sixty minutes long.', category: 'silent-letters', difficulty: 'easy' },
  { id: 81, word: 'know', sentence: 'I understand this.', category: 'silent-letters', difficulty: 'easy' },
  { id: 82, word: 'knock', sentence: 'Tap on the door.', category: 'silent-letters', difficulty: 'easy' },
  { id: 83, word: 'wrong', sentence: 'That is not correct.', category: 'silent-letters', difficulty: 'easy' },
  { id: 84, word: 'wreck', sentence: 'The ship was destroyed.', category: 'silent-letters', difficulty: 'medium' },
  { id: 85, word: 'thumb', sentence: 'The short finger.', category: 'silent-letters', difficulty: 'easy' },
  { id: 86, word: 'comb', sentence: 'Use it on your hair.', category: 'silent-letters', difficulty: 'easy' },

  // ===== ENDINGS -TION/-SION/-OUS (15) =====
  { id: 87, word: 'station', sentence: 'Wait at the platform.', category: 'endings', difficulty: 'medium' },
  { id: 88, word: 'mention', sentence: 'Did you talk about it?', category: 'endings', difficulty: 'medium' },
  { id: 89, word: 'question', sentence: 'Can I ask something?', category: 'endings', difficulty: 'medium' },
  { id: 90, word: 'direction', sentence: 'Which way should I go?', category: 'endings', difficulty: 'hard' },
  { id: 91, word: 'decision', sentence: 'What did you pick?', category: 'endings', difficulty: 'hard' },
  { id: 92, word: 'famous', sentence: 'Everyone knows them.', category: 'endings', difficulty: 'medium' },
  { id: 93, word: 'dangerous', sentence: 'This is not safe.', category: 'endings', difficulty: 'hard' },
  { id: 94, word: 'serious', sentence: 'This is very important.', category: 'endings', difficulty: 'hard' },
  { id: 95, word: 'information', sentence: 'Facts and details.', category: 'endings', difficulty: 'hard' },
  { id: 96, word: 'education', sentence: 'Learning at school.', category: 'endings', difficulty: 'hard' },
  { id: 97, word: 'television', sentence: 'Watch shows on the screen.', category: 'endings', difficulty: 'hard' },
  { id: 98, word: 'nervous', sentence: 'Feeling a bit scared.', category: 'endings', difficulty: 'medium' },
  { id: 99, word: 'generous', sentence: 'Kind and giving.', category: 'endings', difficulty: 'hard' },
  { id: 100, word: 'curious', sentence: 'Wanting to know more.', category: 'endings', difficulty: 'medium' },
  { id: 101, word: 'jealous', sentence: 'Wanting what others have.', category: 'endings', difficulty: 'hard' },

  // ===== HOMOPHONES (18) =====
  { id: 102, word: 'their', sentence: 'It belongs to them.', category: 'homophones', difficulty: 'medium' },
  { id: 103, word: 'there', sentence: 'Look over in that place.', category: 'homophones', difficulty: 'medium' },
  { id: 104, word: 'hear', sentence: 'Use your ears to listen.', category: 'homophones', difficulty: 'easy' },
  { id: 105, word: 'here', sentence: 'Come to this spot.', category: 'homophones', difficulty: 'easy' },
  { id: 106, word: 'where', sentence: 'In what place?', category: 'homophones', difficulty: 'easy' },
  { id: 107, word: 'wear', sentence: 'Put on your clothes.', category: 'homophones', difficulty: 'easy' },
  { id: 108, word: 'weather', sentence: 'Is it sunny or rainy?', category: 'homophones', difficulty: 'medium' },
  { id: 109, word: 'whether', sentence: 'I wonder if it will happen.', category: 'homophones', difficulty: 'medium' },
  { id: 110, word: 'your', sentence: 'This belongs to you.', category: 'homophones', difficulty: 'easy' },
  { id: 111, word: 'to', sentence: 'Go over to the shop.', category: 'homophones', difficulty: 'easy' },
  { id: 112, word: 'too', sentence: 'I want one as well.', category: 'homophones', difficulty: 'easy' },
  { id: 113, word: 'two', sentence: 'The number after one.', category: 'homophones', difficulty: 'easy' },
  { id: 114, word: 'which', sentence: 'Pick one of these.', category: 'homophones', difficulty: 'medium' },
  { id: 115, word: 'witch', sentence: 'She has a black cat.', category: 'homophones', difficulty: 'medium' },
  { id: 116, word: 'week', sentence: 'Seven days long.', category: 'homophones', difficulty: 'easy' },
  { id: 117, word: 'weak', sentence: 'Not very strong.', category: 'homophones', difficulty: 'easy' },
  { id: 118, word: 'right', sentence: 'The correct answer.', category: 'homophones', difficulty: 'easy' },
  { id: 119, word: 'write', sentence: 'Use a pen for this.', category: 'homophones', difficulty: 'easy' },

  // ===== HARD SPELLINGS (15) =====
  { id: 120, word: 'definitely', sentence: 'I am totally sure.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 121, word: 'separate', sentence: 'Keep them apart.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 122, word: 'government', sentence: 'The leaders of our country.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 123, word: 'queue', sentence: 'Wait in the line.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 124, word: 'conscience', sentence: 'Knowing right from wrong.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 125, word: 'mischievous', sentence: 'Being a bit naughty.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 126, word: 'restaurant', sentence: 'A place to eat meals.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 127, word: 'Wednesday', sentence: 'The middle of the week.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 128, word: 'February', sentence: 'The shortest month.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 129, word: 'knowledge', sentence: 'What you learn and know.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 130, word: 'vegetable', sentence: 'Carrots and peas are these.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 131, word: 'chocolate', sentence: 'A sweet brown treat.', category: 'hard-spellings', difficulty: 'medium' },
  { id: 132, word: 'actually', sentence: 'In fact, this is true.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 133, word: 'basically', sentence: 'Simply put, this is it.', category: 'hard-spellings', difficulty: 'hard' },
  { id: 134, word: 'probably', sentence: 'Most likely this will happen.', category: 'hard-spellings', difficulty: 'hard' },

  // ===== PREFIXES (15) =====
  { id: 135, word: 'unhappy', sentence: 'Feeling a bit sad.', category: 'prefixes', difficulty: 'easy' },
  { id: 136, word: 'unusual', sentence: 'Not like the others.', category: 'prefixes', difficulty: 'medium' },
  { id: 137, word: 'unknown', sentence: 'Nobody knows about it.', category: 'prefixes', difficulty: 'medium' },
  { id: 138, word: 'untidy', sentence: 'A bit of a mess.', category: 'prefixes', difficulty: 'easy' },
  { id: 139, word: 'return', sentence: 'Come back again.', category: 'prefixes', difficulty: 'easy' },
  { id: 140, word: 'rewrite', sentence: 'Do it again on paper.', category: 'prefixes', difficulty: 'medium' },
  { id: 141, word: 'remember', sentence: 'Keep it in your mind.', category: 'prefixes', difficulty: 'medium' },
  { id: 142, word: 'replace', sentence: 'Put a new one instead.', category: 'prefixes', difficulty: 'medium' },
  { id: 143, word: 'disappear', sentence: 'It vanished from sight.', category: 'prefixes', difficulty: 'hard' },
  { id: 144, word: 'disagree', sentence: 'I think differently.', category: 'prefixes', difficulty: 'medium' },
  { id: 145, word: 'discover', sentence: 'Find something new.', category: 'prefixes', difficulty: 'medium' },
  { id: 146, word: 'impossible', sentence: 'It cannot be done.', category: 'prefixes', difficulty: 'hard' },
  { id: 147, word: 'invisible', sentence: 'You cannot see it.', category: 'prefixes', difficulty: 'hard' },
  { id: 148, word: 'incorrect', sentence: 'That is wrong.', category: 'prefixes', difficulty: 'medium' },
  { id: 149, word: 'uncomfortable', sentence: 'Not feeling relaxed.', category: 'prefixes', difficulty: 'hard' },

  // ===== COMPOUND WORDS (12) =====
  { id: 150, word: 'something', sentence: 'There is a thing here.', category: 'compound', difficulty: 'easy' },
  { id: 151, word: 'everyone', sentence: 'All the people.', category: 'compound', difficulty: 'easy' },
  { id: 152, word: 'sometimes', sentence: 'Now and then.', category: 'compound', difficulty: 'easy' },
  { id: 153, word: 'everything', sentence: 'All of the things.', category: 'compound', difficulty: 'easy' },
  { id: 154, word: 'somewhere', sentence: 'In some place.', category: 'compound', difficulty: 'medium' },
  { id: 155, word: 'meanwhile', sentence: 'At the same time.', category: 'compound', difficulty: 'medium' },
  { id: 156, word: 'anywhere', sentence: 'In any place at all.', category: 'compound', difficulty: 'medium' },
  { id: 157, word: 'nothing', sentence: 'Not anything at all.', category: 'compound', difficulty: 'easy' },
  { id: 158, word: 'playground', sentence: 'Where children play.', category: 'compound', difficulty: 'easy' },
  { id: 159, word: 'birthday', sentence: 'The day you were born.', category: 'compound', difficulty: 'easy' },
  { id: 160, word: 'homework', sentence: 'School work at home.', category: 'compound', difficulty: 'easy' },
  { id: 161, word: 'breakfast', sentence: 'The first meal.', category: 'compound', difficulty: 'medium' },
];

const sampleRewards = [
  // ========== TINY TREATS (50-100 coins) - Daily wins ==========
  { id: 1, name: 'Gold Star Sticker', cost: 50, icon: '⭐' },
  { id: 2, name: 'High Five from Dad', cost: 50, icon: '🖐️' },
  { id: 3, name: 'Victory Dance', cost: 75, icon: '💃' },
  { id: 4, name: 'Silly Photo Together', cost: 75, icon: '🤳' },
  { id: 5, name: 'Pick Background Music', cost: 100, icon: '🎵' },
  { id: 6, name: 'Stay Up 10 Mins Late', cost: 100, icon: '🌙' },

  // ========== QUICK WINS (125-300 coins) - Few days ==========
  { id: 7, name: 'Stay Up 15 Mins Late', cost: 125, icon: '🌛' },
  { id: 8, name: 'Pick a Snack', cost: 150, icon: '🍿' },
  { id: 9, name: 'Extra TV Episode', cost: 175, icon: '📺' },
  { id: 10, name: 'No Chores Pass', cost: 200, icon: '🎫' },
  { id: 11, name: 'Cookie Treat', cost: 200, icon: '🍪' },
  { id: 12, name: 'Extra Dessert', cost: 225, icon: '🧁' },
  { id: 13, name: 'Pick Car Music', cost: 250, icon: '🚗' },
  { id: 14, name: 'Lie In (30 mins)', cost: 275, icon: '😴' },
  { id: 15, name: 'Stay Up 30 Mins Late', cost: 300, icon: '🌜' },

  // ========== TREATS (350-700 coins) - Weekly goals ==========
  { id: 16, name: 'Boba Tea', cost: 350, icon: '🧋' },
  { id: 17, name: 'Pick Movie Night', cost: 400, icon: '🎬' },
  { id: 18, name: 'Smoothie Trip', cost: 425, icon: '🥤' },
  { id: 19, name: '30 Mins Screen Time', cost: 450, icon: '📱' },
  { id: 20, name: 'Hot Chocolate Trip', cost: 475, icon: '☕' },
  { id: 21, name: 'Sweet Shop Visit', cost: 500, icon: '🍬' },
  { id: 22, name: 'Ice Cream Trip', cost: 525, icon: '🍦' },
  { id: 23, name: 'Milkshake Trip', cost: 550, icon: '🥛' },
  { id: 24, name: 'Donut Run', cost: 575, icon: '🍩' },
  { id: 25, name: 'Breakfast in Bed', cost: 600, icon: '🥞' },
  { id: 26, name: 'Pancake Morning', cost: 625, icon: '🥞' },
  { id: 27, name: 'Waffle Treat', cost: 650, icon: '🧇' },
  { id: 28, name: 'Pick Dinner', cost: 700, icon: '🍕' },

  // ========== ACTIVITIES (750-1200 coins) - Bi-weekly goals ==========
  { id: 29, name: 'Games Night (Your Rules)', cost: 750, icon: '🎮' },
  { id: 30, name: 'Park Picnic', cost: 800, icon: '🧺' },
  { id: 31, name: '1 Hour Screen Time', cost: 850, icon: '💻' },
  { id: 32, name: 'Bubble Bath with Extras', cost: 900, icon: '🛁' },
  { id: 33, name: 'Nail Painting Session', cost: 950, icon: '💅' },
  { id: 34, name: 'Dance Party', cost: 1000, icon: '🪩' },
  { id: 35, name: 'Puzzle Together', cost: 1050, icon: '🧩' },
  { id: 36, name: 'Build Something Together', cost: 1100, icon: '🔧' },
  { id: 37, name: 'Art Session', cost: 1150, icon: '🎨' },
  { id: 38, name: 'New Book', cost: 1200, icon: '📚' },

  // ========== BIG REWARDS (1300-2000 coins) - Monthly goals ==========
  { id: 39, name: 'Cinema Trip', cost: 1300, icon: '🎥' },
  { id: 40, name: 'Bowling Trip', cost: 1400, icon: '🎳' },
  { id: 41, name: 'Baking Day Together', cost: 1500, icon: '🍰' },
  { id: 42, name: 'Craft Supplies Haul', cost: 1550, icon: '✂️' },
  { id: 43, name: 'Mini Golf', cost: 1600, icon: '⛳' },
  { id: 44, name: 'Trampoline Park', cost: 1700, icon: '🤸' },
  { id: 45, name: 'Friend Playdate', cost: 1800, icon: '👯' },
  { id: 46, name: 'Swimming Trip', cost: 1850, icon: '🏊' },
  { id: 47, name: 'Takeaway Night', cost: 1900, icon: '🥡' },
  { id: 48, name: 'Skip a Homework', cost: 2000, icon: '📝' },

  // ========== ADVENTURES (2200-3500 coins) - Term goals ==========
  { id: 49, name: 'Day Out (Local)', cost: 2200, icon: '🎡' },
  { id: 50, name: 'Escape Room', cost: 2400, icon: '🔐' },
  { id: 51, name: 'Pottery Painting', cost: 2500, icon: '🏺' },
  { id: 52, name: 'Soft Play (Big Kid Zone)', cost: 2600, icon: '🏰' },
  { id: 53, name: 'Laser Tag', cost: 2800, icon: '🔫' },
  { id: 54, name: 'Friend Sleepover', cost: 3000, icon: '🛏️' },
  { id: 55, name: 'Zoo/Aquarium Trip', cost: 3200, icon: '🐧' },
  { id: 56, name: 'Ice Skating', cost: 3400, icon: '⛸️' },

  // ========== EPIC REWARDS (3600-5500 coins) - Half-term goals ==========
  { id: 57, name: 'Shopping Trip', cost: 3600, icon: '🛍️' },
  { id: 58, name: 'Choose a New Game', cost: 3800, icon: '🎲' },
  { id: 59, name: 'Climbing Wall', cost: 4000, icon: '🧗' },
  { id: 60, name: 'Beach Day', cost: 4200, icon: '🏖️' },
  { id: 61, name: 'Theme Park Day', cost: 4500, icon: '🎢' },
  { id: 62, name: 'Water Park', cost: 4800, icon: '🌊' },
  { id: 63, name: 'Special Day Out', cost: 5000, icon: '✨' },
  { id: 64, name: 'Sleepover Party (2 Friends)', cost: 5500, icon: '🎉' },

  // ========== LEGENDARY (6000-10000 coins) - Half-year goals ==========
  { id: 65, name: 'Big Surprise', cost: 6000, icon: '🎁' },
  { id: 66, name: 'Museum/Gallery Trip', cost: 6500, icon: '🏛️' },
  { id: 67, name: 'Adventure Day', cost: 7000, icon: '🗺️' },
  { id: 68, name: 'Theatre Show', cost: 7500, icon: '🎭' },
  { id: 69, name: 'Concert/Show Tickets', cost: 8000, icon: '🎤' },
  { id: 70, name: 'Spa Day', cost: 8500, icon: '🧖' },
  { id: 71, name: 'Castle/Palace Visit', cost: 9000, icon: '🏰' },
  { id: 72, name: 'Forest Adventure', cost: 9500, icon: '🌲' },
  { id: 73, name: 'Ultimate Day Out', cost: 10000, icon: '🌟' },

  // ========== MYTHIC (11000-18000 coins) - Year goals ==========
  { id: 74, name: 'Makeover Day', cost: 11000, icon: '💄' },
  { id: 75, name: 'Redecorate Room', cost: 12000, icon: '🛋️' },
  { id: 76, name: 'Photography Day', cost: 13000, icon: '📸' },
  { id: 77, name: 'Cooking Class', cost: 14000, icon: '👩‍🍳' },
  { id: 78, name: 'New Gadget', cost: 15000, icon: '📱' },
  { id: 79, name: 'Horse Riding Lesson', cost: 16000, icon: '🐴' },
  { id: 80, name: 'Glamping Night', cost: 17000, icon: '⛺' },
  { id: 81, name: 'Weekend Trip', cost: 18000, icon: '🏨' },

  // ========== ULTIMATE (20000-30000 coins) - Champion rewards ==========
  { id: 82, name: 'Birthday Party Upgrade', cost: 20000, icon: '🎂' },
  { id: 83, name: 'Design Your Day', cost: 22000, icon: '📋' },
  { id: 84, name: 'Year Champion Prize', cost: 25000, icon: '🏆' },
  { id: 85, name: 'Ultimate Adventure', cost: 28000, icon: '🚀' },
  { id: 86, name: 'Dream Day', cost: 30000, icon: '👸' },
];

const badges = [
  // ========== GETTING STARTED ==========
  { id: 'first', name: 'First Steps', icon: '👣', desc: 'Complete your first test' },
  { id: 'first5', name: 'Warming Up', icon: '🌡️', desc: 'Complete 5 tests' },
  { id: 'comeback', name: 'Back Again', icon: '🔄', desc: 'Return after a day off' },

  // ========== PERFECT SCORES ==========
  { id: 'perfect', name: 'Perfect Score', icon: '⭐', desc: 'Get 100% on a test' },
  { id: 'perfect3', name: 'Hat Trick', icon: '🎩', desc: '3 perfect scores' },
  { id: 'perfect5', name: 'High Five', icon: '🖐️', desc: '5 perfect scores' },
  { id: 'perfect10', name: 'Perfect Ten', icon: '💯', desc: '10 perfect scores' },
  { id: 'perfect15', name: 'Fifteen Flawless', icon: '🎀', desc: '15 perfect scores' },
  { id: 'perfect25', name: 'Quarter Century', icon: '🎯', desc: '25 perfect scores' },
  { id: 'perfect50', name: 'Half Century', icon: '🏹', desc: '50 perfect scores' },
  { id: 'perfect75', name: 'Three Quarters', icon: '🎪', desc: '75 perfect scores' },
  { id: 'perfect100', name: 'Centurion', icon: '🦅', desc: '100 perfect scores' },
  { id: 'perfect150', name: 'Spelling Sage', icon: '🧙‍♀️', desc: '150 perfect scores' },
  { id: 'perfect200', name: 'Word Wizard', icon: '✨', desc: '200 perfect scores' },

  // ========== STREAKS ==========
  { id: 'streak3', name: 'Streak Starter', icon: '🔥', desc: '3-day streak' },
  { id: 'streak5', name: 'Five Alive', icon: '🖐️', desc: '5-day streak' },
  { id: 'streak7', name: 'Week Warrior', icon: '💪', desc: '1-week streak' },
  { id: 'streak10', name: 'Ten Days Strong', icon: '🔟', desc: '10-day streak' },
  { id: 'streak14', name: 'Fortnight Fighter', icon: '⚔️', desc: '2-week streak' },
  { id: 'streak21', name: 'Triple Week', icon: '🏆', desc: '3-week streak' },
  { id: 'streak28', name: 'Month Master', icon: '👑', desc: '4-week streak' },
  { id: 'streak35', name: 'Five Week Fury', icon: '⚡', desc: '35-day streak' },
  { id: 'streak45', name: 'Six Week Star', icon: '🌟', desc: '45-day streak' },
  { id: 'streak60', name: 'Two Month Hero', icon: '🦸', desc: '60-day streak' },
  { id: 'streak75', name: 'Seventy Five', icon: '💎', desc: '75-day streak' },
  { id: 'streak90', name: 'Quarter Year', icon: '🌙', desc: '90-day streak' },
  { id: 'streak100', name: 'Century Streak', icon: '💯', desc: '100-day streak!' },
  { id: 'streak120', name: 'Four Month Legend', icon: '🔮', desc: '120-day streak' },
  { id: 'streak150', name: 'Five Month Fire', icon: '🌋', desc: '150-day streak' },
  { id: 'streak180', name: 'Half Year Hero', icon: '☀️', desc: '180-day streak' },
  { id: 'streak200', name: 'Two Hundred', icon: '🎊', desc: '200-day streak!' },
  { id: 'streak270', name: 'Nine Month Master', icon: '💫', desc: '270-day streak' },
  { id: 'streak300', name: 'Three Hundred', icon: '🏅', desc: '300-day streak!' },
  { id: 'streak365', name: 'YEAR CHAMPION', icon: '👸', desc: '365-day streak!' },

  // ========== COIN MILESTONES ==========
  { id: 'century', name: 'Century Club', icon: '💰', desc: 'Earn 100 coins' },
  { id: 'coins250', name: 'Coin Starter', icon: '🪙', desc: 'Earn 250 coins' },
  { id: 'coins500', name: 'Coin Collector', icon: '💎', desc: 'Earn 500 coins' },
  { id: 'coins750', name: 'Treasure Seeker', icon: '🗝️', desc: 'Earn 750 coins' },
  { id: 'coins1000', name: 'Treasure Hunter', icon: '🏴‍☠️', desc: 'Earn 1,000 coins' },
  { id: 'coins1500', name: 'Coin Hoarder', icon: '🏺', desc: 'Earn 1,500 coins' },
  { id: 'coins2000', name: 'Gold Digger', icon: '⛏️', desc: 'Earn 2,000 coins' },
  { id: 'coins2500', name: 'Money Bags', icon: '💵', desc: 'Earn 2,500 coins' },
  { id: 'coins3000', name: 'Cash Queen', icon: '👑', desc: 'Earn 3,000 coins' },
  { id: 'coins4000', name: 'Fortune Seeker', icon: '🔮', desc: 'Earn 4,000 coins' },
  { id: 'coins5000', name: 'Gold Rush', icon: '🥇', desc: 'Earn 5,000 coins' },
  { id: 'coins7500', name: 'Wealthy', icon: '💎', desc: 'Earn 7,500 coins' },
  { id: 'coins10000', name: 'Ten Thousand', icon: '🤑', desc: 'Earn 10,000 coins' },
  { id: 'coins12500', name: 'Richie Rich', icon: '🎰', desc: 'Earn 12,500 coins' },
  { id: 'coins15000', name: 'Fortune Finder', icon: '💸', desc: 'Earn 15,000 coins' },
  { id: 'coins17500', name: 'Gold Vault', icon: '🏦', desc: 'Earn 17,500 coins' },
  { id: 'coins20000', name: 'Mega Rich', icon: '💲', desc: 'Earn 20,000 coins' },
  { id: 'coins25000', name: 'Quarter Million', icon: '🌟', desc: 'Earn 25,000 coins!' },
  { id: 'coins30000', name: 'COIN QUEEN', icon: '👸', desc: 'Earn 30,000 coins!' },

  // ========== TEST MILESTONES ==========
  { id: 'tests5', name: 'First Few', icon: '📝', desc: '5 tests' },
  { id: 'tests10', name: 'Getting Started', icon: '📚', desc: '10 tests' },
  { id: 'tests15', name: 'Building Momentum', icon: '🎈', desc: '15 tests' },
  { id: 'tests25', name: 'Committed', icon: '📖', desc: '25 tests' },
  { id: 'tests40', name: 'Keep Going', icon: '🚶', desc: '40 tests' },
  { id: 'tests50', name: 'Dedicated', icon: '🧙', desc: '50 tests' },
  { id: 'tests75', name: 'Seventy Five', icon: '🎯', desc: '75 tests' },
  { id: 'tests100', name: 'Century', icon: '🏅', desc: '100 tests' },
  { id: 'tests125', name: 'Quarter Plus', icon: '📈', desc: '125 tests' },
  { id: 'tests150', name: 'Unstoppable', icon: '🚀', desc: '150 tests' },
  { id: 'tests175', name: 'Nearly There', icon: '🎪', desc: '175 tests' },
  { id: 'tests200', name: 'Super Speller', icon: '⚡', desc: '200 tests' },
  { id: 'tests225', name: 'Word Expert', icon: '📕', desc: '225 tests' },
  { id: 'tests250', name: 'Elite', icon: '🎖️', desc: '250 tests' },
  { id: 'tests275', name: 'Almost Legend', icon: '🌅', desc: '275 tests' },
  { id: 'tests300', name: 'Legendary', icon: '👨‍🎓', desc: '300 tests' },
  { id: 'tests325', name: 'Word Master', icon: '📜', desc: '325 tests' },
  { id: 'tests350', name: 'Nearly Champion', icon: '🎉', desc: '350 tests' },
  { id: 'tests365', name: 'YEAR OF SPELLING', icon: '📅', desc: '365 tests!' },
  { id: 'tests400', name: 'Beyond Legend', icon: '🌌', desc: '400 tests!' },

  // ========== CATEGORY MASTERY (All 10 categories) ==========
  { id: 'master_tricky', name: 'Tricky Master', icon: '🎭', desc: '90% on tricky words' },
  { id: 'master_ibeforee', name: 'I Before E Expert', icon: '👁️', desc: '90% on i-before-e' },
  { id: 'master_softc', name: 'Soft C Specialist', icon: '🐱', desc: '90% on soft-c words' },
  { id: 'master_double', name: 'Double Trouble', icon: '✌️', desc: '90% on double letters' },
  { id: 'master_silent', name: 'Silent Hero', icon: '🤫', desc: '90% on silent letters' },
  { id: 'master_endings', name: 'Ending Expert', icon: '🔚', desc: '90% on word endings' },
  { id: 'master_homophones', name: 'Sound Alike Pro', icon: '👂', desc: '90% on homophones' },
  { id: 'master_hard', name: 'Challenge Champion', icon: '💪', desc: '90% on hard spellings' },
  { id: 'master_prefixes', name: 'Prefix Pro', icon: '🔤', desc: '90% on prefixes' },
  { id: 'master_compound', name: 'Compound King', icon: '🔗', desc: '90% on compound words' },

  // ========== SPECIAL ACHIEVEMENTS ==========
  { id: 'speedster', name: 'Speedster', icon: '⚡', desc: 'Complete test in under 30s' },
  { id: 'patient', name: 'Patient Speller', icon: '🐢', desc: 'Take your time (2+ mins)' },
  { id: 'earlybird', name: 'Early Bird', icon: '🐦', desc: 'Test before 8am' },
  { id: 'nightowl', name: 'Night Owl', icon: '🦉', desc: 'Test after 8pm' },
  { id: 'weekend', name: 'Weekend Warrior', icon: '🎮', desc: 'Test on Saturday & Sunday' },
  { id: 'hotstreak5', name: 'Hot Streak', icon: '🔥', desc: '5 correct in a row (in-test)' },
  { id: 'allcorrect3', name: 'Triple Perfect', icon: '🎯', desc: '3 perfect tests in a row' },
  { id: 'allcorrect5', name: 'Five Star', icon: '⭐', desc: '5 perfect tests in a row' },
  { id: 'firsttry', name: 'First Try Hero', icon: '🏆', desc: 'Get word right you got wrong before' },

  // ========== MILESTONE ACHIEVEMENTS ==========
  { id: 'allrounder', name: 'All-Rounder', icon: '🌈', desc: '75%+ in 5 categories' },
  { id: 'versatile', name: 'Versatile', icon: '🎨', desc: '80%+ in 7 categories' },
  { id: 'mastery', name: 'Category Master', icon: '🏆', desc: '85%+ in all categories' },
  { id: 'perfectionist', name: 'Perfectionist', icon: '💎', desc: '90%+ in all categories' },
  { id: 'ultimate', name: 'ULTIMATE SPELLER', icon: '👸', desc: '95%+ in all categories!' },

  // ========== FUN BADGES ==========
  { id: 'consistent', name: 'Consistent', icon: '📊', desc: 'Same score 3 tests in a row' },
  { id: 'improver', name: 'Improver', icon: '📈', desc: 'Beat your average by 20%' },
  { id: 'determined', name: 'Determined', icon: '💪', desc: 'Keep trying after 3 wrong' },
  { id: 'curious', name: 'Curious', icon: '🔍', desc: 'Try all 10 word categories' },
  { id: 'collector', name: 'Badge Collector', icon: '🎖️', desc: 'Earn 25 badges' },
  { id: 'halfbadges', name: 'Halfway Hero', icon: '🌗', desc: 'Earn 50% of all badges' },
  { id: 'badgemaster', name: 'Badge Master', icon: '🏅', desc: 'Earn 75% of all badges' },
];

const categoryNames = {
  'tricky': 'Tricky Words',
  'i-before-e': 'I Before E',
  'soft-c': 'Soft C Words',
  'double-letters': 'Double Letters',
  'silent-letters': 'Silent Letters',
  'endings': 'Word Endings',
  'homophones': 'Sound-Alike Words',
  'hard-spellings': 'Challenge Words',
  'prefixes': 'Prefixes',
  'compound': 'Compound Words'
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
  currentSubject: 'spelling', // Track which subject is active
  spelling: {
    testHistory: [],
    wordStats: {}, // { wordId: { attempts: 0, correct: 0, lastAttempt: date } }
  },
  maths: {
    testHistory: [],
    questionStats: {}, // { questionId: { attempts: 0, correct: 0, lastAttempt: date } }
  },
  science: {
    testHistory: [],
    questionStats: {}, // { questionId: { attempts: 0, correct: 0, lastAttempt: date } }
  },
});

// Migration function to convert old single-subject data to multi-subject
const migrateToMultiSubject = (oldData) => {
  // Check if already migrated
  if (oldData.spelling || oldData.maths || oldData.science) {
    return oldData;
  }

  // Migrate old data structure
  const migrated = {
    ...getDefaultData(),
    coins: oldData.coins || 0,
    totalCoinsEarned: oldData.totalCoinsEarned || 0,
    streak: oldData.streak || 0,
    bestStreak: oldData.bestStreak || 0,
    lastTestDate: oldData.lastTestDate || null,
    earnedBadges: oldData.earnedBadges || [],
    claimedRewards: oldData.claimedRewards || [],
    currentSubject: 'spelling',
    spelling: {
      testHistory: oldData.testHistory || [],
      wordStats: oldData.wordStats || {},
    },
    maths: {
      testHistory: [],
      questionStats: {},
    },
    science: {
      testHistory: [],
      questionStats: {},
    },
  };

  console.log('✅ Migrated to multi-subject data structure');
  return migrated;
};

const loadData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const migrated = migrateToMultiSubject(parsed);
      return { ...getDefaultData(), ...migrated };
    }
  } catch (e) { console.error('Failed to load:', e); }
  return getDefaultData();
};

// Debounce timer for cloud sync
let syncTimeout = null;

const saveData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

    // Debounced background sync (wait 2 seconds, then sync in background)
    if (syncTimeout) clearTimeout(syncTimeout);
    syncTimeout = setTimeout(() => {
      syncToGist(data);
    }, 2000);
  }
  catch (e) { console.error('Failed to save:', e); }
};

// Sync data to GitHub Gist (non-blocking)
const syncToGist = (data) => {
  const token = localStorage.getItem('github_token');
  if (!token) return;

  const gistId = localStorage.getItem('gist_id');
  const content = JSON.stringify(data, null, 2);

  const url = gistId
    ? `https://api.github.com/gists/${gistId}`
    : 'https://api.github.com/gists';

  const method = gistId ? 'PATCH' : 'POST';

  // Non-blocking background sync
  fetch(url, {
    method,
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description: 'Alba Spelling Test Data - Auto-synced',
      public: false,
      files: {
        'alba-spelling-data.json': {
          content
        }
      }
    })
  })
  .then(async (response) => {
    if (response.ok) {
      const gist = await response.json();
      localStorage.setItem('gist_id', gist.id);
      console.log('✅ Synced to cloud');
    }
  })
  .catch((error) => {
    console.warn('Sync failed:', error);
  });
};

// ============ DYSLEXIA-FRIENDLY HELPERS ============
// Check if two words are visually too similar (confusing for dyslexia)
const areVisuallySimilar = (word1, word2) => {
  // Same length and 80%+ letters match = too similar
  if (Math.abs(word1.length - word2.length) > 2) return false;

  const w1 = word1.toLowerCase();
  const w2 = word2.toLowerCase();
  const maxLen = Math.max(w1.length, w2.length);
  let matches = 0;

  for (let i = 0; i < Math.min(w1.length, w2.length); i++) {
    if (w1[i] === w2[i]) matches++;
  }

  return (matches / maxLen) > 0.75; // 75%+ similar = confusing
};

// ============ SMART WORD SELECTION ============
const selectSmartWords = (gameData, count = 5) => {
  const { wordStats, testHistory } = gameData;

  // Every 3rd test, do a RANDOM selection for variety
  const testCount = testHistory?.length || 0;
  if (testCount > 0 && testCount % 3 === 0) {
    // Pure random selection with category variety (but still avoid visually similar words)
    const shuffled = [...allWords].sort(() => Math.random() - 0.5);
    const selected = [];
    const usedCategories = new Set();
    for (const word of shuffled) {
      if (selected.length >= count) break;
      if (selected.length < 3 && usedCategories.has(word.category)) continue;

      // DYSLEXIA-FRIENDLY: Skip if too similar to already selected words
      const tooSimilar = selected.some(w => areVisuallySimilar(w.word, word.word));
      if (tooSimilar) continue;

      selected.push(word);
      usedCategories.add(word.category);
    }
    while (selected.length < count && shuffled.length > selected.length) {
      const remaining = shuffled.filter(w =>
        !selected.includes(w) &&
        !selected.some(s => areVisuallySimilar(s.word, w.word))
      );
      if (remaining.length === 0) break;
      selected.push(remaining[0]);
    }
    return selected;
  }

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
    const stats = wordStats[word.id] || { attempts: 0, correct: 0, consecutiveCorrect: 0 };
    const catStats = categoryAccuracy[word.category] || { correct: 0, total: 0 };
    const catAccuracy = catStats.total > 0 ? catStats.correct / catStats.total : 0.5;
    const wordAccuracy = stats.attempts > 0 ? stats.correct / stats.attempts : 0.5;

    // Lower score = higher priority (needs practice)
    let score = wordAccuracy * 0.4 + catAccuracy * 0.2;

    // Boost never-attempted words significantly
    if (stats.attempts === 0) score -= 0.5;

    // Boost words from weak categories
    if (catAccuracy < 0.5) score -= 0.15;

    // MASTERY SYSTEM: Penalize mastered words (reduce frequency)
    const consecutive = stats.consecutiveCorrect || 0;
    if (consecutive >= 5) score += 1.5; // Fully mastered - rarely show (90% less)
    else if (consecutive >= 3) score += 0.8; // Mastered - show less (70% less)

    // MUCH more randomness to prevent repetition (0.6 instead of 0.3)
    score += Math.random() * 0.6;

    return { ...word, score };
  });

  // Sort by score (lowest first = needs most practice)
  scoredWords.sort((a, b) => a.score - b.score);

  // Take top candidates but ensure category variety AND avoid visually similar words (dyslexia-friendly)
  const selected = [];
  const usedCategories = new Set();

  for (const word of scoredWords) {
    if (selected.length >= count) break;

    // Prefer variety in first 3 picks
    if (selected.length < 3 && usedCategories.has(word.category)) continue;

    // DYSLEXIA-FRIENDLY: Skip if too similar to already selected words
    const tooSimilar = selected.some(w => areVisuallySimilar(w.word, word.word));
    if (tooSimilar) continue;

    selected.push(word);
    usedCategories.add(word.category);
  }

  // Fill remaining slots if needed (also check for visual similarity)
  while (selected.length < count) {
    const remaining = scoredWords.filter(w =>
      !selected.includes(w) &&
      !selected.some(s => areVisuallySimilar(s.word, w.word))
    );
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
  const [screen, setScreen] = useState('subject-select');
  const [gameData, setGameData] = useState(loadData);
  const [testWords, setTestWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [showResult, setShowResult] = useState(null);
  const [coinAnim, setCoinAnim] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [newBadge, setNewBadge] = useState(null);
  const [hotStreak, setHotStreak] = useState(0);

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

  // Auto-load from cloud on startup
  useEffect(() => {
    const autoSync = async () => {
      const token = localStorage.getItem('github_token');
      if (!token) return;

      try {
        const res = await fetch('https://api.github.com/gists', { headers: { 'Authorization': `token ${token}` } });
        if (!res.ok) return;

        const gists = await res.json();
        const albaGists = gists.filter(g => g.files['alba-spelling-data.json']);
        if (albaGists.length === 0) return;

        // Fetch ALL Gists to check their data
        const gistDataPromises = albaGists.map(async (g) => {
          const r = await fetch(`https://api.github.com/gists/${g.id}`, { headers: { 'Authorization': `token ${token}` } });
          if (!r.ok) return null;
          const full = await r.json();
          const data = JSON.parse(full.files['alba-spelling-data.json'].content);
          return { id: g.id, coins: data.totalCoinsEarned || 0 };
        });
        const gistData = (await Promise.all(gistDataPromises)).filter(Boolean);

        // Pick the one with the MOST coins (Alba's, not empty one)
        const best = gistData.sort((a, b) => b.coins - a.coins)[0];
        if (!best || best.coins === 0) return;

        const latest = albaGists.find(g => g.id === best.id);
        const gistRes = await fetch(`https://api.github.com/gists/${latest.id}`, { headers: { 'Authorization': `token ${token}` } });
        if (!gistRes.ok) return;

        const gist = await gistRes.json();
        const cloudData = JSON.parse(gist.files['alba-spelling-data.json'].content);
        const migratedCloud = migrateToMultiSubject(cloudData);

        // Load cloud data if it has more coins
        if (migratedCloud.totalCoinsEarned > gameData.totalCoinsEarned) {
          localStorage.setItem('alba_spelling_data', JSON.stringify(migratedCloud));
          localStorage.setItem('gist_id', latest.id);
          setGameData(migratedCloud);
        }
      } catch (e) {
        console.error('Auto-sync failed:', e);
      }
    };

    autoSync();
  }, []); // Run once on mount

  const { coins, streak, earnedBadges, totalCoinsEarned, bestStreak, claimedRewards, currentSubject, spelling, maths, science } = gameData;

  // Get current subject data (for backward compatibility with spelling screen)
  const testHistory = spelling.testHistory;
  const wordStats = spelling.wordStats;

  // Badge checking - comprehensive for 104 badges!
  const checkBadges = (data) => {
    const newBadges = [];
    const perfectTests = data.testHistory.filter(t => t.score === t.total).length;
    const testCount = data.testHistory.length;

    // Getting started
    if (!data.earnedBadges.includes('first') && testCount >= 1) newBadges.push('first');
    if (!data.earnedBadges.includes('first5') && testCount >= 5) newBadges.push('first5');

    // Perfect scores (11 badges)
    if (!data.earnedBadges.includes('perfect') && perfectTests >= 1) newBadges.push('perfect');
    if (!data.earnedBadges.includes('perfect3') && perfectTests >= 3) newBadges.push('perfect3');
    if (!data.earnedBadges.includes('perfect5') && perfectTests >= 5) newBadges.push('perfect5');
    if (!data.earnedBadges.includes('perfect10') && perfectTests >= 10) newBadges.push('perfect10');
    if (!data.earnedBadges.includes('perfect15') && perfectTests >= 15) newBadges.push('perfect15');
    if (!data.earnedBadges.includes('perfect25') && perfectTests >= 25) newBadges.push('perfect25');
    if (!data.earnedBadges.includes('perfect50') && perfectTests >= 50) newBadges.push('perfect50');
    if (!data.earnedBadges.includes('perfect75') && perfectTests >= 75) newBadges.push('perfect75');
    if (!data.earnedBadges.includes('perfect100') && perfectTests >= 100) newBadges.push('perfect100');
    if (!data.earnedBadges.includes('perfect150') && perfectTests >= 150) newBadges.push('perfect150');
    if (!data.earnedBadges.includes('perfect200') && perfectTests >= 200) newBadges.push('perfect200');

    // Streaks (20 badges)
    if (!data.earnedBadges.includes('streak3') && data.streak >= 3) newBadges.push('streak3');
    if (!data.earnedBadges.includes('streak5') && data.streak >= 5) newBadges.push('streak5');
    if (!data.earnedBadges.includes('streak7') && data.streak >= 7) newBadges.push('streak7');
    if (!data.earnedBadges.includes('streak10') && data.streak >= 10) newBadges.push('streak10');
    if (!data.earnedBadges.includes('streak14') && data.streak >= 14) newBadges.push('streak14');
    if (!data.earnedBadges.includes('streak21') && data.streak >= 21) newBadges.push('streak21');
    if (!data.earnedBadges.includes('streak28') && data.streak >= 28) newBadges.push('streak28');
    if (!data.earnedBadges.includes('streak35') && data.streak >= 35) newBadges.push('streak35');
    if (!data.earnedBadges.includes('streak45') && data.streak >= 45) newBadges.push('streak45');
    if (!data.earnedBadges.includes('streak60') && data.streak >= 60) newBadges.push('streak60');
    if (!data.earnedBadges.includes('streak75') && data.streak >= 75) newBadges.push('streak75');
    if (!data.earnedBadges.includes('streak90') && data.streak >= 90) newBadges.push('streak90');
    if (!data.earnedBadges.includes('streak100') && data.streak >= 100) newBadges.push('streak100');
    if (!data.earnedBadges.includes('streak120') && data.streak >= 120) newBadges.push('streak120');
    if (!data.earnedBadges.includes('streak150') && data.streak >= 150) newBadges.push('streak150');
    if (!data.earnedBadges.includes('streak180') && data.streak >= 180) newBadges.push('streak180');
    if (!data.earnedBadges.includes('streak200') && data.streak >= 200) newBadges.push('streak200');
    if (!data.earnedBadges.includes('streak270') && data.streak >= 270) newBadges.push('streak270');
    if (!data.earnedBadges.includes('streak300') && data.streak >= 300) newBadges.push('streak300');
    if (!data.earnedBadges.includes('streak365') && data.streak >= 365) newBadges.push('streak365');

    // Coin milestones (19 badges)
    if (!data.earnedBadges.includes('century') && data.totalCoinsEarned >= 100) newBadges.push('century');
    if (!data.earnedBadges.includes('coins250') && data.totalCoinsEarned >= 250) newBadges.push('coins250');
    if (!data.earnedBadges.includes('coins500') && data.totalCoinsEarned >= 500) newBadges.push('coins500');
    if (!data.earnedBadges.includes('coins750') && data.totalCoinsEarned >= 750) newBadges.push('coins750');
    if (!data.earnedBadges.includes('coins1000') && data.totalCoinsEarned >= 1000) newBadges.push('coins1000');
    if (!data.earnedBadges.includes('coins1500') && data.totalCoinsEarned >= 1500) newBadges.push('coins1500');
    if (!data.earnedBadges.includes('coins2000') && data.totalCoinsEarned >= 2000) newBadges.push('coins2000');
    if (!data.earnedBadges.includes('coins2500') && data.totalCoinsEarned >= 2500) newBadges.push('coins2500');
    if (!data.earnedBadges.includes('coins3000') && data.totalCoinsEarned >= 3000) newBadges.push('coins3000');
    if (!data.earnedBadges.includes('coins4000') && data.totalCoinsEarned >= 4000) newBadges.push('coins4000');
    if (!data.earnedBadges.includes('coins5000') && data.totalCoinsEarned >= 5000) newBadges.push('coins5000');
    if (!data.earnedBadges.includes('coins7500') && data.totalCoinsEarned >= 7500) newBadges.push('coins7500');
    if (!data.earnedBadges.includes('coins10000') && data.totalCoinsEarned >= 10000) newBadges.push('coins10000');
    if (!data.earnedBadges.includes('coins12500') && data.totalCoinsEarned >= 12500) newBadges.push('coins12500');
    if (!data.earnedBadges.includes('coins15000') && data.totalCoinsEarned >= 15000) newBadges.push('coins15000');
    if (!data.earnedBadges.includes('coins17500') && data.totalCoinsEarned >= 17500) newBadges.push('coins17500');
    if (!data.earnedBadges.includes('coins20000') && data.totalCoinsEarned >= 20000) newBadges.push('coins20000');
    if (!data.earnedBadges.includes('coins25000') && data.totalCoinsEarned >= 25000) newBadges.push('coins25000');
    if (!data.earnedBadges.includes('coins30000') && data.totalCoinsEarned >= 30000) newBadges.push('coins30000');

    // Test milestones (20 badges)
    if (!data.earnedBadges.includes('tests5') && testCount >= 5) newBadges.push('tests5');
    if (!data.earnedBadges.includes('tests10') && testCount >= 10) newBadges.push('tests10');
    if (!data.earnedBadges.includes('tests15') && testCount >= 15) newBadges.push('tests15');
    if (!data.earnedBadges.includes('tests25') && testCount >= 25) newBadges.push('tests25');
    if (!data.earnedBadges.includes('tests40') && testCount >= 40) newBadges.push('tests40');
    if (!data.earnedBadges.includes('tests50') && testCount >= 50) newBadges.push('tests50');
    if (!data.earnedBadges.includes('tests75') && testCount >= 75) newBadges.push('tests75');
    if (!data.earnedBadges.includes('tests100') && testCount >= 100) newBadges.push('tests100');
    if (!data.earnedBadges.includes('tests125') && testCount >= 125) newBadges.push('tests125');
    if (!data.earnedBadges.includes('tests150') && testCount >= 150) newBadges.push('tests150');
    if (!data.earnedBadges.includes('tests175') && testCount >= 175) newBadges.push('tests175');
    if (!data.earnedBadges.includes('tests200') && testCount >= 200) newBadges.push('tests200');
    if (!data.earnedBadges.includes('tests225') && testCount >= 225) newBadges.push('tests225');
    if (!data.earnedBadges.includes('tests250') && testCount >= 250) newBadges.push('tests250');
    if (!data.earnedBadges.includes('tests275') && testCount >= 275) newBadges.push('tests275');
    if (!data.earnedBadges.includes('tests300') && testCount >= 300) newBadges.push('tests300');
    if (!data.earnedBadges.includes('tests325') && testCount >= 325) newBadges.push('tests325');
    if (!data.earnedBadges.includes('tests350') && testCount >= 350) newBadges.push('tests350');
    if (!data.earnedBadges.includes('tests365') && testCount >= 365) newBadges.push('tests365');
    if (!data.earnedBadges.includes('tests400') && testCount >= 400) newBadges.push('tests400');

    // Category mastery
    const catStats = {};
    data.testHistory.forEach(test => {
      test.words?.forEach(w => {
        if (!catStats[w.category]) catStats[w.category] = { correct: 0, total: 0 };
        catStats[w.category].total++;
        if (w.correct) catStats[w.category].correct++;
      });
    });
    const getCatPct = (cat) => catStats[cat] && catStats[cat].total >= 10 ? (catStats[cat].correct / catStats[cat].total) * 100 : 0;

    // All 10 category mastery badges
    if (!data.earnedBadges.includes('master_tricky') && getCatPct('tricky') >= 90) newBadges.push('master_tricky');
    if (!data.earnedBadges.includes('master_ibeforee') && getCatPct('i-before-e') >= 90) newBadges.push('master_ibeforee');
    if (!data.earnedBadges.includes('master_softc') && getCatPct('soft-c') >= 90) newBadges.push('master_softc');
    if (!data.earnedBadges.includes('master_double') && getCatPct('double-letters') >= 90) newBadges.push('master_double');
    if (!data.earnedBadges.includes('master_silent') && getCatPct('silent-letters') >= 90) newBadges.push('master_silent');
    if (!data.earnedBadges.includes('master_endings') && getCatPct('endings') >= 90) newBadges.push('master_endings');
    if (!data.earnedBadges.includes('master_homophones') && getCatPct('homophones') >= 90) newBadges.push('master_homophones');
    if (!data.earnedBadges.includes('master_hard') && getCatPct('hard-spellings') >= 90) newBadges.push('master_hard');
    if (!data.earnedBadges.includes('master_prefixes') && getCatPct('prefixes') >= 90) newBadges.push('master_prefixes');
    if (!data.earnedBadges.includes('master_compound') && getCatPct('compound') >= 90) newBadges.push('master_compound');

    // Milestone achievements
    const catsWithAttempts = Object.keys(catStats).filter(c => catStats[c].total >= 5);
    const catsAbove75 = catsWithAttempts.filter(c => (catStats[c].correct / catStats[c].total) >= 0.75);
    const catsAbove80 = catsWithAttempts.filter(c => (catStats[c].correct / catStats[c].total) >= 0.80);
    const catsAbove85 = catsWithAttempts.filter(c => (catStats[c].correct / catStats[c].total) >= 0.85);
    const catsAbove90 = catsWithAttempts.filter(c => (catStats[c].correct / catStats[c].total) >= 0.90);
    const catsAbove95 = catsWithAttempts.filter(c => (catStats[c].correct / catStats[c].total) >= 0.95);

    if (!data.earnedBadges.includes('allrounder') && catsAbove75.length >= 5) newBadges.push('allrounder');
    if (!data.earnedBadges.includes('versatile') && catsAbove80.length >= 7) newBadges.push('versatile');
    if (!data.earnedBadges.includes('mastery') && catsAbove85.length >= 10) newBadges.push('mastery');
    if (!data.earnedBadges.includes('perfectionist') && catsAbove90.length >= 10) newBadges.push('perfectionist');
    if (!data.earnedBadges.includes('ultimate') && catsAbove95.length >= 10) newBadges.push('ultimate');

    // Curious - tried all 10 categories
    const categoriesTried = new Set();
    data.testHistory.forEach(test => { test.words?.forEach(w => categoriesTried.add(w.category)); });
    if (!data.earnedBadges.includes('curious') && categoriesTried.size >= 10) newBadges.push('curious');

    // Badge collection badges
    const totalBadges = data.earnedBadges.length + newBadges.length;
    if (!data.earnedBadges.includes('collector') && totalBadges >= 25) newBadges.push('collector');
    if (!data.earnedBadges.includes('halfbadges') && totalBadges >= Math.floor(badges.length / 2)) newBadges.push('halfbadges');
    if (!data.earnedBadges.includes('badgemaster') && totalBadges >= Math.floor(badges.length * 0.75)) newBadges.push('badgemaster');

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
    setHotStreak(0);
    setScreen('test');
  };

  const handleKey = (k) => { if (showResult === null) setInput(prev => prev + k); };
  const handleBackspace = () => { if (showResult === null) setInput(prev => prev.slice(0, -1)); };

  const handleSubmit = () => {
    if (input.trim() === '' || showResult !== null) return;
    const word = testWords[currentIndex];
    const correct = input.toLowerCase().trim() === word.word.toLowerCase();

    // Hot streak multiplier: 1st = 1 coin, 2nd = 2 coins, 3rd+ = 3 coins (reduced for year-long economy)
    let earned = 0;
    let newStreak = hotStreak;
    if (correct) {
      newStreak = hotStreak + 1;
      if (newStreak === 1) earned = 1;
      else if (newStreak === 2) earned = 2;
      else earned = 3; // 3+ streak

      // MASTERY SYSTEM: Reduce coins for mastered words
      const wordStats = gameData.wordStats[word.id] || { consecutiveCorrect: 0 };
      const consecutive = wordStats.consecutiveCorrect || 0;
      if (consecutive >= 5) {
        // Fully mastered (5+ in a row) - earn 0.25x coins
        earned = Math.max(0.25, earned * 0.25);
      } else if (consecutive >= 3) {
        // Mastered (3-4 in a row) - earn 0.5x coins
        earned = Math.max(0.5, earned * 0.5);
      }

      setHotStreak(newStreak);
    } else {
      setHotStreak(0); // Reset streak on wrong answer
    }

    const newResult = { word: word.word, wordId: word.id, attempt: input, correct, coins: earned, category: word.category };
    console.log('📝 Saving result:', newResult);
    setResults(prev => {
      const updated = [...prev, newResult];
      console.log('✅ Results now:', updated.length, 'items');
      return updated;
    });
    setShowResult({ correct, word: word.word, attempt: input.toLowerCase().trim(), streak: newStreak });
    if (earned > 0) {
      setCoinAnim(earned);
      setTimeout(() => setCoinAnim(null), 1600);
    }
  };

  const finishTest = () => {
    console.log('🏁 Finishing test. Results array has:', results.length, 'items');
    console.log('📊 Full results:', results);
    const allResults = [...results];
    const correctCount = allResults.filter(r => r.correct).length;
    const pct = (correctCount / testWords.length) * 100;
    // Completion bonus (reduced for year-long economy)
    let bonus = 2;
    if (pct === 100) bonus = 20;
    else if (pct >= 80) bonus = 10;
    else if (pct >= 60) bonus = 5;

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

    // Update word stats (with consecutive correct tracking for mastery)
    const newWordStats = { ...gameData.wordStats };
    allResults.forEach(r => {
      const prev = newWordStats[r.wordId] || { attempts: 0, correct: 0, consecutiveCorrect: 0 };
      newWordStats[r.wordId] = {
        attempts: prev.attempts + 1,
        correct: prev.correct + (r.correct ? 1 : 0),
        consecutiveCorrect: r.correct ? (prev.consecutiveCorrect || 0) + 1 : 0, // Track streak for mastery
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

  // Subject Selection Screen
  if (screen === 'subject-select') {
    const getSubjectStats = (subject) => {
      const data = gameData[subject];
      if (!data || !data.testHistory || data.testHistory.length === 0) {
        return { lastScore: null, mastery: 0, totalTests: 0 };
      }

      const testHistory = data.testHistory;
      const lastTest = testHistory[testHistory.length - 1];
      const lastScore = lastTest ? Math.round((lastTest.score / lastTest.total) * 100) : null;

      // Calculate mastery percentage
      const stats = subject === 'spelling' ? data.wordStats : data.questionStats;
      const attempted = Object.keys(stats).length;
      const totalItems = subject === 'spelling' ? allWords.length :
                         subject === 'maths' ? mathsQuestions.length : 0;
      const mastery = totalItems > 0 ? Math.round((attempted / totalItems) * 100) : 0;

      return { lastScore, mastery, totalTests: testHistory.length };
    };

    const spellingStats = getSubjectStats('spelling');
    const mathsStats = getSubjectStats('maths');
    const scienceStats = getSubjectStats('science');

    const selectSubject = (subject) => {
      setGameData(prev => ({ ...prev, currentSubject: subject }));
      setScreen('home');
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-600 via-pink-500 to-orange-500 p-4">
        {newBadge && <BadgePopup badge={newBadge} onClose={() => setNewBadge(null)} />}
        <div className="max-w-md mx-auto">
          {/* Header with coins and streak */}
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

          <h1 className="text-4xl font-bold text-white text-center mb-2">Alba's Learning</h1>
          <p className="text-white/90 text-center mb-8 text-lg">Choose your subject! 🎓</p>

          {/* Subject Cards */}
          <div className="space-y-4">
            {/* Spelling */}
            <button
              onClick={() => selectSubject('spelling')}
              className="w-full bg-white rounded-3xl p-6 shadow-xl active:scale-98 transition-transform"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-5xl">📚</span>
                <div className="text-left flex-1">
                  <div className="font-bold text-2xl text-purple-600">Spelling</div>
                  <div className="text-gray-500 text-sm">161 words to master</div>
                </div>
              </div>
              {spellingStats.totalTests > 0 && (
                <div className="flex gap-4 text-sm">
                  <div className="flex-1 bg-purple-50 rounded-lg p-2">
                    <div className="text-purple-600 font-semibold">Last Score</div>
                    <div className="text-2xl font-bold text-purple-700">{spellingStats.lastScore}%</div>
                  </div>
                  <div className="flex-1 bg-purple-50 rounded-lg p-2">
                    <div className="text-purple-600 font-semibold">Mastery</div>
                    <div className="text-2xl font-bold text-purple-700">{spellingStats.mastery}%</div>
                  </div>
                  <div className="flex-1 bg-purple-50 rounded-lg p-2">
                    <div className="text-purple-600 font-semibold">Tests</div>
                    <div className="text-2xl font-bold text-purple-700">{spellingStats.totalTests}</div>
                  </div>
                </div>
              )}
            </button>

            {/* Maths */}
            <button
              onClick={() => selectSubject('maths')}
              className="w-full bg-white rounded-3xl p-6 shadow-xl active:scale-98 transition-transform"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-5xl">🔢</span>
                <div className="text-left flex-1">
                  <div className="font-bold text-2xl text-blue-600">Maths</div>
                  <div className="text-gray-500 text-sm">105 questions across 8 topics</div>
                </div>
              </div>
              {mathsStats.totalTests > 0 ? (
                <div className="flex gap-4 text-sm">
                  <div className="flex-1 bg-blue-50 rounded-lg p-2">
                    <div className="text-blue-600 font-semibold">Last Score</div>
                    <div className="text-2xl font-bold text-blue-700">{mathsStats.lastScore}%</div>
                  </div>
                  <div className="flex-1 bg-blue-50 rounded-lg p-2">
                    <div className="text-blue-600 font-semibold">Mastery</div>
                    <div className="text-2xl font-bold text-blue-700">{mathsStats.mastery}%</div>
                  </div>
                  <div className="flex-1 bg-blue-50 rounded-lg p-2">
                    <div className="text-blue-600 font-semibold">Tests</div>
                    <div className="text-2xl font-bold text-blue-700">{mathsStats.totalTests}</div>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <span className="text-blue-600 font-semibold">✨ New! Start your first test</span>
                </div>
              )}
            </button>

            {/* Science - Coming Soon */}
            <div className="w-full bg-gray-100 rounded-3xl p-6 shadow-lg opacity-60">
              <div className="flex items-center gap-4 mb-3">
                <span className="text-5xl">🔬</span>
                <div className="text-left flex-1">
                  <div className="font-bold text-2xl text-gray-500">Science</div>
                  <div className="text-gray-400 text-sm">Coming soon! 🚀</div>
                </div>
              </div>
              <div className="bg-gray-200 rounded-lg p-3 text-center">
                <span className="text-gray-500 font-semibold">🔒 Locked</span>
              </div>
            </div>
          </div>

          {/* Settings button */}
          <button onClick={() => setScreen('settings')} className="w-full mt-6 bg-white/10 rounded-2xl p-4 shadow active:scale-98 flex items-center justify-center gap-2">
            <span className="text-2xl">⚙️</span>
            <span className="text-white text-sm">Settings (Dad only)</span>
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'home') {
    const subjectName = currentSubject === 'spelling' ? 'Spelling' : currentSubject === 'maths' ? 'Maths' : 'Science';
    const subjectIcon = currentSubject === 'spelling' ? '📚' : currentSubject === 'maths' ? '🔢' : '🔬';

    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-600 p-4">
        {newBadge && <BadgePopup badge={newBadge} onClose={() => setNewBadge(null)} />}
        <div className="max-w-md mx-auto">
          {/* Back button */}
          <button
            onClick={() => setScreen('subject-select')}
            className="text-white/80 text-sm mb-4 flex items-center gap-1 active:scale-95"
          >
            ← Back to Subjects
          </button>

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

          <h1 className="text-3xl font-bold text-white text-center mb-2 flex items-center justify-center gap-2">
            <span>{subjectIcon}</span>
            <span>Alba's {subjectName}</span>
          </h1>
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
            <div className="flex items-center gap-4">
              {hotStreak >= 2 && (
                <div className="flex items-center gap-1 bg-orange-500 px-3 py-1 rounded-full">
                  <span className="text-lg">🔥</span>
                  <span className="text-sm font-bold text-white">{hotStreak}x</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-xl">🪙</span>
                <span className="text-lg font-bold text-white">{coins}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/20 rounded-full h-2 mb-6">
            <div className="bg-white rounded-full h-2 transition-all" style={{ width: `${((currentIndex + 1) / testWords.length) * 100}%` }} />
          </div>
          <p className="text-white/80 text-center text-sm mb-4">Word {currentIndex + 1} of {testWords.length}</p>

          <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
            <button onClick={() => speak(`${currentWord.word}. ${currentWord.sentence}. ${currentWord.word}.`)} disabled={speaking} className="w-full bg-indigo-100 rounded-xl p-4 mb-4 flex items-center justify-center gap-2 active:bg-indigo-200">
              <span className="text-2xl">{speaking ? '🔊' : '🔈'}</span>
              <span className="font-semibold text-indigo-700">Hear Word</span>
            </button>

            <p className="text-gray-500 text-center text-sm mb-4">"{currentWord.sentence}"</p>

            <div className="bg-gray-100 rounded-xl p-4 min-h-16 flex items-center justify-center mb-2">
              <span className="text-2xl font-bold tracking-wider text-gray-800">{input || <span className="text-gray-400">Type here...</span>}</span>
            </div>

            {showResult !== null && (
              <div className={`rounded-xl p-4 mb-2 ${showResult.correct ? 'bg-green-100' : 'bg-red-100'}`}>
                {showResult.correct ? (
                  <p className="text-center font-bold text-green-700">
                    ✓ Correct! +{showResult.streak === 1 ? 1 : showResult.streak === 2 ? 2 : 3} 🪙
                    {showResult.streak >= 2 && <span className="block text-sm mt-1">🔥 {showResult.streak} in a row! Streak bonus!</span>}
                  </p>
                ) : (
                  <div className="text-center">
                    <p className="font-bold text-red-700 mb-3">Let's learn together! 💪</p>

                    {/* Your spelling - bigger, clearer for dyslexia */}
                    <div className="mb-2">
                      <p className="text-xs text-gray-600 mb-1">You wrote:</p>
                      <div className="flex justify-center gap-1 mb-3">
                        {(showResult.attempt || '').split('').map((letter, i) => {
                          const correctWord = showResult.word.toLowerCase();
                          const isCorrect = i < correctWord.length && letter === correctWord[i];
                          return (
                            <span
                              key={i}
                              className={`text-2xl font-bold px-1 rounded ${isCorrect ? 'text-green-600' : 'text-red-600'}`}
                              style={{ fontFamily: 'monospace' }}
                            >
                              {letter}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Correct spelling - clear reference */}
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Correct spelling:</p>
                      <div className="flex justify-center gap-1">
                        {showResult.word.toLowerCase().split('').map((letter, i) => (
                          <span
                            key={i}
                            className="text-2xl font-bold text-green-700 px-1"
                            style={{ fontFamily: 'monospace' }}
                          >
                            {letter}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
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
    // Handle empty results (shouldn't happen but safety check)
    if (!results || results.length === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-red-500 to-orange-600 p-4 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 text-center max-w-md">
            <p className="text-6xl mb-4">⚠️</p>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">No Results Found</h1>
            <p className="text-gray-600 mb-6">
              Something went wrong. No test results were recorded.
              This might be a bug - please try taking the test again.
            </p>
            <button onClick={() => setScreen('home')} className="w-full bg-red-600 text-white rounded-xl p-4 font-bold">
              Back to Home
            </button>
          </div>
        </div>
      );
    }

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
  const [pinVerified, setPinVerified] = useState(false);
  const [apiKey, setApiKey] = useState(ttsService.getApiKey() || '');
  const [saved, setSaved] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [pinSaved, setPinSaved] = useState(false);
  const [githubToken, setGithubToken] = useState(localStorage.getItem('github_token') || '');
  const [githubSaved, setGithubSaved] = useState(false);
  const [manualGistId, setManualGistId] = useState('');
  const [gistIdSaved, setGistIdSaved] = useState(false);

  if (!pinVerified) {
    return <PinEntry onSuccess={() => setPinVerified(true)} onBack={onBack} />;
  }

  const handleSave = () => {
    ttsService.setApiKey(apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePinSave = () => {
    if (newPin.length === 4 && /^\d{4}$/.test(newPin)) {
      localStorage.setItem('parent_pin', newPin);
      setPinSaved(true);
      setNewPin('');
      setTimeout(() => setPinSaved(false), 2000);
    } else {
      alert('PIN must be exactly 4 digits');
    }
  };

  const handleGithubSave = () => {
    localStorage.setItem('github_token', githubToken);
    setGithubSaved(true);
    setTimeout(() => setGithubSaved(false), 2000);
  };

  const deleteEmptyGists = async () => {
    const token = localStorage.getItem('github_token');
    if (!token) {
      alert('Please add your GitHub token first!');
      return;
    }

    if (!confirm('This will delete ALL Gists with 0 coins. Keep only Alba\'s data. Continue?')) {
      return;
    }

    try {
      const res = await fetch('https://api.github.com/gists', { headers: { 'Authorization': `token ${token}` } });
      if (!res.ok) {
        alert('Failed to fetch Gists.');
        return;
      }

      const gists = await res.json();
      const albaGists = gists.filter(g => g.files['alba-spelling-data.json']);

      let deleted = 0;
      for (const g of albaGists) {
        const gistRes = await fetch(`https://api.github.com/gists/${g.id}`, { headers: { 'Authorization': `token ${token}` } });
        if (gistRes.ok) {
          const full = await gistRes.json();
          const data = JSON.parse(full.files['alba-spelling-data.json'].content);

          if ((data.totalCoinsEarned || 0) === 0) {
            await fetch(`https://api.github.com/gists/${g.id}`, {
              method: 'DELETE',
              headers: { 'Authorization': `token ${token}` }
            });
            deleted++;
          }
        }
      }

      alert(`✅ Deleted ${deleted} empty Gist${deleted !== 1 ? 's' : ''}. Only Alba's data remains.`);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const syncNow = async () => {
    const token = localStorage.getItem('github_token');
    if (!token) {
      alert('Please save your GitHub token first!');
      return;
    }

    try {
      // Get current data from localStorage
      const currentData = localStorage.getItem('alba_spelling_data');
      if (!currentData) {
        alert('No data to sync yet!');
        return;
      }

      const data = JSON.parse(currentData);
      const gistId = localStorage.getItem('gist_id');
      const content = JSON.stringify(data, null, 2);

      const url = gistId
        ? `https://api.github.com/gists/${gistId}`
        : 'https://api.github.com/gists';

      const method = gistId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: 'Alba Spelling Test Data - Manual Sync',
          public: false,
          files: {
            'alba-spelling-data.json': { content }
          }
        })
      });

      if (response.ok) {
        const gist = await response.json();
        localStorage.setItem('gist_id', gist.id);
        alert(`✅ Synced to cloud!\n\nCoins: ${data.coins}\nTests: ${data.tests?.length || 0}\n\nView at: ${gist.html_url}`);
      } else {
        alert('Failed to sync. Check your token.');
      }
    } catch (error) {
      alert('Error syncing: ' + error.message);
    }
  };

  const downloadFromGistId = async () => {
    const token = localStorage.getItem('github_token');
    if (!token) {
      alert('Please add your GitHub token first!');
      return;
    }

    if (!manualGistId) {
      alert('Please enter the Gist ID from Alba\'s phone!');
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/gists/${manualGistId}`, {
        headers: { 'Authorization': `token ${token}` }
      });

      if (!response.ok) {
        alert('Failed to fetch Gist. Check the ID.');
        return;
      }

      const gist = await response.json();

      if (!gist.files || !gist.files['alba-spelling-data.json']) {
        alert('Error: Gist does not contain alba-spelling-data.json');
        return;
      }

      const content = gist.files['alba-spelling-data.json'].content;
      const data = JSON.parse(content);

      // Debug: Check what we actually got
      console.log('Downloaded data:', {
        coins: data.coins,
        totalCoinsEarned: data.totalCoinsEarned,
        testHistory: data.testHistory?.length,
        tests: data.tests?.length
      });

      localStorage.setItem('alba_spelling_data', JSON.stringify(data));
      localStorage.setItem('gist_id', manualGistId);

      alert(`✅ Downloaded Alba's data!\n\nCoins: ${data.coins || 0}\nTotal Earned: ${data.totalCoinsEarned || 0}\nTests: ${data.testHistory?.length || 0}\n\nRefreshing now...`);
      window.location.reload();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const findAndDownload = async () => {
    const token = localStorage.getItem('github_token');
    if (!token) {
      alert('Please add your GitHub token first!');
      return;
    }

    try {
      // Search for Gists with alba-spelling-data
      const listResponse = await fetch('https://api.github.com/gists', {
        headers: { 'Authorization': `token ${token}` }
      });

      if (!listResponse.ok) {
        alert('Failed to fetch Gists. Check your token.');
        return;
      }

      const gists = await listResponse.json();
      const albaGists = gists.filter(g => g.files['alba-spelling-data.json']);

      if (albaGists.length === 0) {
        alert('No Alba spelling data found. Has Alba taken a test yet?');
        return;
      }

      // Check ALL Gists and pick the one with MOST coins (Alba's data, not empty)
      const gistDataPromises = albaGists.map(async (g) => {
        const r = await fetch(`https://api.github.com/gists/${g.id}`, { headers: { 'Authorization': `token ${token}` } });
        if (!r.ok) return null;
        const full = await r.json();
        const data = JSON.parse(full.files['alba-spelling-data.json'].content);
        return { id: g.id, coins: data.totalCoinsEarned || 0, data };
      });
      const gistData = (await Promise.all(gistDataPromises)).filter(Boolean);

      // Pick the one with MOST coins
      const best = gistData.sort((a, b) => b.coins - a.coins)[0];

      console.log(`Found ${albaGists.length} Gists, using one with most coins: ${best.id} (${best.coins} coins)`);

      // Use the data we already fetched
      const data = best.data;

      // Save to localStorage
      localStorage.setItem('alba_spelling_data', JSON.stringify(data));
      localStorage.setItem('gist_id', best.id);

      alert(`✅ Found Alba's data!\n\nCoins: ${data.coins || 0}\nTotal Earned: ${data.totalCoinsEarned || 0}\nTests: ${data.testHistory?.length || 0}\n\nRefreshing now...`);
      window.location.reload();
    } catch (error) {
      alert('Error finding data: ' + error.message);
    }
  };

  const loadFromCloud = async () => {
    const token = localStorage.getItem('github_token');
    const gistId = localStorage.getItem('gist_id');

    if (!token || !gistId) {
      alert('No cloud backup configured yet. Use "Find Alba\'s Data" button.');
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/gists/${gistId}`, {
        headers: { 'Authorization': `token ${token}` }
      });

      if (response.ok) {
        const gist = await response.json();
        const content = gist.files['alba-spelling-data.json'].content;
        const data = JSON.parse(content);
        localStorage.setItem('alba_spelling_data', JSON.stringify(data));
        alert('✅ Loaded latest data from cloud! Refresh the page.');
        window.location.reload();
      } else {
        alert('Failed to load from cloud. Check your token.');
      }
    } catch (error) {
      alert('Error loading from cloud: ' + error.message);
    }
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
          <h2 className="font-bold text-gray-800 mb-2">🔒 Change Dashboard PIN</h2>
          <p className="text-gray-600 text-sm mb-4">4-digit PIN for parent access (current: {localStorage.getItem('parent_pin') || '1234'})</p>
          <input
            type="number"
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            placeholder="Enter new 4-digit PIN"
            maxLength={4}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none mb-3 text-center text-2xl font-mono"
          />
          <button onClick={handlePinSave} className={`w-full py-3 rounded-lg font-bold text-white ${pinSaved ? 'bg-green-500' : 'bg-orange-500'} active:scale-98`}>
            {pinSaved ? '✓ PIN Changed!' : 'Save New PIN'}
          </button>
        </div>

        <div className="bg-white rounded-2xl p-6 mb-4">
          <h2 className="font-bold text-gray-800 mb-2">☁️ GitHub Cloud Backup</h2>
          <p className="text-gray-600 text-sm mb-4">
            Auto-saves all test data to private GitHub Gist. Never lose progress!
            <br/><a href="https://github.com/settings/tokens/new?scopes=gist&description=Alba%20Spelling%20Backup" target="_blank" className="text-blue-600 underline">Get token here</a>
          </p>
          <input
            type="password"
            value={githubToken}
            onChange={(e) => setGithubToken(e.target.value)}
            placeholder="ghp_..."
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none mb-3 font-mono text-sm"
          />
          <button onClick={handleGithubSave} className={`w-full py-3 rounded-lg font-bold text-white ${githubSaved ? 'bg-green-500' : 'bg-purple-600'} active:scale-98 mb-2`}>
            {githubSaved ? '✓ Token Saved!' : 'Save Token'}
          </button>

          {githubToken && (
            <>
              <button onClick={findAndDownload} className="w-full py-3 rounded-lg font-bold text-white bg-green-600 active:scale-98 mb-2">
                📥 Download Alba's Data
              </button>
              <button onClick={deleteEmptyGists} className="w-full py-3 rounded-lg font-bold text-red-600 bg-red-50 active:scale-98 mb-2 text-sm">
                🗑️ Delete Empty Gists
              </button>
            </>
          )}

          {localStorage.getItem('gist_id') && (
            <>
              <button onClick={loadFromCloud} className="w-full py-3 rounded-lg font-bold text-purple-600 bg-purple-50 active:scale-98 mb-3">
                📥 Load Latest from Cloud
              </button>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-green-700 text-sm font-semibold mb-2">✓ Syncing to GitHub</p>
                <a
                  href={`https://gist.github.com/${localStorage.getItem('gist_id')}`}
                  target="_blank"
                  className="text-blue-600 text-xs underline"
                >
                  View backup on GitHub →
                </a>
              </div>
            </>
          )}
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

// PIN Entry component
function PinEntry({ onSuccess, onBack }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const storedPin = localStorage.getItem('parent_pin') || '1234'; // Default PIN

  const handleNumberClick = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        // Check PIN
        setTimeout(() => {
          if (newPin === storedPin) {
            onSuccess();
          } else {
            setError(true);
            setPin('');
            setTimeout(() => setError(false), 1000);
          }
        }, 100);
      }
    }
  };

  const handleClear = () => {
    setPin('');
    setError(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 to-gray-900 p-4 flex items-center justify-center">
      <div className="max-w-sm w-full">
        <button onClick={onBack} className="text-white/80 mb-6">← Back</button>
        <div className="bg-white rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">🔒 Parent Access</h2>
          <p className="text-gray-600 mb-6 text-sm">Enter PIN to view dashboard</p>

          {/* PIN Display */}
          <div className="flex justify-center gap-3 mb-6">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className={`w-14 h-14 rounded-lg flex items-center justify-center text-2xl font-bold border-2 ${
                error ? 'bg-red-50 border-red-500 text-red-500' :
                pin.length > i ? 'bg-purple-600 border-purple-600 text-white' :
                'bg-gray-100 border-gray-300 text-gray-400'
              }`}>
                {pin.length > i ? '●' : '○'}
              </div>
            ))}
          </div>

          {error && <p className="text-red-600 font-semibold mb-4">Incorrect PIN</p>}

          {/* Number Pad */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button
                key={num}
                onClick={() => handleNumberClick(num.toString())}
                className="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-lg h-16 text-2xl font-bold text-gray-800"
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleClear}
              className="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-lg h-16 text-lg font-bold text-gray-600"
            >
              Clear
            </button>
            <button
              onClick={() => handleNumberClick('0')}
              className="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 rounded-lg h-16 text-2xl font-bold text-gray-800"
            >
              0
            </button>
            <div></div>
          </div>

          <p className="text-xs text-gray-400 mt-4">Default PIN: 1234<br/>Change in Settings</p>
        </div>
      </div>
    </div>
  );
}

// Parent Dashboard component
function ParentDashboard({ gameData, onBack }) {
  const [pinVerified, setPinVerified] = useState(false);
  const { testHistory, wordStats, coins, totalCoinsEarned, streak, bestStreak, earnedBadges } = gameData;

  if (!pinVerified) {
    return <PinEntry onSuccess={() => setPinVerified(true)} onBack={onBack} />;
  }

  // Calculate problem words (< 50% success rate, min 2 attempts)
  // NOTE: Handle old data by creating placeholder words if ID doesn't match
  const problemWords = Object.entries(wordStats)
    .map(([wordId, stats]) => {
      let word = allWords.find(w => w.id === parseInt(wordId));
      // If word not found (old data), create placeholder
      if (!word) {
        word = { id: wordId, word: `Word #${wordId}`, category: 'unknown', difficulty: 'medium' };
      }
      const successRate = stats.attempts > 0 ? Math.round((stats.correct / stats.attempts) * 100) : 0;
      return { word, stats, successRate };
    })
    .filter(w => w.stats.attempts >= 2 && w.successRate < 50)
    .sort((a, b) => a.successRate - b.successRate);

  // Words that need practice (< 75% success rate)
  const needsPractice = Object.entries(wordStats)
    .map(([wordId, stats]) => {
      let word = allWords.find(w => w.id === parseInt(wordId));
      if (!word) {
        word = { id: wordId, word: `Word #${wordId}`, category: 'unknown', difficulty: 'medium' };
      }
      const successRate = stats.attempts > 0 ? Math.round((stats.correct / stats.attempts) * 100) : 0;
      return { word, stats, successRate };
    })
    .filter(w => w.stats.attempts >= 2 && w.successRate >= 50 && w.successRate < 75)
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

  // Check if there's any data mismatch (old word IDs)
  const hasMismatchedData = Object.keys(wordStats).some(wordId => {
    return !allWords.find(w => w.id === parseInt(wordId));
  });

  const clearAllData = () => {
    if (confirm('This will delete ALL progress data (tests, coins, badges). Are you sure?')) {
      localStorage.removeItem('alba_spelling_data');
      alert('All data cleared. Refresh the page.');
      window.location.reload();
    }
  };

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

        {/* Data Mismatch Warning */}
        {hasMismatchedData && (
          <div className="bg-yellow-100 border-2 border-yellow-500 rounded-2xl p-6 mb-4">
            <h2 className="text-xl font-bold text-yellow-800 mb-2">⚠️ Old Data Detected</h2>
            <p className="text-yellow-700 mb-4">
              Some word IDs from previous tests don't match the new word list.
              Stats will show as "Word #XX". You can continue using the app,
              or clear all data to start fresh.
            </p>
            <button
              onClick={clearAllData}
              className="w-full py-3 rounded-lg font-bold text-white bg-red-600 active:scale-98"
            >
              🗑️ Clear All Data & Start Fresh
            </button>
          </div>
        )}

        {/* Performance vs Benchmarks */}
        {testHistory.length > 0 && (() => {
          const totalWords = Object.keys(wordStats).length;
          const masteredWords = Object.values(wordStats).filter(s => s.attempts >= 3 && (s.correct / s.attempts) >= 0.8).length;
          const overallAccuracy = testHistory.length > 0
            ? Math.round((testHistory.reduce((sum, t) => sum + t.score, 0) / testHistory.reduce((sum, t) => sum + t.total, 0)) * 100)
            : 0;

          // Year 5 (10-year-old) benchmarks
          const benchmarks = {
            accuracy: 70, // 70%+ expected
            weeklyTests: 2, // 2+ tests per week
            masteredWords: 80, // 80+ words mastered
            categoryMin: 70 // 70%+ in each category
          };

          const accuracyStatus = overallAccuracy >= benchmarks.accuracy ? 'on-track' : overallAccuracy >= benchmarks.accuracy - 10 ? 'needs-work' : 'behind';
          const testFreqStatus = weeklyTests >= benchmarks.weeklyTests ? 'on-track' : weeklyTests >= 1 ? 'needs-work' : 'behind';
          const masteryStatus = masteredWords >= benchmarks.masteredWords ? 'on-track' : masteredWords >= benchmarks.masteredWords * 0.7 ? 'needs-work' : 'behind';

          const weakCategories = categoryStats.filter(c => c.pct < benchmarks.categoryMin);
          const overallStatus = (accuracyStatus === 'on-track' && testFreqStatus === 'on-track' && masteryStatus === 'on-track') ? 'on-track'
            : (accuracyStatus === 'behind' || masteryStatus === 'behind') ? 'behind' : 'needs-work';

          const statusConfig = {
            'on-track': { icon: '✅', color: 'green', label: 'On Track', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-500' },
            'needs-work': { icon: '⚠️', color: 'yellow', label: 'Needs Work', bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-500' },
            'behind': { icon: '🚨', color: 'red', label: 'Behind', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-500' }
          };

          const status = statusConfig[overallStatus];

          return (
            <div className={`rounded-2xl p-6 mb-4 border-2 ${status.bg} ${status.border}`}>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{status.icon} Progress vs. Average 10-Year-Old</h2>
              <p className={`font-bold mb-4 ${status.text}`}>Overall Status: {status.label}</p>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Accuracy: {overallAccuracy}%</span>
                  <span className={`font-bold ${statusConfig[accuracyStatus].text}`}>
                    {accuracyStatus === 'on-track' ? '✅ Great!' : accuracyStatus === 'needs-work' ? '⚠️ Keep practicing' : '🚨 Needs focus'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Practice frequency: {weeklyTests} tests/week</span>
                  <span className={`font-bold ${statusConfig[testFreqStatus].text}`}>
                    {testFreqStatus === 'on-track' ? '✅ Excellent!' : testFreqStatus === 'needs-work' ? '⚠️ Try 2-3/week' : '🚨 More practice needed'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Words mastered: {masteredWords}/{totalWords}</span>
                  <span className={`font-bold ${statusConfig[masteryStatus].text}`}>
                    {masteryStatus === 'on-track' ? '✅ Brilliant!' : masteryStatus === 'needs-work' ? '⚠️ Good progress' : '🚨 Keep going'}
                  </span>
                </div>
              </div>

              {weakCategories.length > 0 && (
                <div className="bg-white rounded-lg p-4 mt-4">
                  <p className="font-bold text-gray-800 mb-2">📚 Focus Areas:</p>
                  <ul className="space-y-1">
                    {weakCategories.slice(0, 3).map((cat, i) => (
                      <li key={i} className="text-sm text-gray-700">• {cat.name} ({cat.pct}% - needs to reach 70%+)</li>
                    ))}
                  </ul>
                </div>
              )}

              {overallStatus === 'on-track' && (
                <p className="text-green-700 font-semibold mt-4">🌟 Alba is performing at or above expected levels for her age!</p>
              )}
              {overallStatus === 'needs-work' && (
                <p className="text-yellow-700 font-semibold mt-4">💪 With a bit more practice, Alba will be right on track!</p>
              )}
              {overallStatus === 'behind' && (
                <p className="text-red-700 font-semibold mt-4">📖 More regular practice will help Alba catch up. Try 2-3 tests per week focusing on weak categories.</p>
              )}
            </div>
          );
        })()}

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

        {/* Coins & Streaks */}
        <div className="bg-white rounded-2xl p-6 mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">💰 Coins & Streaks</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-3xl font-bold text-yellow-600">{coins}</p>
              <p className="text-gray-600 text-sm">Current Coins</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">{totalCoinsEarned}</p>
              <p className="text-gray-600 text-sm">Total Earned</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-3xl font-bold text-orange-600">{streak}🔥</p>
              <p className="text-gray-600 text-sm">Current Streak</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">{bestStreak}</p>
              <p className="text-gray-600 text-sm">Best Streak</p>
            </div>
          </div>
        </div>

        {/* Weekly Target */}
        <div className="bg-white rounded-2xl p-6 mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 Weekly Target</h2>
          <div className="bg-gray-200 rounded-full h-6 mb-2">
            <div
              className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full h-6 transition-all flex items-center justify-end pr-2"
              style={{ width: `${Math.min(100, Math.round((recentTests.reduce((sum, t) => sum + t.words.filter(w => w.correct).length * 2, 0) / 250) * 100))}%` }}
            >
              <span className="text-white text-xs font-bold">
                {Math.min(100, Math.round((recentTests.reduce((sum, t) => sum + t.words.filter(w => w.correct).length * 2, 0) / 250) * 100))}%
              </span>
            </div>
          </div>
          <p className="text-gray-600 text-sm text-center">
            {recentTests.reduce((sum, t) => sum + t.words.filter(w => w.correct).length * 2, 0)} / 250 coins this week
          </p>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-2xl p-6 mb-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">🏆 Badges ({earnedBadges.length}/{badges.length})</h2>
          <div className="grid grid-cols-4 gap-3">
            {badges.map(b => {
              const earned = earnedBadges.includes(b.id);
              return (
                <div key={b.id} className={`text-center p-3 bg-gray-50 rounded-lg ${!earned && 'opacity-30 grayscale'}`}>
                  <span className="text-3xl">{b.icon}</span>
                  <p className="text-xs font-bold mt-1 text-gray-700">{b.name}</p>
                </div>
              );
            })}
          </div>
        </div>

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
              <p className="text-3xl font-bold text-purple-600">
                {Math.round((testHistory.reduce((sum, t) => sum + t.score, 0) / testHistory.reduce((sum, t) => sum + t.total, 0)) * 100) || 0}%
              </p>
              <p className="text-gray-600 text-sm">Overall Accuracy</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">
                {testHistory.length > 0 ? Math.round(testHistory.reduce((sum, t) => sum + t.score, 0) / testHistory.length) : 0}
              </p>
              <p className="text-gray-600 text-sm">Avg Per Test</p>
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
