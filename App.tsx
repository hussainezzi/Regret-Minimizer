
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { Decision, DecisionOption, AppStep, ProCon } from './types';
import { calculateRegretScores } from './logic/lossAversionEngine';

// Components
import StepHeader from './components/StepHeader';
import StartScreen from './components/StartScreen';
import DefineOptionsScreen from './components/DefineOptionsScreen';
import InputDetailsScreen from './components/InputDetailsScreen';
import ResultsScreen from './components/ResultsScreen';
import HistoryScreen from './components/HistoryScreen';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.START);
  const [decision, setDecision] = useState<Decision>({
    id: uuidv4(),
    title: '',
    options: [
      { id: uuidv4(), name: '', pros: [], cons: [] },
      { id: uuidv4(), name: '', pros: [], cons: [] }
    ],
    timestamp: Date.now(),
    lastFactorUsed: 2
  });
  const [factor, setFactor] = useState<number>(2);
  const [history, setHistory] = useState<Decision[]>([]);

  // Initialize
  useEffect(() => {
    const savedHistory = localStorage.getItem('decision_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save to history helper
  const saveToHistory = useCallback((currentDecision: Decision) => {
    const newHistory = [currentDecision, ...history.filter(d => d.id !== currentDecision.id)].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem('decision_history', JSON.stringify(newHistory));
  }, [history]);

  // Handlers
  const handleStart = (title: string) => {
    setDecision(prev => ({ ...prev, title }));
    setStep(AppStep.DEFINE_OPTIONS);
  };

  const handleSetOptions = (options: DecisionOption[]) => {
    setDecision(prev => ({ ...prev, options }));
    setStep(AppStep.INPUT_DETAILS);
  };

  const handleUpdateOption = (optionId: string, pros: ProCon[], cons: ProCon[]) => {
    setDecision(prev => ({
      ...prev,
      options: prev.options.map(opt => opt.id === optionId ? { ...opt, pros, cons } : opt)
    }));
  };

  const handleFinishDetails = () => {
    setStep(AppStep.RESULTS);
    saveToHistory({ ...decision, lastFactorUsed: factor });
  };

  const resetApp = () => {
    setDecision({
      id: uuidv4(),
      title: '',
      options: [
        { id: uuidv4(), name: '', pros: [], cons: [] },
        { id: uuidv4(), name: '', pros: [], cons: [] }
      ],
      timestamp: Date.now(),
      lastFactorUsed: 2
    });
    setFactor(2);
    setStep(AppStep.START);
  };

  const loadHistoryItem = (item: Decision) => {
    setDecision(item);
    setFactor(item.lastFactorUsed || 2);
    setStep(AppStep.RESULTS);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-teal-100">
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        <StepHeader 
          step={step} 
          onGoBack={() => {
            if (step === AppStep.DEFINE_OPTIONS) setStep(AppStep.START);
            if (step === AppStep.INPUT_DETAILS) setStep(AppStep.DEFINE_OPTIONS);
            if (step === AppStep.RESULTS) setStep(AppStep.INPUT_DETAILS);
            if (step === AppStep.HISTORY) setStep(AppStep.START);
          }}
          onShowHistory={() => setStep(AppStep.HISTORY)}
          onReset={resetApp}
        />

        <main className="mt-8">
          <AnimatePresence mode="wait">
            {step === AppStep.START && (
              <StartScreen key="start" onStart={handleStart} />
            )}
            
            {step === AppStep.DEFINE_OPTIONS && (
              <DefineOptionsScreen 
                key="define" 
                decision={decision} 
                onNext={handleSetOptions} 
              />
            )}

            {step === AppStep.INPUT_DETAILS && (
              <InputDetailsScreen 
                key="details" 
                decision={decision} 
                onUpdateOption={handleUpdateOption}
                onFinish={handleFinishDetails}
              />
            )}

            {step === AppStep.RESULTS && (
              <ResultsScreen 
                key="results" 
                decision={decision} 
                factor={factor} 
                setFactor={setFactor}
                onReset={resetApp}
              />
            )}

            {step === AppStep.HISTORY && (
              <HistoryScreen 
                key="history" 
                history={history} 
                onLoad={loadHistoryItem}
                onClose={() => setStep(AppStep.START)}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
      
      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>Built on the principles of Daniel Kahneman's Loss Aversion</p>
      </footer>
    </div>
  );
};

export default App;
