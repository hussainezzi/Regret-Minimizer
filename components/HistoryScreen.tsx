
import React from 'react';
import { motion } from 'framer-motion';
import { Decision } from '../types';

interface HistoryScreenProps {
  history: Decision[];
  onLoad: (item: Decision) => void;
  onClose: () => void;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ history, onLoad, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Your Past Decisions</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      {history.length === 0 ? (
        <div className="py-20 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <p className="text-slate-400">No decisions saved yet. Start one now!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <button 
              key={item.id}
              onClick={() => onLoad(item)}
              className="w-full text-left p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-teal-200 hover:bg-white transition-all group flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold text-slate-800 group-hover:text-teal-600 transition-colors">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  {new Date(item.timestamp).toLocaleDateString()} • {item.options.length} options considered
                </p>
              </div>
              <svg className="w-5 h-5 text-slate-300 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default HistoryScreen;
