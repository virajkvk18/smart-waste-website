"use client";
import { useRef, useState, useEffect } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';
import { ShieldCheck, Coins, Zap, RefreshCw, Info } from 'lucide-react';

// Enhanced Waste Map to fix classification errors (e.g., iPod vs Phone)
const WASTE_MAP: Record<string, { category: string; value: number; impact: string }> = {
  'ipod': { category: 'Smartphone/Media Player', value: 450, impact: '0.8kg CO2 saved' },
  'cellular telephone': { category: 'Smartphone', value: 600, impact: '1.2kg CO2 saved' },
  'laptop': { category: 'Laptop/Computer', value: 1500, impact: '5.0kg CO2 saved' },
  'mouse': { category: 'Computer Peripheral', value: 80, impact: '0.1kg CO2 saved' },
  'keyboard': { category: 'Computer Peripheral', value: 120, impact: '0.3kg CO2 saved' },
  'hand-held computer': { category: 'Tablet/Large Phone', value: 800, impact: '2.0kg CO2 saved' },
};

export default function Scanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [result, setResult] = useState<{name: string, value: number, conf: number, impact: string} | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } // Uses back camera on mobile
        });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        setError("Camera access denied. Please enable it to scan waste.");
      }
    }
    setupCamera();
  }, []);

  const identify = async () => {
    if (!videoRef.current) return;
    setIsScanning(true);
    setResult(null);

    try {
      // Load the pre-trained model
      const model = await mobilenet.load();
      const predictions = await model.classify(videoRef.current);
      
      const top = predictions[0];
      const className = top.className.toLowerCase().split(',')[0]; // Simplify name
      
      // Map general AI terms to specific E-Waste categories
      const mapped = WASTE_MAP[className] || { 
        category: className, 
        value: 50, 
        impact: '0.2kg CO2 saved' 
      };
      
      setResult({
        name: mapped.category,
        value: mapped.value,
        conf: Math.round(top.probability * 100),
        impact: mapped.impact
      });
    } catch (err) {
      setError("AI Analysis failed. Try again.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-white p-6 rounded-[2.5rem] shadow-2xl">
      {/* Viewport Header */}
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <Zap size={18} className="text-green-600" /> AI Visualizer
        </h3>
        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-bold uppercase tracking-tighter">
          Model: MobileNet v2
        </span>
      </div>

      {/* Camera Viewport */}
      <div className="relative rounded-[2rem] overflow-hidden h-72 bg-slate-900 shadow-inner group">
        <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
        
        {/* Scanning Animation Overlays */}
        <div className="absolute inset-0 border-[16px] border-white/5 pointer-events-none" />
        {isScanning && (
          <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center">
            <div className="w-full h-1 bg-green-400 absolute top-0 animate-scan shadow-[0_0_15px_rgba(74,222,128,0.8)]" />
            <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold animate-pulse">
              ANALYZING PIXELS...
            </div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center p-6 text-center">
            <p className="text-white font-bold text-sm bg-red-600 px-4 py-2 rounded-lg">{error}</p>
          </div>
        )}
      </div>

      {/* Action Button */}
      <button 
        onClick={identify}
        disabled={isScanning}
        className="w-full mt-6 bg-green-600 hover:bg-green-500 disabled:bg-slate-300 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-green-100 flex items-center justify-center gap-3 group"
      >
        {isScanning ? (
          <RefreshCw className="animate-spin" />
        ) : (
          <Zap className="group-hover:scale-125 transition-transform" />
        )}
        {isScanning ? "PROCESSING..." : "SCAN & APPRAISE"}
      </button>

      {/* Celebratory Result Card */}
      {result && (
        <div className="mt-6 space-y-4 animate-in zoom-in-95 duration-300">
          <div className="p-6 bg-gradient-to-br from-green-600 to-emerald-800 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
            
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-green-200 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Detected Waste</p>
                <h3 className="text-2xl font-black capitalize leading-tight">{result.name}</h3>
              </div>
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/30">
                <Coins size={20} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 relative z-10">
              <div className="bg-black/20 p-3 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] font-bold text-green-300 uppercase">Points Reward</p>
                <p className="text-xl font-black">+{Math.floor(result.value / 10)} Pts</p>
              </div>
              <div className="bg-black/20 p-3 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-[10px] font-bold text-green-300 uppercase">Carbon Offset</p>
                <p className="text-sm font-black truncate">{result.impact}</p>
              </div>
            </div>
          </div>

          {/* Trust Transparency */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-start gap-3">
            <Info size={16} className="text-blue-500 mt-0.5 shrink-0" />
            <p className="text-[11px] text-slate-500 leading-relaxed">
              <strong>Why this result?</strong> Our AI identified this as <span className="text-slate-700 font-bold">{result.name}</span> with <strong>{result.conf}% confidence</strong> based on visual geometry and industrial patterns.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}