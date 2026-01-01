
export interface ProCon {
  id: string;
  text: string;
}

export interface DecisionOption {
  id: string;
  name: string;
  pros: ProCon[];
  cons: ProCon[];
  regretScore?: number;
}

export interface Decision {
  id: string;
  title: string;
  options: DecisionOption[];
  timestamp: number;
  lastFactorUsed: number;
}

export enum AppStep {
  START = 'START',
  DEFINE_OPTIONS = 'DEFINE_OPTIONS',
  INPUT_DETAILS = 'INPUT_DETAILS',
  RESULTS = 'RESULTS',
  HISTORY = 'HISTORY'
}
