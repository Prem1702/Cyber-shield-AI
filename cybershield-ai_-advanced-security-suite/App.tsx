
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import ModulePhishing from './components/ModulePhishing';
import ModulePassword from './components/ModulePassword';
import ModulePrivacy from './components/ModulePrivacy';
import ModuleBlockchain from './components/ModuleBlockchain';
import ModuleSpam from './components/ModuleSpam';
import ModuleDocs from './components/ModuleDocs';
import { ModuleType, AppState } from './types';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.DASHBOARD);
  const [appState, setAppState] = useState<AppState>({
    totalScans: 0,
    threatsDetected: 0,
    avgSecurityScore: 0,
    recentActivity: []
  });

  const recordScan = (score: number, riskLevel: string, type: string) => {
    setAppState(prev => ({
      ...prev,
      totalScans: prev.totalScans + 1,
      threatsDetected: riskLevel === 'HIGH' ? prev.threatsDetected + 1 : prev.threatsDetected,
      avgSecurityScore: prev.totalScans === 0 ? score : Math.round((prev.avgSecurityScore + score) / 2),
      recentActivity: [`Scan performed: ${type} (Risk: ${riskLevel})`, ...prev.recentActivity].slice(0, 5)
    }));
  };

  const renderModule = () => {
    switch (activeModule) {
      case ModuleType.DASHBOARD:
        return <DashboardOverview appState={appState} />;
      case ModuleType.PHISHING:
        return <ModulePhishing onComplete={(s, r) => recordScan(s, r, 'Phishing')} />;
      case ModuleType.PASSWORD:
        return <ModulePassword onComplete={(s, r) => recordScan(s, r, 'Password')} />;
      case ModuleType.PRIVACY:
        return <ModulePrivacy onComplete={(s, r) => recordScan(s, r, 'Privacy')} />;
      case ModuleType.BLOCKCHAIN:
        return <ModuleBlockchain onComplete={(s, r) => recordScan(s, r, 'Blockchain')} />;
      case ModuleType.SPAM:
        return <ModuleSpam onComplete={(s, r) => recordScan(s, r, 'Spam Detection')} />;
      case ModuleType.DOCS:
        return <ModuleDocs />;
      default:
        return <DashboardOverview appState={appState} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      
      <main className="flex-1 ml-64 p-10 pt-8 pb-20 relative overflow-y-auto h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400 glow-text-cyan">
                Encryption Status: AES-256 Enabled
              </h1>
            </div>
            <div className="flex gap-4">
              <button className="glass px-4 py-2 rounded-xl text-xs font-bold border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 transition-all flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                Node: Mumbai-01
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-green-500 p-[1px]">
                 <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold">SH</div>
              </div>
            </div>
          </div>

          {renderModule()}
        </div>

        {/* Dynamic Background Effects */}
        <div className="fixed top-0 right-0 -z-10 w-[600px] h-[600px] bg-cyan-500/5 blur-[140px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="fixed bottom-0 left-64 -z-10 w-[500px] h-[500px] bg-green-500/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
      </main>
    </div>
  );
};

export default App;
