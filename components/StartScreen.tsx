
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface StartScreenProps {
  onStart: (title: string) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onStart(title.trim());
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100"
    >
      <div className="max-w-md">
        <h2 className="text-3xl font-bold text-slate-800 leading-tight">
          What are you choosing between?
        </h2>
        <p className="mt-4 text-slate-500 text-lg leading-relaxed">
          Decisions are tough because we fear making the "wrong" one. Let's find the choice that feels the lightest in the long run.
        </p>

        <form onSubmit={handleSubmit} className="mt-10">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            The decision you're facing
          </label>
          <input 
            type="text" 
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Picking a new laptop"
            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-lg focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-slate-300"
          />
          <button 
            type="submit"
            disabled={!title.trim()}
            className="mt-6 w-full py-4 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 disabled:hover:bg-teal-500 text-white font-bold rounded-2xl shadow-lg shadow-teal-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Start My Decision
          </button>
        </form>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-slate-100">
        <div className="flex gap-4">
          <div className="text-teal-500 flex-shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 text-sm">Focus on Feelings</h4>
            <p className="text-slate-500 text-xs mt-1">We look at potential regrets, not just abstract numbers or features.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-teal-500 flex-shrink-0">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 text-sm">Long-term View</h4>
            <p className="text-slate-500 text-xs mt-1">Our engine helps you predict which choice you'll be glad you made next year.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StartScreen;
