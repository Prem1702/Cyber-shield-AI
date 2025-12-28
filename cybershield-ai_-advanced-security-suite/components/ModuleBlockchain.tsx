
import React, { useState } from 'react';

interface SharedDoc {
  id: string;
  name: string;
  hash: string;
  timestamp: string;
  status: 'VERIFIED' | 'EXPIRED';
}

interface Props {
  onComplete: (score: number, risk: string) => void;
}

const ModuleBlockchain: React.FC<Props> = ({ onComplete }) => {
  const [docs, setDocs] = useState<SharedDoc[]>([
    { id: '1', name: 'Contract_V1.pdf', hash: '8f2b...9a1c', timestamp: '2023-10-24 14:22', status: 'VERIFIED' },
  ]);
  const [loading, setLoading] = useState(false);

  const addDoc = () => {
    setLoading(true);
    setTimeout(() => {
      const newDoc: SharedDoc = {
        id: Math.random().toString(36).substr(2, 9),
        name: `Ledger_Entry_${Math.floor(Math.random() * 900) + 100}.bin`,
        hash: Math.random().toString(16).substr(2, 10) + '...',
        timestamp: new Date().toLocaleString(),
        status: 'VERIFIED'
      };
      setDocs([newDoc, ...docs]);
      setLoading(false);
      onComplete(100, 'LOW');
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto animate-in slide-in-from-left-8 duration-500">
      <header className="mb-10 text-center">
        <div className="w-20 h-20 bg-orange-500/10 text-orange-400 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-4 border border-orange-500/30 shadow-[0_0_20px_rgba(249,115,22,0.2)]">
          ⛓️
        </div>
        <h2 className="text-4xl font-bold">Immutable Document Ledger</h2>
        <p className="text-slate-400 max-w-lg mx-auto mt-2 text-lg">
          Cryptographic proof-of-existence for your sensitive data assets.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 glass p-8 rounded-3xl border border-white/10 space-y-6 h-fit">
          <h3 className="text-xl font-bold text-white">Secure Intake</h3>
          <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center text-center hover:border-orange-500/40 transition-all cursor-pointer bg-slate-900/50 group relative overflow-hidden">
             <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">📁</span>
             <p className="text-sm text-slate-500 font-medium">Drop binary asset to sign</p>
          </div>
          <button 
            onClick={addDoc}
            disabled={loading}
            className="w-full py-5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-orange-500/20 uppercase tracking-widest text-xs"
          >
            {loading ? 'Mining Transaction...' : 'Anchor to Ledger'}
          </button>
        </div>

        <div className="lg:col-span-2 glass rounded-3xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
            <h3 className="text-xl font-bold text-white">Chain Activity</h3>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 font-bold uppercase tracking-widest">Node synchronized</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] text-slate-500 uppercase tracking-widest border-b border-white/5 bg-slate-900/20">
                  <th className="px-6 py-5">Entry Asset</th>
                  <th className="px-6 py-5">Merkle Root Hash</th>
                  <th className="px-6 py-5">Timestamp</th>
                  <th className="px-6 py-5">Status</th>
                </tr>
              </thead>
              <tbody>
                {docs.map((doc) => (
                  <tr key={doc.id} className="border-b border-white/5 hover:bg-white/5 transition-all group">
                    <td className="px-6 py-6 font-medium text-slate-200">{doc.name}</td>
                    <td className="px-6 py-6 font-mono text-xs text-orange-400/80 tracking-tighter">{doc.hash}</td>
                    <td className="px-6 py-6 text-sm text-slate-500">{doc.timestamp}</td>
                    <td className="px-6 py-6">
                      <div className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest inline-block ${doc.status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'}`}>
                        {doc.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleBlockchain;
