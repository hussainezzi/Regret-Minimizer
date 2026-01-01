
import React from 'react';
import { motion } from 'framer-motion';
import { Decision } from '../types';
import { calculateRegretScores, getRankingDescription } from '../logic/lossAversionEngine';

interface ResultsScreenProps {
  decision: Decision;
  factor: number;
  setFactor: (f: number) => void;
  onReset: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ decision, factor, setFactor, onReset }) => {
  const rankedOptions = calculateRegretScores(decision.options, factor);
  const winner = rankedOptions[0];
  const runnersUp = rankedOptions.slice(1);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      {/* Top Banner */}
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-teal-500/10 border border-teal-50 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
        </div>
        
        <div className="relative z-10">
          <span className="inline-block px-4 py-1.5 bg-teal-500 text-white text-xs font-black rounded-full uppercase tracking-widest mb-4 shadow-sm">
            Top Recommendation
          </span>
          <h2 className="text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
            {winner.name}
          </h2>
          <p className="mt-4 text-slate-500 text-lg leading-relaxed max-w-lg">
            Based on what you told me, <span className="text-slate-800 font-semibold">{winner.name}</span> has the fewest big headaches down the line. It offers the most peace of mind.
          </p>
          
          <div className="mt-8 p-4 bg-teal-50 rounded-2xl inline-flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <p className="text-sm text-teal-800 font-medium">
                {getRankingDescription(winner.regretScore || 0)}
             </p>
          </div>
        </div>
      </div>

      {/* Regret Sensitivity Control */}
      <div className="bg-slate-800 p-6 rounded-3xl text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-lg">Tweak My Regret Sensitivity</h4>
            <p className="text-slate-400 text-sm">How much does a potential regret bother you compared to a happy outcome?</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Chill</span>
            <input 
              type="range"
              min="1"
              max="5"
              step="0.5"
              value={factor}
              onChange={(e) => setFactor(parseFloat(e.target.value))}
              className="w-32 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
            />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Wary</span>
            <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center font-bold text-teal-400 text-sm">
              {factor}x
            </div>
          </div>
        </div>
      </div>

      {/* Runner Ups */}
      {runnersUp.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {runnersUp.map((option) => (
            <div key={option.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-slate-700 mb-3">{option.name}</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-emerald-600 uppercase mb-2 tracking-wide">Upsides</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {option.pros.length > 0 ? option.pros.map(p => <li key={p.id}>• {p.text}</li>) : <li className="text-slate-300 italic">None listed</li>}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-rose-500 uppercase mb-2 tracking-wide">Future Headaches</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {option.cons.length > 0 ? option.cons.map(c => <li key={c.id}>• {c.text}</li>) : <li className="text-slate-300 italic">None listed</li>}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">Regret Impact</span>
                <span className="text-sm font-bold text-slate-700">{option.regretScore} units</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center pt-8">
        <button 
          onClick={onReset}
          className="px-12 py-4 border-2 border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all active:scale-95"
        >
          Start a New Decision
        </button>
      </div>
    </motion.div>
  );
};

export default ResultsScreen;
