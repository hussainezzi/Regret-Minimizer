
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { Decision, ProCon } from '../types';

interface InputDetailsScreenProps {
  decision: Decision;
  onUpdateOption: (id: string, pros: ProCon[], cons: ProCon[]) => void;
  onFinish: () => void;
}

const InputDetailsScreen: React.FC<InputDetailsScreenProps> = ({ decision, onUpdateOption, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentOption = decision.options[currentIndex];

  const [proInput, setProInput] = useState('');
  const [conInput, setConInput] = useState('');

  const addPro = () => {
    if (proInput.trim()) {
      onUpdateOption(currentOption.id, [...currentOption.pros, { id: uuidv4(), text: proInput.trim() }], currentOption.cons);
      setProInput('');
    }
  };

  const addCon = () => {
    if (conInput.trim()) {
      onUpdateOption(currentOption.id, currentOption.pros, [...currentOption.cons, { id: uuidv4(), text: conInput.trim() }]);
      setConInput('');
    }
  };

  const removePro = (id: string) => {
    onUpdateOption(currentOption.id, currentOption.pros.filter(p => p.id !== id), currentOption.cons);
  };

  const removeCon = (id: string) => {
    onUpdateOption(currentOption.id, currentOption.pros, currentOption.cons.filter(c => c.id !== id));
  };

  const isLast = currentIndex === decision.options.length - 1;

  const nextStep = () => {
    if (isLast) {
      onFinish();
    } else {
      setCurrentIndex(currentIndex + 1);
      setProInput('');
      setConInput('');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-slate-100"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-teal-600 text-sm font-bold tracking-wider uppercase">Step 2: Deep Dive</span>
          <h2 className="text-2xl font-bold text-slate-800 mt-1">Let's talk about <span className="text-teal-500 underline decoration-teal-200 underline-offset-4">{currentOption.name}</span></h2>
        </div>
        <div className="text-slate-300 font-bold text-xl">
          {currentIndex + 1} / {decision.options.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pros Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="font-bold text-slate-700">Happy Outcomes</h3>
          </div>
          <p className="text-xs text-slate-400 mb-3">Things you'd be happy about if you chose this.</p>
          
          <div className="flex gap-2 mb-4">
            <input 
              value={proInput}
              onChange={(e) => setProInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addPro()}
              placeholder="e.g., Saves money"
              className="flex-grow px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-emerald-400 outline-none transition-all"
            />
            <button onClick={addPro} className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </button>
          </div>

          <ul className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence>
              {currentOption.pros.map((pro) => (
                <motion.li 
                  key={pro.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex justify-between items-center bg-emerald-50/50 px-3 py-2 rounded-lg border border-emerald-100"
                >
                  <span className="text-sm text-slate-700">{pro.text}</span>
                  <button onClick={() => removePro(pro.id)} className="text-emerald-300 hover:text-emerald-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </section>

        {/* Cons Section */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="font-bold text-slate-700">Potential Regrets</h3>
          </div>
          <p className="text-xs text-slate-400 mb-3">Things you'd feel disappointed about later.</p>

          <div className="flex gap-2 mb-4">
            <input 
              value={conInput}
              onChange={(e) => setConInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCon()}
              placeholder="e.g., Short battery life"
              className="flex-grow px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:border-rose-400 outline-none transition-all"
            />
            <button onClick={addCon} className="bg-rose-500 text-white p-2 rounded-lg hover:bg-rose-600 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </button>
          </div>

          <ul className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence>
              {currentOption.cons.map((con) => (
                <motion.li 
                  key={con.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex justify-between items-center bg-rose-50/50 px-3 py-2 rounded-lg border border-rose-100"
                >
                  <span className="text-sm text-slate-700">{con.text}</span>
                  <button onClick={() => removeCon(con.id)} className="text-rose-300 hover:text-rose-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </section>
      </div>

      <div className="mt-12 flex justify-between items-center">
        <button 
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="px-6 py-3 text-slate-400 font-bold hover:text-slate-600 disabled:opacity-0 transition-all"
        >
          Previous Option
        </button>
        <button 
          onClick={nextStep}
          className="px-10 py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-2xl shadow-lg transition-all"
        >
          {isLast ? "Reveal My Best Choice" : "Next Choice"}
        </button>
      </div>
    </motion.div>
  );
};

export default InputDetailsScreen;
