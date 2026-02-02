import Map from "@/components/maps/Map";
import Scanner from "@/components/ai/Scanner";
import Leaderboard from "@/components/ui/Leaderboard";
import { Leaf, Award, MapPin, Smartphone, Battery, Laptop, Cable, Zap } from 'lucide-react';

const WASTE_TYPES = [
  { icon: <Smartphone size={20} />, label: "Phone", color: "bg-blue-100 text-blue-600" },
  { icon: <Laptop size={20} />, label: "Laptop", color: "bg-purple-100 text-purple-600" },
  { icon: <Battery size={20} />, label: "Battery", color: "bg-orange-100 text-orange-600" },
  { icon: <Cable size={20} />, label: "Cables", color: "bg-emerald-100 text-emerald-600" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Global Rewards Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/60 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 p-2 rounded-xl text-white">
              <Leaf size={20} />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight hidden sm:block">
              Eco<span className="text-green-600">Smart</span>
            </h1>
          </div>

          <div className="flex gap-3">
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
              <Award className="text-yellow-500" size={18} />
              <span className="font-bold text-slate-700 text-sm">1,240 Pts</span>
            </div>
            <div className="bg-green-600 px-4 py-2 rounded-2xl flex items-center gap-2 shadow-lg shadow-green-200">
              <Leaf className="text-white" size={18} />
              <span className="font-bold text-white text-sm">2.4kg CO2</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 space-y-12">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
            Recycle Smarter, <br />
            <span className="text-green-600">Earn Better.</span>
          </h2>
          <p className="text-slate-500 font-medium">Identify your e-waste with AI and find the nearest smart bin to unlock rewards.</p>
        </div>

        {/* Main Functional Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Identify */}
          <div className="lg:col-span-5 space-y-8">
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <h3 className="text-xl font-bold text-slate-800">Identify Item</h3>
              </div>
              <Scanner />
            </section>

            <section className="space-y-4">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Or Select Manually</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {WASTE_TYPES.map((type) => (
                  <button key={type.label} className="flex flex-col items-center gap-2 p-4 bg-white border border-slate-100 rounded-2xl hover:border-green-500 hover:shadow-md transition-all group">
                    <div className={`${type.color} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                      {type.icon}
                    </div>
                    <span className="text-xs font-bold text-slate-600">{type.label}</span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Map */}
          <div className="lg:col-span-7 space-y-8">
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="text-xl font-bold text-slate-800">Locate Nearby Bins</h3>
                </div>
                <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                  <MapPin size={16} />
                  <span>Jabalpur, MP</span>
                </div>
              </div>
              
              <div className="bg-white p-2 rounded-[3rem] shadow-2xl shadow-slate-200 border border-white">
                <Map />
              </div>
            </section>
          </div>
        </div>

        {/* Gamification Section */}
        <section className="pt-10 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
            <h3 className="text-2xl font-bold text-slate-800">Community Impact</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <Leaderboard />
            </div>
            <div className="bg-green-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl">
              <Zap className="absolute -bottom-4 -right-4 text-white/10" size={120} />
              <h4 className="text-2xl font-black mb-4 leading-tight">Become an <br />Eco Warrior</h4>
              <p className="text-green-100 text-sm mb-6 leading-relaxed">You're 250 points away from your next badge! Keep recycling to earn exclusive local discounts.</p>
              <button className="w-full bg-white text-green-700 font-bold py-3 rounded-xl hover:bg-green-50 transition-colors">View Rewards</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}