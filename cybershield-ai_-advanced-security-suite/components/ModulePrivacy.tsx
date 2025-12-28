
import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface Props {
  onComplete: (score: number, risk: string) => void;
}

const ModulePrivacy: React.FC<Props> = ({ onComplete }) => {
  const [appName, setAppName] = useState('');
  const [isScanned, setIsScanned] = useState(false);

  const mockData = [
    { subject: 'Tracking', A: 120, fullMark: 150 },
    { subject: 'Network', A: 98, fullMark: 150 },
    { subject: 'Location', A: 86, fullMark: 150 },
    { subject: 'Audio', A: 99, fullMark: 150 },
    { subject: 'Social', A: 85, fullMark: 150 },
    { subject: 'Encryption', A: 65, fullMark: 150 },
  ];

  const handleScan = () => {
    setIsScanned(true);
    onComplete(64, 'MEDIUM');
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-700">
      <header className="mb-10 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-purple-500/10 text-purple-400 rounded-3xl flex items-center justify-center text-4xl mb-4 border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          📱
        </div>
        <h2 className="text-4xl font-bold">App Privacy Scorer</h2>
        <p className="text-slate-400 max-w-lg mt-2 text-lg">
          Decompile permission manifests to identify data extraction patterns.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 glass p-10 rounded-3xl border border-white/10 h-fit">
          <h3 className="text-xl font-bold mb-8 text-white">Manifest Analysis</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">Target App Identifier</label>
              <input 
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-purple-500/50 transition-all placeholder:text-slate-700" 
                placeholder="e.g. com.facebook.orca or App URL"
              />
            </div>
            <button 
              onClick={handleScan}
              className="w-full py-5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-purple-500/20 uppercase tracking-widest text-xs"
            >
              Analyze Data Exposure
            </button>
          </div>

          <div className="mt-12 space-y-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Flagged Permissions</h4>
            <div className="p-5 bg-rose-500/5 border border-rose-500/10 rounded-2xl flex items-center gap-5 group">
              <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">📍</span>
              <div>
                <p className="font-bold text-rose-400">ACCESS_FINE_LOCATION</p>
                <p className="text-sm text-slate-500">Persistent background geolocation harvesting.</p>
              </div>
            </div>
            <div className="p-5 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex items-center gap-5 group">
              <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">📸</span>
              <div>
                <p className="font-bold text-amber-400">READ_EXTERNAL_STORAGE</p>
                <p className="text-sm text-slate-500">Potential harvesting of private gallery assets.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 glass p-10 rounded-3xl border border-white/10 flex flex-col items-center">
          <h3 className="text-xl font-bold mb-10 text-white uppercase tracking-widest text-sm">Exposure Heatmap</h3>
          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mockData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 'bold' }} />
                <Radar
                  name="Risk Profile"
                  dataKey="A"
                  stroke="#a855f7"
                  fill="#a855f7"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 p-8 bg-white/5 rounded-3xl w-full text-center border border-white/5">
             <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Aggregate Privacy Grade</p>
             <p className="text-5xl font-extrabold text-purple-400 glow-text-purple">B-</p>
             <p className="mt-4 text-slate-400 text-sm italic">"High tracking vector overlap detected."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModulePrivacy;
