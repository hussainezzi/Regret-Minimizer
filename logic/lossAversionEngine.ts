
import { DecisionOption } from '../types';

/**
 * The "Regret Minimizer" Engine
 * Evaluates choices based on a "Regret Score."
 * 
 * Logic:
 * Each "Regret" (con) contributes a higher penalty than each "Happy Outcome" (pro) contributes a bonus.
 * Loss Aversion Factor (default 2x): 1 con = -2 points, 1 pro = +1 point.
 */
export const calculateRegretScores = (
  options: DecisionOption[],
  lossAversionFactor: number = 2
): DecisionOption[] => {
  return options
    .map((option) => {
      // Regret Score formula: (Potential Regrets * Factor) - (Happy Outcomes)
      // Lower score = less predicted regret.
      const regretValue = (option.cons.length * lossAversionFactor) - option.pros.length;
      return {
        ...option,
        regretScore: regretValue,
      };
    })
    .sort((a, b) => (a.regretScore || 0) - (b.regretScore || 0));
};

export const getRankingDescription = (score: number): string => {
  if (score <= 0) return "A very safe path forward.";
  if (score <= 3) return "A solid choice with manageable tradeoffs.";
  return "This path might feel quite heavy later on.";
};
