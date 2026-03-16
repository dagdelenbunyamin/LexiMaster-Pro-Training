'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import VocabularyList from '@/components/VocabularyList';
import VocabularyGame from '@/components/VocabularyGame';
import { BookOpen, Gamepad2, LayoutDashboard, GraduationCap } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'learn' | 'game'>('learn');
  const [isGameActive, setIsGameActive] = useState(false);

  const showImmersiveGame = activeTab === 'game' && isGameActive;

  return (
    <main className={`min-h-screen pb-20 transition-colors duration-500 ${showImmersiveGame ? 'bg-white' : 'bg-slate-50/50'}`}>
      {/* Header - Hidden in immersive game mode */}
      {!showImmersiveGame && (
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-900 rounded-lg md:rounded-xl flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 leading-none">LexiMaster</h1>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Pro Training</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-full">
              <button
                onClick={() => setActiveTab('learn')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'learn' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Learn
              </button>
              <button
                onClick={() => setActiveTab('game')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'game' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Play Game
              </button>
            </nav>

            <div className="flex items-center gap-3 md:gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</p>
                <p className="text-sm font-bold text-slate-900">40 Words</p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs md:text-sm border-2 border-white shadow-sm">
                JD
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Hero Section - Hidden in immersive game mode or when in learn tab on mobile */}
      {!showImmersiveGame && (
        <section className={`py-6 md:py-20 px-4 overflow-hidden ${activeTab === 'learn' ? 'hidden md:block' : ''}`}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center lg:text-left"
              >
                <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 md:mb-6">
                  Master Environmental English
                </span>
                <h2 className="text-3xl md:text-7xl font-light tracking-tight text-slate-900 mb-4 md:mb-6 leading-[1.1]">
                  Elevate your <span className="font-semibold italic">professional</span> vocabulary.
                </h2>
                <p className="text-sm md:text-lg text-slate-500 max-w-lg mx-auto lg:mx-0 mb-8 md:mb-10 leading-relaxed">
                  Specialized training for environmental issues, economy, and artificial intelligence. 
                  Designed for high-performance learning on any device.
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 md:gap-4">
                  <button 
                    onClick={() => setActiveTab('learn')}
                    className="px-6 md:px-8 py-3 md:py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 group"
                  >
                    <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" /> Start Learning
                  </button>
                  <button 
                    onClick={() => setActiveTab('game')}
                    className="px-6 md:px-8 py-3 md:py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Gamepad2 className="w-5 h-5" /> Play Quiz
                  </button>
                </div>

                {/* Word of the Day - Mobile/Desktop */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 md:mt-12 p-4 md:p-6 bg-white rounded-3xl border border-slate-100 shadow-sm inline-flex items-center gap-4 text-left max-w-xs md:max-w-sm mx-auto lg:mx-0"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5 md:mb-1">Word of the Day</span>
                    <div className="font-bold text-slate-900 text-sm md:text-base">Sustainability</div>
                    <div className="text-[10px] md:text-xs text-slate-500 italic">Nachhaltigkeit</div>
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="hidden lg:grid grid-cols-2 gap-4"
              >
                <div className="space-y-4">
                  <div className="p-8 bg-white rounded-[2rem] border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                      <LayoutDashboard className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Structured</h3>
                    <p className="text-slate-500 text-sm">Organized by professional themes and relevance.</p>
                  </div>
                  <div className="p-8 bg-slate-900 text-white rounded-[2rem] shadow-xl shadow-slate-900/20">
                    <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6">
                      <Gamepad2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Interactive</h3>
                    <p className="text-white/60 text-sm">Gamified experience to boost retention rates.</p>
                  </div>
                </div>
                <div className="space-y-4 pt-12">
                  <div className="p-8 bg-emerald-500 text-white rounded-[2rem] shadow-xl shadow-emerald-500/20">
                    <div className="w-12 h-12 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-6">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Comprehensive</h3>
                    <p className="text-white/80 text-sm">Includes synonyms and context for every term.</p>
                  </div>
                  <div className="p-8 bg-white rounded-[2rem] border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Professional</h3>
                    <p className="text-slate-500 text-sm">Focused on high-level business and tech terms.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content Area */}
      <section className={`px-4 ${showImmersiveGame ? 'py-4 md:py-12' : 'py-8 md:py-12'} transition-all duration-500`}>
        <div className="max-w-4xl mx-auto">
          {!showImmersiveGame && (
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900">
                {activeTab === 'learn' ? 'Vocabulary Library' : 'Knowledge Challenge'}
              </h3>
              <div className="flex gap-2 md:hidden">
                <button
                  onClick={() => setActiveTab('learn')}
                  className={`p-2 rounded-lg transition-all ${activeTab === 'learn' ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}
                >
                  <BookOpen className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setActiveTab('game')}
                  className={`p-2 rounded-lg transition-all ${activeTab === 'game' ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 border border-slate-200'}`}
                >
                  <Gamepad2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'learn' ? (
              <VocabularyList />
            ) : (
              <VocabularyGame 
                onGameStatusChange={setIsGameActive} 
                onBackToMenu={() => {
                  setActiveTab('learn');
                  setIsGameActive(false);
                }}
              />
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      {!showImmersiveGame && (
        <footer className="mt-12 md:mt-20 py-12 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center text-white text-[10px] font-bold">LM</div>
              <span className="font-bold text-slate-900">LexiMaster</span>
            </div>
            <div className="space-y-1 mb-6">
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">ITA231</p>
              <p className="text-slate-400 text-xs uppercase tracking-widest">Fach: Englisch</p>
            </div>
            <p className="text-slate-400 text-[10px] uppercase tracking-tighter">© 2026 LexiMaster Professional Training. All rights reserved.</p>
          </div>
        </footer>
      )}

      {/* Mobile Navigation Bar */}
      {!showImmersiveGame && (
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-slate-900/95 backdrop-blur-lg text-white rounded-3xl p-2 flex items-center justify-around shadow-2xl z-50 border border-white/10">
          <button 
            onClick={() => setActiveTab('learn')}
            className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl transition-all ${activeTab === 'learn' ? 'bg-white/10 text-white' : 'text-slate-400'}`}
          >
            <BookOpen className={`w-5 h-5 ${activeTab === 'learn' ? 'scale-110' : ''} transition-transform`} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Library</span>
          </button>
          <div className="w-px h-8 bg-white/10" />
          <button 
            onClick={() => setActiveTab('game')}
            className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl transition-all ${activeTab === 'game' ? 'bg-white/10 text-white' : 'text-slate-400'}`}
          >
            <Gamepad2 className={`w-5 h-5 ${activeTab === 'game' ? 'scale-110' : ''} transition-transform`} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Challenge</span>
          </button>
        </div>
      )}
    </main>
  );
}

