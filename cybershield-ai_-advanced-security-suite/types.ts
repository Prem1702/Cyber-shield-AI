
export enum ModuleType {
  DASHBOARD = 'DASHBOARD',
  PHISHING = 'PHISHING',
  PASSWORD = 'PASSWORD',
  PRIVACY = 'PRIVACY',
  BLOCKCHAIN = 'BLOCKCHAIN',
  SPAM = 'SPAM',
  DOCS = 'DOCS'
}

export interface AnalysisResult {
  score: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  explanation: string;
  recommendations: string[];
}

export interface AppState {
  totalScans: number;
  threatsDetected: number;
  avgSecurityScore: number;
  recentActivity: string[];
}
