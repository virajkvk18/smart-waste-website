"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useBins } from "@/hooks/use-bins";
import { Navigation } from 'lucide-react'; // Adding a navigation icon
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

export default function MapWrapper() {
  const bins = useBins();
  const defaultCenter: [number, number] = [23.1815, 79.9864];

  return (
    <MapContainer 
      center={defaultCenter} 
      zoom={13} 
      scrollWheelZoom={false} 
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {bins.map((bin) => {
        // Construct a Google Maps Directions URL
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${bin.lat},${bin.lng}`;

        return (
          <Marker 
            key={bin.id} 
            position={[bin.lat || 23.18, bin.lng || 79.98]}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-[150px]">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{bin.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${bin.fillLevel > 80 ? 'bg-red-500' : 'bg-green-500'}`} 
                      style={{ width: `${bin.fillLevel}%` }} 
                    />
                  </div>
                  <span className="text-[10px] font-black text-slate-600">{bin.fillLevel}% Full</span>
                </div>
                
                {/* Navigation Button */}
                <a 
                  href={googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-xl text-xs font-bold transition-colors shadow-lg shadow-green-100"
                >
                  <Navigation size={14} />
                  Get Directions
                </a>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}