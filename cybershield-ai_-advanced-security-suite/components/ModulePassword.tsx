
import React, { useState, useEffect } from 'react';
import { checkPasswordBreachExplanation } from '../services/geminiService';

interface Props {
  onComplete: (score: number, risk: string) => void;
}

const ModulePassword: React.FC<Props> = ({ onComplete }) => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const calculateStrength = (p: string) => {
    let s = 0;
    if (p.length > 8) s += 25;
    if (/[A-Z]/.test(p)) s += 25;
    if (/[0-9]/.test(p)) s += 25;
    if (/[^A-Za-z0-9]/.test(p)) s += 25;
    return s;
  };

  useEffect(() => {
    setStrength(calculateStrength(password));
  }, [password]);

  const handleDeepAudit = async () => {
    if (!password) return;
    setLoading(true);
    const text = await checkPasswordBreachExplanation(password);
    setExplanation(text);
    const risk = strength >= 75 ? 'LOW' : strength >= 50 ? 'MEDIUM' : 'HIGH';
    onComplete(strength, risk);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-8 duration-500">
      <header className="mb-10 text-center">
        <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-4 border border-emerald-500/30 shadow-[0_0_20px_rgba(74,222,128,0.2)]">
          🔐
        </div>
        <h2 className="text-4xl font-bold">Password Entropy Lab</h2>
        <p className="text-slate-400 max-w-lg mx-auto mt-2 text-lg">
          Local-first strength analysis with AI-powered breach prediction.
        </p>
      </header>

      <div className="glass p-10 rounded-3xl border border-white/10 shadow-2xl">
        <div className="space-y-8">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password to test..."
              className="w-full bg-slate-900/50 border border-white/10 rounded-2xl p-6 text-white outline-none focus:border-emerald-500/50 transition-all font-mono text-2xl tracking-widest placeholder:tracking-normal placeholder:text-slate-700"
            />
          </div>

          <div className="space-y-3">
             <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-[2px]">
               <div 
                 className={`h-full transition-all duration-700 rounded-full ${strength < 50 ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]' : strength < 100 ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)]'}`}
                 style={{ width: `${strength}%` }}
               ></div>
             </div>
             <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                <span>Vulnerable</span>
                <span>Military-Grade</span>
             </div>
          </div>

          <button
            onClick={handleDeepAudit}
            disabled={!password || loading}
            className="w-full py-5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 text-slate-900 font-black rounded-2xl transition-all shadow-xl shadow-emerald-500/20 uppercase tracking-widest"
          >
            {loading ? 'Consulting Gemini Security Experts...' : 'Initiate Full Security Audit'}
          </button>
        </div>

        {explanation && (
          <div className="mt-12 p-8 bg-emerald-500/5 rounded-2xl border border-emerald-500/20 animate-in fade-in slide-in-from-top-4">
            <h4 className="text-lg font-bold text-emerald-400 mb-6 flex items-center gap-3">
              <span className="p-2 bg-emerald-500/10 rounded-lg">🧠</span> 
              Threat Research Findings
            </h4>
            <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">
              {explanation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModulePassword;
