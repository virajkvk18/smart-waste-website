"use client";

import dynamic from "next/dynamic";

// Dynamically import MapWrapper and disable Server-Side Rendering (SSR)
const MapWrapper = dynamic(() => import("./MapWrapper"), { 
  ssr: false, 
  loading: () => (
    <div className="h-full w-full bg-slate-100 animate-pulse rounded-[2.5rem] flex items-center justify-center border-2 border-dashed border-slate-200">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-slate-400 font-bold text-sm">Loading Map Engine...</p>
      </div>
    </div>
  )
});

export default function Map() {
  // The height here is crucial; without it, the map will be 0px tall
  return (
    <div className="h-[500px] w-full relative">
      <MapWrapper />
    </div>
  );
}