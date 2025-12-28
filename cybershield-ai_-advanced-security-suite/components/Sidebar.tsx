
import React from 'react';
import { ModuleType } from '../types';

interface SidebarProps {
  activeModule: ModuleType;
  setActiveModule: (module: ModuleType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule }) => {
  const navItems = [
    { id: ModuleType.DASHBOARD, label: 'Overview', icon: '📊' },
    { id: ModuleType.PHISHING, label: 'Phishing Detection', icon: '🎣' },
    { id: ModuleType.PASSWORD, label: 'Password Lab', icon: '🔐' },
    { id: ModuleType.PRIVACY, label: 'Privacy Scorer', icon: '📱' },
    { id: ModuleType.BLOCKCHAIN, label: 'Secure Ledger', icon: '⛓️' },
    { id: ModuleType.SPAM, label: 'Spam Call AI', icon: '📞' },
    { id: ModuleType.DOCS, label: 'Project Info', icon: '📖' },
  ];

  return (
    <aside className="w-64 glass h-screen fixed left-0 top-0 flex flex-col p-6 z-50 border-r border-white/5">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-green-400 rounded-lg flex items-center justify-center text-xl shadow-[0_0_15px_rgba(34,211,238,0.3)]">🛡️</div>
        <h1 className="font-bold text-xl tracking-tight text-white">CyberShield <span className="text-cyan-400">AI</span></h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 border ${
              activeModule === item.id 
                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 glow-text-cyan' 
                : 'text-slate-400 border-transparent hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
          <p className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-widest">Network Shield</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
            <span className="text-xs text-slate-300 font-mono">ENCRYPTED_TUNNEL</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
