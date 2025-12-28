
import React, { useState } from 'react';
import { analyzeThreat } from '../services/geminiService';
import { AnalysisResult } from '../types';

interface Props {
  onComplete: (score: number, risk: string) => void;
}

const ModulePhishing: React.FC<Props> = ({ onComplete }) => {
  const [input, setInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setAnalyzing(true);
    const data = await analyzeThreat('URL or Content', input);
    setResult(data);
    onComplete(data.score, data.riskLevel);
    setAnalyzing(false);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-8 duration-500">
      <header className="mb-10 text-center">
        <div className="w-20 h-20 bg-cyan-500/10 text-cyan-400 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-4 border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
          🎣
        </div>
        <h2 className="text-4xl font-bold">Phishing Detection AI</h2>
        <p className="text-slate-400 max-w-lg mx-auto mt-2 text-lg">
          Zero-trust URL analysis powered by Gemini 3 Flash.
        </p>
      </header>

      <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl">
        <div className="space-y-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste suspicious URL or email text here..."
            className="w-full h-40 bg-slate-900/50 border border-white/10 rounded-2xl p-6 text-white outline-none focus:border-cyan-500/50 transition-all font-mono placeholder:text-slate-600 focus:ring-1 focus:ring-cyan-500/20"
          />
          <button
            onClick={handleAnalyze}
            disabled={analyzing || !input}
            className="w-full py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-bold rounded-2xl transition-all shadow-xl shadow-cyan-500/20 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
          >
            {analyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analyzing Vectors...
              </>
            ) : 'Initiate Scan'}
          </button>
        </div>

        {result && (
          <div className="mt-12 space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="flex items-center gap-8 p-6 bg-white/5 rounded-3xl border border-white/10">
              <div className={`text-5xl font-extrabold p-8 rounded-3xl border ${result.riskLevel === 'HIGH' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'}`}>
                {result.score}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-1">Threat Assessment</p>
                <h4 className={`text-2xl font-bold ${result.riskLevel === 'HIGH' ? 'text-rose-500' : 'text-cyan-400'}`}>
                  {result.riskLevel} CRITICALITY
                </h4>
                <p className="text-slate-400 italic">"Gemini Heuristics identified suspicious payload patterns."</p>
              </div>
            </div>

            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 text-xs font-mono text-cyan-500/30">AI_LOG_V3</div>
              <h5 className="font-bold mb-4 text-cyan-400 uppercase tracking-widest text-sm">Security Insight</h5>
              <p className="text-slate-300 leading-relaxed text-lg">{result.explanation}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.recommendations.map((rec, i) => (
                <div key={i} className="bg-cyan-500/5 p-4 rounded-xl border border-cyan-500/10 text-sm flex gap-4">
                  <span className="text-cyan-400 font-bold">0{i + 1}</span>
                  <span className="text-slate-300">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModulePhishing;
