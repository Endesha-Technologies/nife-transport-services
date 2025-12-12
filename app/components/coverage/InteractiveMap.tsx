'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

// Fix for default marker icon in Next.js
const iconUrl = 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png';

// Custom Icon for Hubs
const createHubIcon = () => L.divIcon({
  className: 'custom-hub-icon',
  html: `<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

// Hub Data
const hubs = [
  { id: 'yvr', name: 'Vancouver', lat: 49.2827, lng: -123.1207, country: 'CA' },
  { id: 'yyz', name: 'Toronto', lat: 43.6532, lng: -79.3832, country: 'CA' },
  { id: 'mtl', name: 'Montreal', lat: 45.5017, lng: -73.5673, country: 'CA' },
  { id: 'sea', name: 'Seattle', lat: 47.6062, lng: -122.3321, country: 'US' },
  { id: 'nyc', name: 'New York', lat: 40.7128, lng: -74.0060, country: 'US' },
  { id: 'chi', name: 'Chicago', lat: 41.8781, lng: -87.6298, country: 'US' },
  { id: 'lax', name: 'Los Angeles', lat: 34.0522, lng: -118.2437, country: 'US' },
  { id: 'dal', name: 'Dallas', lat: 32.7767, lng: -96.7970, country: 'US' },
  { id: 'mia', name: 'Miami', lat: 25.7617, lng: -80.1918, country: 'US' },
  { id: 'lar', name: 'Laredo', lat: 27.5036, lng: -99.5076, country: 'US' },
  { id: 'mex', name: 'Mexico City', lat: 19.4326, lng: -99.1332, country: 'MX' },
  { id: 'mty', name: 'Monterrey', lat: 25.6866, lng: -100.3161, country: 'MX' },
];

// Routes
const routes = [
  { from: 'yvr', to: 'sea' },
  { from: 'sea', to: 'lax' },
  { from: 'lax', to: 'dal' },
  { from: 'dal', to: 'chi' },
  { from: 'chi', to: 'yyz' },
  { from: 'yyz', to: 'mtl' },
  { from: 'mtl', to: 'nyc' },
  { from: 'nyc', to: 'mia' },
  { from: 'dal', to: 'lar' },
  { from: 'lar', to: 'mty' },
  { from: 'mty', to: 'mex' },
  { from: 'chi', to: 'nyc' },
  { from: 'lax', to: 'chi' },
  { from: 'dal', to: 'mia' },
];

// Component to animate a marker along a path
const AnimatedTruck = ({ start, end, duration }: { start: [number, number], end: [number, number], duration: number }) => {
  const [position, setPosition] = useState(start);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = (time - startTime) / (duration * 1000);

      if (progress < 1) {
        const lat = start[0] + (end[0] - start[0]) * progress;
        const lng = start[1] + (end[1] - start[1]) * progress;
        setPosition([lat, lng]);
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Reset
        startTime = time;
        setPosition(start);
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [start, end, duration]);

  return (
    <CircleMarker 
      center={position} 
      radius={4} 
      pathOptions={{ color: '#ffffff', weight: 1, fillColor: '#ea580c', fillOpacity: 1 }} 
    />
  );
};

export default function InteractiveMap() {
  return (
    <div className="h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative z-10">
      <MapContainer 
        center={[39.8283, -98.5795]} 
        zoom={4} 
        scrollWheelZoom={false} 
        className="h-full w-full bg-slate-50"
        style={{ background: '#f8fafc' }}
      >
        {/* Voyager Theme Tiles (Colorful but clean) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* Draw Routes */}
        {routes.map((route, idx) => {
          const startHub = hubs.find(h => h.id === route.from);
          const endHub = hubs.find(h => h.id === route.to);
          
          if (!startHub || !endHub) return null;

          return (
            <div key={idx}>
              <Polyline 
                positions={[[startHub.lat, startHub.lng], [endHub.lat, endHub.lng]]}
                pathOptions={{ color: '#2563eb', weight: 2, opacity: 0.6, dashArray: '5, 10' }}
              />
              <AnimatedTruck 
                start={[startHub.lat, startHub.lng]} 
                end={[endHub.lat, endHub.lng]} 
                duration={3 + (idx % 5)} // Varied duration
              />
            </div>
          );
        })}

        {/* Draw Hubs */}
        {hubs.map(hub => (
          <Marker 
            key={hub.id} 
            position={[hub.lat, hub.lng]} 
            icon={createHubIcon()}
          >
            <Popup className="custom-popup">
              <div className="text-slate-900 font-bold">{hub.name}</div>
              <div className="text-slate-500 text-xs">{hub.country}</div>
            </Popup>
          </Marker>
        ))}

      </MapContainer>
      
      {/* Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur-md p-4 rounded-xl border border-slate-200 text-slate-900 max-w-xs shadow-xl">
        <h4 className="font-bold text-blue-600 flex items-center gap-2 text-sm">
          <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
          Live Network
        </h4>
        <p className="text-[10px] text-slate-600 mt-1 leading-tight">
          Real-time visualization of our cross-border logistics network.
        </p>
      </div>
    </div>
  );
}
