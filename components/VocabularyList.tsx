'use client';

import React, { useState } from 'react';
import { vocabularyData } from '@/lib/vocabulary';
import { Search, Info } from 'lucide-react';

export default function VocabularyList() {
  const [search, setSearch] = useState('');

  const filtered = vocabularyData.filter(item => 
    item.english.toLowerCase().includes(search.toLowerCase()) ||
    item.german.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative sticky top-24 z-10 md:static">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search vocabulary..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all shadow-sm"
        />
      </div>

      <div className="space-y-3">
        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-3 gap-4 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400">English</div>
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400">German</div>
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Synonyms</div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {filtered.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all shadow-sm hover:shadow-md group relative overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center">
                <div>
                  <span className="md:hidden text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">English</span>
                  <div className="font-semibold text-lg md:text-base text-slate-900">{item.english}</div>
                </div>
                <div>
                  <span className="md:hidden text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">German</span>
                  <div className="text-slate-600 font-medium">{item.german}</div>
                </div>
                <div>
                  <span className="md:hidden text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">Synonyms</span>
                  <div className="text-slate-400 text-sm italic flex items-center gap-2">
                    {item.synonyms ? (
                      <>
                        <Info className="w-3 h-3" />
                        {item.synonyms}
                      </>
                    ) : <span className="opacity-30">—</span>}
                  </div>
                </div>
              </div>
              {/* Decorative accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-100 group-hover:bg-slate-900 transition-colors" />
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400">
              No words found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
