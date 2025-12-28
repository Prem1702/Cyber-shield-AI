
import React, { useState } from 'react';
import { analyzeThreat } from '../services/geminiService';

interface Props {
  onComplete: (score: number, risk: string) => void;
}

const ModuleSpam: React.FC<Props> = ({ onComplete }) => {
  const [transcript, setTranscript] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!transcript) return;
    setAnalyzing(true);
    const result = await analyzeThreat('Call Transcript', transcript);
    setReport(result);
    onComplete(result.score, result.riskLevel);
    setAnalyzing(false);
  };

  const loadSample = () => {
    setTranscript(`Caller: "This is David from Chase Fraud department. We have detected a suspicious login from Russia. To protect your funds, I need to verify your PIN and the code I just sent to your phone. If you don't do this now, your account will be locked for 48 hours."`);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-700">
      <header className="mb-10 text-center">
        <div className="w-20 h-20 bg-rose-500/10 text-rose-400 rounded-3xl mx-auto flex items-center justify-center text-4xl mb-4 border border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
          📞
        </div>
        <h2 className="text-4xl font-bold">Vishing Defense AI</h2>
        <p className="text-slate-400 max-w-lg mx-auto mt-2 text-lg">
          Deconstruct voice-scam psychology using pattern recognition.
        </p>
      </header>

      <div className="glass p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6">
           <button onClick={loadSample} className="text-[10px] text-rose-400 font-bold uppercase tracking-[0.2em] border border-rose-400/20 px-3 py-1 rounded-lg hover:bg-rose-500/10 transition-all">
             Load Attack Simulation
           </button>
        </div>

        <div className="space-y-6">
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste caller's transcript or description of the conversation..."
            className="w-full h-48 bg-slate-900/50 border border-white/10 rounded-2xl p-6 text-white outline-none focus:border-rose-500/50 transition-all font-medium placeholder:text-slate-700 focus:ring-1 focus:ring-rose-500/20"
          />
          <button
            onClick={handleAnalyze}
            disabled={!transcript || analyzing}
            className="w-full py-5 bg-gradient-to-r from-rose-500 to-orange-600 hover:from-rose-400 hover:to-orange-500 disabled:opacity-50 text-white font-bold rounded-2xl transition-all shadow-xl shadow-rose-500/20 uppercase tracking-widest"
          >
            {analyzing ? 'Deconstructing Behavioral Patterns...' : 'Analyze Communication Vectors'}
          </button>
        </div>

        {report && (
          <div className="mt-12 p-8 bg-white/5 rounded-3xl border border-white/10 animate-in slide-in-from-top-8">
            <div className="flex justify-between items-center mb-8">
              <h4 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-rose-500 animate-pulse">⚠️</span> Scam Intelligence Report
              </h4>
              <span className={`px-4 py-1 rounded-lg text-xs font-bold uppercase tracking-widest ${report.riskLevel === 'HIGH' ? 'bg-rose-500/20 text-rose-500' : 'bg-amber-500/20 text-amber-500'}`}>
                {report.riskLevel} CRITICALITY
              </span>
            </div>

            <div className="space-y-8">
               <div className="p-6 bg-rose-500/5 border border-rose-500/10 rounded-2xl">
                 <h5 className="text-rose-400 font-bold mb-3 uppercase tracking-widest text-xs">Heuristic Breakdown</h5>
                 <p className="text-slate-200 text-lg leading-relaxed">{report.explanation}</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {report.recommendations.map((rec: string, i: number) => (
                    <div key={i} className="flex gap-4 bg-slate-900/50 p-5 rounded-2xl border border-white/5 text-sm text-slate-400">
                      <span className="text-rose-500 font-bold font-mono">!</span> {rec}
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleSpam;
