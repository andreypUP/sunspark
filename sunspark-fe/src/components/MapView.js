import React, { useEffect, useRef } from 'react';

export default function MapView({ leads, onSelectLead }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Dynamically load Leaflet CSS & JS if not already loaded
    if (!window.L) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => initMap();
      document.body.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      // Center map around Northern Mindanao (Cagayan de Oro area: ~8.45, 124.60)
      const map = window.L.map(mapContainerRef.current).setView([8.45, 124.55], 11);
      mapInstanceRef.current = map;

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 18,
      }).addTo(map);

      // Render lead markers
      leads.forEach((lead) => {
        const coords = lead.location?.coordinates || { lat: 8.4772, lng: 124.6459 };
        const tier = lead.leadTier;
        const color = tier === 'Hot' ? '#EF4444' : tier === 'Warm' ? '#F59E0B' : '#10B981';

        const customMarkerIcon = window.L.divIcon({
          className: 'custom-leaflet-marker',
          html: `<div style="
            background-color: ${color};
            width: 18px;
            height: 18px;
            border-radius: 50%;
            border: 3px solid #FFFFFF;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          "></div>`,
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        });

        const marker = window.L.marker([coords.lat, coords.lng], { icon: customMarkerIcon }).addTo(map);

        const popupContent = `
          <div style="font-family: sans-serif; padding: 4px;">
            <strong style="font-size: 14px;">${lead.customerName}</strong><br/>
            <span style="font-size: 12px; color: #64748B;">${lead.location?.cityOrMunicipality}, ${lead.location?.province}</span><br/>
            <div style="margin-top: 6px; font-size: 13px;">
              Readiness Score: <strong>${lead.readinessScore}</strong> (${lead.leadTier})<br/>
              Est. System Size: <strong>${lead.solarEstimate?.recommendedSystemSizeKwp || 3.5} kWp</strong>
            </div>
          </div>
        `;
        marker.bindPopup(popupContent);
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [leads]);

  return (
    <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800 }}>Geographic Lead Distribution Map</h2>
          <p style={{ fontSize: '13px', color: '#64748B' }}>
            Visualizing solar leads across Cagayan de Oro, Iligan City, Tagoloan, and Opol.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '13px', fontWeight: 600 }}>
          <span style={{ color: '#EF4444' }}>● Hot Leads</span>
          <span style={{ color: '#F59E0B' }}>● Warm Leads</span>
          <span style={{ color: '#10B981' }}>● Education</span>
        </div>
      </div>
      <div ref={mapContainerRef} className="map-view-container" />
    </div>
  );
}
