
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  trend: string;
  isPositive?: boolean;
  icon: string;
  color?: 'cyan' | 'rose' | 'emerald';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, trend, isPositive = true, icon, color = 'cyan' }) => {
  const colorMap = {
    cyan: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/5',
    rose: 'border-rose-500/30 text-rose-400 bg-rose-500/5',
    emerald: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5'
  };

  return (
    <div className={`glass p-6 rounded-2xl flex flex-col gap-4 border border-white/5 hover:border-white/20 transition-all group`}>
      <div className="flex justify-between items-start">
        <div className={`w-12 h-12 glass rounded-xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110`}>
          {icon}
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-widest ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
          {trend}
        </span>
      </div>
      <div>
        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">{label}</h3>
        <p className={`text-3xl font-bold mt-1 tracking-tight text-white`}>{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
