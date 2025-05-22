'use client';

import { create } from 'zustand';

interface Magic8BallStore {
  question: string;
  isShaking: boolean;
  answer: string;
  setQuestion: (question: string) => void;
  shake: () => void;
}

const ANSWERS = [
  // Positive answers
  "It is certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes definitely",
  "You may rely on it",
  // Neutral answers
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  // Negative answers
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful"
];

const getRandomAnswer = () => {
  return ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
};

export const useMagic8BallStore = create<Magic8BallStore>((set, get) => ({
  question: '',
  isShaking: false,
  answer: 'Ask a question...',
  setQuestion: (question) => set({ question }),
  shake: () => {
    const { isShaking, question } = get();
    
    if (isShaking || !question.trim()) return;
    
    // Start shaking
    set({ isShaking: true });
    
    // Get new answer immediately but don't show it until shake animation completes
    const newAnswer = getRandomAnswer();
    console.log('New answer:', newAnswer);
    
    setTimeout(() => {
      set({
        isShaking: false,
        answer: newAnswer,
      });
    }, 1500);
  }
})); 