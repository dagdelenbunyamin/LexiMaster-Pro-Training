'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { vocabularyData, VocabularyItem } from '@/lib/vocabulary';
import { Check, X, RefreshCw, Trophy, ArrowRight, ArrowLeft } from 'lucide-react';

interface VocabularyGameProps {
  onGameStatusChange?: (isActive: boolean) => void;
  onBackToMenu?: () => void;
}

export default function VocabularyGame({ onGameStatusChange, onBackToMenu }: VocabularyGameProps) {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [shuffledData, setShuffledData] = useState<VocabularyItem[]>([]);
  const [gameOver, setGameOver] = useState(false);

  const initGame = () => {
    const shuffled = [...vocabularyData].sort(() => Math.random() - 0.5);
    setShuffledData(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setGameStarted(true);
    setGameOver(false);
    generateOptions(shuffled[0], shuffled);
    onGameStatusChange?.(true);
  };

  const generateOptions = (current: VocabularyItem, data: VocabularyItem[]) => {
    const others = data.filter(item => item.english !== current.english);
    const randomOthers = others.sort(() => Math.random() - 0.5).slice(0, 3);
    const allOptions = [...randomOthers.map(o => o.german), current.german].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  const handleOptionClick = (option: string) => {
    if (selectedOption) return;
    
    setSelectedOption(option);
    const correct = option === shuffledData[currentIndex].german;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);

    setTimeout(() => {
      if (currentIndex < shuffledData.length - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        generateOptions(shuffledData[nextIndex], shuffledData);
      } else {
        setGameOver(true);
      }
    }, 1000);
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-white rounded-3xl shadow-sm border border-slate-200">
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
          <Trophy className="w-8 h-8 text-emerald-500" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-center">Ready for the Challenge?</h2>
        <p className="text-slate-500 mb-8 text-center max-w-sm text-sm md:text-base">
          Test your knowledge of professional environmental and technical terms.
        </p>
        <div className="flex flex-col w-full gap-3">
          <button
            onClick={initGame}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
          >
            Start Quiz <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onBackToMenu}
            className="w-full py-4 bg-white text-slate-500 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            Back to Library
          </button>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-8 md:p-12 bg-white rounded-3xl shadow-sm border border-slate-200 text-center"
      >
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
          <Trophy className="w-10 h-10" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Excellent Work!</h2>
        <p className="text-slate-500 mb-8">
          You achieved a score of <span className="font-bold text-slate-900">{score}</span> / <span className="font-bold text-slate-900">{shuffledData.length}</span>
        </p>
        <div className="flex flex-col w-full gap-3">
          <button
            onClick={initGame}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
          >
            Restart Quiz <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setGameStarted(false);
              onGameStatusChange?.(false);
              onBackToMenu?.();
            }}
            className="w-full py-4 bg-white text-slate-500 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            Exit to Menu
          </button>
        </div>
      </motion.div>
    );
  }

  const currentWord = shuffledData[currentIndex];

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <div className="mb-6 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between md:justify-start gap-4 mb-4 md:mb-2">
            <button 
              onClick={() => {
                setGameStarted(false);
                onGameStatusChange?.(false);
              }}
              className="p-2 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest rounded">
                Pro Level
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {currentIndex + 1} / {shuffledData.length}
              </span>
            </div>
          </div>
          <h2 className="text-2xl md:text-5xl font-light text-slate-900 leading-tight">
            {currentWord.english}
          </h2>
        </div>
        <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 self-end md:self-auto">
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block leading-none mb-1">Score</span>
            <div className="text-xl font-mono font-bold text-emerald-600 leading-none">{score}</div>
          </div>
          <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center">
            <Trophy className="w-4 h-4 text-emerald-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:gap-4">
        <AnimatePresence mode="wait">
          {options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrectOption = option === currentWord.german;
            
            let bgColor = "bg-white";
            let borderColor = "border-slate-200";
            let textColor = "text-slate-700";
            let shadow = "shadow-sm";

            if (selectedOption) {
              if (isCorrectOption) {
                bgColor = "bg-emerald-500 text-white";
                borderColor = "border-emerald-500";
                textColor = "text-white";
                shadow = "shadow-lg shadow-emerald-500/20";
              } else if (isSelected && !isCorrectOption) {
                bgColor = "bg-rose-500 text-white";
                borderColor = "border-rose-500";
                textColor = "text-white";
                shadow = "shadow-lg shadow-rose-500/20";
              } else {
                bgColor = "bg-slate-50 opacity-40";
                borderColor = "border-slate-100";
              }
            }

            return (
              <motion.button
                key={option + currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleOptionClick(option)}
                disabled={!!selectedOption}
                className={`group relative p-4 md:p-6 text-left rounded-2xl border-2 transition-all duration-200 flex justify-between items-center ${bgColor} ${borderColor} ${textColor} ${shadow} ${!selectedOption ? 'hover:border-slate-900 active:scale-[0.98]' : ''}`}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <span className={`w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center text-[10px] md:text-xs font-bold border ${selectedOption ? 'border-white/20 bg-white/10' : 'border-slate-100 bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900'}`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-base md:text-lg font-medium">{option}</span>
                </div>
                {selectedOption && isCorrectOption && <Check className="w-5 h-5" />}
                {selectedOption && isSelected && !isCorrectOption && <X className="w-5 h-5" />}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-8 md:mt-12">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
          <span>Progress</span>
          <span>{Math.round(((currentIndex + 1) / shuffledData.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-slate-900"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / shuffledData.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}
