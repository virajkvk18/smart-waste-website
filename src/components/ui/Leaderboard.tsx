"use client";
import { Trophy, Medal, Target } from 'lucide-react';

const LEADERS = [
  { name: "Viraj V.", points: 4250, rank: 1, impact: "12kg CO2" },
  { name: "Rahul S.", points: 3800, rank: 2, impact: "10kg CO2" },
  { name: "Amit K.", points: 3100, rank: 3, impact: "8kg CO2" },
];

export default function Leaderboard() {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <Trophy className="text-yellow-500" /> Community Leaders
        </h3>
        <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase">Jabalpur Central</span>
      </div>

      <div className="space-y-4">
        {LEADERS.map((user) => (
          <div key={user.rank} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-green-200 transition-all cursor-default group">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${
                user.rank === 1 ? 'bg-yellow-100 text-yellow-600' : 'bg-slate-200 text-slate-500'
              }`}>
                {user.rank === 1 ? <Medal size={20} /> : user.rank}
              </div>
              <div>
                <p className="font-bold text-slate-900">{user.name}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{user.impact} offset</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-black text-green-600">{user.points.toLocaleString()}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Points</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 py-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
        <Target size={18} /> View My Full Ranking
      </button>
    </div>
  );
}