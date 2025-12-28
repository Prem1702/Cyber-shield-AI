
import React from 'react';

const ModuleDocs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-1000">
      <section className="text-center">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-4">
          Project Blueprint
        </h2>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto">
          CyberShield AI: A production-ready hackathon entry for modern digital security.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-3xl border border-white/10">
          <h3 className="text-2xl font-bold text-cyan-400 mb-6">System Architecture</h3>
          <div className="space-y-4 font-mono text-sm">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <span className="text-emerald-400 font-bold">FRONTEND:</span> React 19 + Tailwind CSS + Framer Motion (Simulation)
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <span className="text-emerald-400 font-bold">AI ENGINE:</span> Google Gemini 3 Flash (Advanced Reasoning)
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <span className="text-emerald-400 font-bold">SECURITY:</span> AES-256 Mocking + Heuristic URL Similarity Analysis
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <span className="text-emerald-400 font-bold">STATE:</span> Context-driven Security Score Propagation
            </div>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl border border-white/10">
          <h3 className="text-2xl font-bold text-emerald-400 mb-6">Killer Differentiators</h3>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">1</span>
              <div>
                <p className="font-bold">Explainable AI (XAI)</p>
                <p className="text-sm text-slate-400">Doesn't just block; it explains the hacker's psychology behind the threat.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">2</span>
              <div>
                <p className="font-bold">Privacy-First Architecture</p>
                <p className="text-sm text-slate-400">Uses client-side entropy calculation. Passwords never reach the backend.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">3</span>
              <div>
                <p className="font-bold">Unified Risk Meter</p>
                <p className="text-sm text-slate-400">Aggregates cross-module data into a single source of truth.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="glass p-10 rounded-3xl border border-cyan-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8">
           <span className="text-6xl opacity-10">🎤</span>
        </div>
        <h3 className="text-3xl font-bold mb-6 text-white">The 2-Minute Judge Pitch</h3>
        <p className="text-xl text-slate-300 leading-relaxed italic border-l-4 border-cyan-400 pl-8">
          "CyberShield AI solves the 'Security Paradox'—where users have too many tools but no understanding. By combining Phishing detection, Blockchain verification, and AI-powered Scam detection into one dashboard, we provide a 360-degree security posture. Our core innovation is the Gemini-powered Explainability Engine, which turns every threat into a learning moment, effectively training users to become their own first line of defense."
        </p>
      </div>
    </div>
  );
};

export default ModuleDocs;
