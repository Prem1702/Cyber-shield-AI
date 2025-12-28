
import React from 'react';
import StatCard from './StatCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AppState } from '../types';

interface DashboardProps {
  appState: AppState;
}

const data = [
  { name: '00:00', load: 10 },
  { name: '04:00', load: 25 },
  { name: '08:00', load: 45 },
  { name: '12:00', load: 30 },
  { name: '16:00', load: 60 },
  { name: '20:00', load: 40 },
  { name: '23:59', load: 15 },
];

const DashboardOverview: React.FC<DashboardProps> = ({ appState }) => {
  const securityScore = appState.totalScans === 0 ? 0 : Math.max(20, 100 - (appState.threatsDetected * 15));

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <h2 className="text-4xl font-bold text-white tracking-tight">Security Command Center</h2>
        <p className="text-slate-400 mt-2 text-lg">System active. Monitoring {appState.totalScans} digital touchpoints.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Scans" value={appState.totalScans} trend="Live" icon="🔍" color="cyan" />
        <StatCard label="Threats Found" value={appState.threatsDetected} trend={appState.threatsDetected > 0 ? "Critical" : "Clear"} isPositive={appState.threatsDetected === 0} icon="⚠️" color="rose" />
        <StatCard label="System Integrity" value={`${securityScore}%`} trend="Optimal" icon="🛡️" color="emerald" />
        <StatCard label="Network Load" value="2.4ms" trend="Low" icon="⚡" color="cyan" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass p-8 rounded-3xl border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl -z-10"></div>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-cyan-400">Heuristic Engine Activity</h3>
            <span className="text-xs font-mono text-slate-500">REALTIME_TELEMETRY</span>
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#22d3ee50', borderRadius: '12px' }}
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Area type="monotone" dataKey="load" stroke="#22d3ee" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl border border-white/10 flex flex-col">
          <h3 className="text-xl font-bold mb-6 text-white">Live Threat Log</h3>
          <div className="flex-1 space-y-4">
            {appState.recentActivity.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 italic opacity-50">
                <span className="text-4xl mb-2">📡</span>
                <p>Waiting for data stream...</p>
              </div>
            ) : (
              appState.recentActivity.map((log, i) => (
                <div key={i} className="flex gap-3 text-sm animate-in slide-in-from-right-4">
                   <span className="text-cyan-400 font-mono">[{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]</span>
                   <span className="text-slate-300">{log}</span>
                </div>
              ))
            )}
          </div>
          <button className="mt-8 w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-cyan-500/20 uppercase tracking-widest text-xs">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
