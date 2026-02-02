"use client";
import { useBins } from "@/hooks/use-bins";
import { BarChart3, TrendingUp, Package, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
  const bins = useBins();
  const criticalBins = bins.filter(b => b.fillLevel > 80).length;

  return (
    <div className="min-h-screen bg-slate-50 p-8 lg:p-12">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">System Control</h1>
          <p className="text-slate-500 font-medium">Monitoring {bins.length} smart nodes across Jabalpur</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 border border-red-200">
            <AlertTriangle size={18} /> {criticalBins} Action Required
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Real-time Monitoring Table */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-lg text-slate-800">Bin Operational Status</h3>
            <ShieldCheck className="text-green-500" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
                <tr>
                  <th className="p-6">Location</th>
                  <th className="p-6 text-center">Fill Level</th>
                  <th className="p-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {bins.map(bin => (
                  <tr key={bin.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-6 font-bold text-slate-700">{bin.name}</td>
                    <td className="p-6">
                      <div className="flex items-center gap-3 justify-center">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${bin.fillLevel > 80 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${bin.fillLevel}%` }} />
                        </div>
                        <span className="text-xs font-black">{bin.fillLevel}%</span>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded-lg">Operational</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Historical Collection Trends */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp className="text-green-600" /> Collection Trend
            </h3>
            <div className="flex items-end gap-2 h-32">
              {[30, 60, 45, 80, 50, 90, 70].map((h, i) => (
                <div key={i} className="flex-1 bg-green-100 rounded-t-md hover:bg-green-600 transition-colors" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[8px] font-black text-slate-400 uppercase tracking-widest">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Package className="text-blue-600" /> Waste Material Mix
            </h3>
            <div className="space-y-4">
              <StatBar label="Phones" percent={48} color="bg-blue-500" />
              <StatBar label="Laptops" percent={22} color="bg-purple-500" />
              <StatBar label="Batteries" percent={30} color="bg-orange-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBar({ label, percent, color }: any) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] font-bold">
        <span className="text-slate-500">{label}</span>
        <span className="text-slate-800">{percent}%</span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}