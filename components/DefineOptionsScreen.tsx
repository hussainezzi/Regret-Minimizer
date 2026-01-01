
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { Decision, DecisionOption } from '../types';

interface DefineOptionsScreenProps {
  decision: Decision;
  onNext: (options: DecisionOption[]) => void;
}

const DefineOptionsScreen: React.FC<DefineOptionsScreenProps> = ({ decision, onNext }) => {
  const [options, setOptions] = useState<DecisionOption[]>(decision.options);

  const addOption = () => {
    setOptions([...options, { id: uuidv4(), name: '', pros: [], cons: [] }]);
  };

  const removeOption = (id: string) => {
    if (options.length > 2) {
      setOptions(options.filter(o => o.id !== id));
    }
  };

  const updateOptionName = (id: string, name: string) => {
    setOptions(options.map(o => o.id === id ? { ...o, name } : o));
  };

  const handleNext = () => {
    const validOptions = options.filter(o => o.name.trim() !== '');
    if (validOptions.length >= 2) {
      onNext(validOptions);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100"
    >
      <h2 className="text-2xl font-bold text-slate-800 mb-2">What are your choices?</h2>
      <p className="text-slate-500 mb-8">List the options you're torn between.</p>

      <div className="space-y-4">
        {options.map((option, idx) => (
          <div key={option.id} className="flex gap-3 items-center">
            <div className="flex-grow">
              <input 
                type="text"
                autoFocus={idx === options.length - 1}
                value={option.name}
                onChange={(e) => updateOptionName(option.id, e.target.value)}
                placeholder={`Option ${idx + 1}`}
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
              />
            </div>
            {options.length > 2 && (
              <button 
                onClick={() => removeOption(option.id)}
                className="p-3.5 text-slate-300 hover:text-red-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            )}
          </div>
        ))}
      </div>

      <button 
        onClick={addOption}
        className="mt-6 flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors text-sm px-2"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
        Add another option
      </button>

      <div className="mt-12 flex justify-end">
        <button 
          onClick={handleNext}
          disabled={options.filter(o => o.name.trim() !== '').length < 2}
          className="px-10 py-4 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg transition-all"
        >
          Define the Trade-offs
        </button>
      </div>
    </motion.div>
  );
};

export default DefineOptionsScreen;
