
import React from 'react';
import { AppStep } from '../types';

interface StepHeaderProps {
  step: AppStep;
  onGoBack: () => void;
  onShowHistory: () => void;
  onReset: () => void;
}

const StepHeader: React.FC<StepHeaderProps> = ({ step, onGoBack, onShowHistory, onReset }) => {
  const isStart = step === AppStep.START;
  const isHistory = step === AppStep.HISTORY;

  return (
    <header className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={onReset}
        >
          <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">Regret Minimizer</h1>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Better choices, fewer regrets</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          {!isStart && !isHistory && (
            <button 
              onClick={onGoBack}
              className="text-slate-500 hover:text-slate-800 transition-colors px-3 py-1 text-sm font-medium"
            >
              Back
            </button>
          )}
          {isStart && (
            <button 
              onClick={onShowHistory}
              className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
            >
              Past Decisions
            </button>
          )}
        </div>
      </div>

      {!isHistory && (
        <div className="flex gap-2 mt-4 overflow-hidden">
          {[AppStep.START, AppStep.DEFINE_OPTIONS, AppStep.INPUT_DETAILS, AppStep.RESULTS].map((s, idx) => (
            <div 
              key={s} 
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                Object.values(AppStep).indexOf(step) >= idx ? 'bg-teal-400' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      )}
    </header>
  );
};

export default StepHeader;
