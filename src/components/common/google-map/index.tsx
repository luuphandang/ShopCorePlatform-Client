'use client';

import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    initMap: () => void;
    google: {
      maps: {
        Map: new (
          element: HTMLElement,
          options: object,
        ) => {
          setCenter: (location: { lat: number; lng: number }) => void;
          setZoom: (zoom: number) => void;
        };
        Marker: new (options: object) => {
          addListener: (event: string, callback: () => void) => void;
        };
        InfoWindow: new (options: object) => {
          open: (
            map: { setCenter: (location: { lat: number; lng: number }) => void },
            marker: { addListener: (event: string, callback: () => void) => void },
          ) => void;
        };
      };
    };
  }
}

const GoogleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Function to load the Google Maps script
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;

      window.initMap = () => {
        if (!mapRef.current) return;

        // Example coordinates (change to your actual business location)
        const location = { lat: 40.712776, lng: -74.005974 }; // New York City coordinates

        const map = new google.maps.Map(mapRef.current, {
          center: location,
          zoom: 15,
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry.fill',
              stylers: [{ weight: '2.00' }],
            },
            {
              featureType: 'all',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#9c9c9c' }],
            },
            {
              featureType: 'all',
              elementType: 'labels.text',
              stylers: [{ visibility: 'on' }],
            },
            {
              featureType: 'landscape',
              elementType: 'all',
              stylers: [{ color: '#f2f2f2' }],
            },
            {
              featureType: 'poi',
              elementType: 'all',
              stylers: [{ visibility: 'off' }],
            },
            {
              featureType: 'road',
              elementType: 'all',
              stylers: [{ saturation: -100 }, { lightness: 45 }],
            },
            {
              featureType: 'transit',
              elementType: 'all',
              stylers: [{ visibility: 'simplified' }],
            },
            {
              featureType: 'water',
              elementType: 'all',
              stylers: [{ color: '#b3d8f5' }, { visibility: 'on' }],
            },
          ],
        });

        // Add a marker at the location
        const marker = new google.maps.Marker({
          position: location,
          map: map,
          title: 'Copycraft Studio',
        });

        // Optional: Add an info window
        const infowindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 10px;">
              <h3 style="margin: 0 0 5px; font-weight: bold;">Copycraft Studio</h3>
              <p style="margin: 0;">123 Creativity Lane, Artisan District<br>Craftville, CR 12345</p>
            </div>
          `,
        });

        marker.addListener('click', () => {
          infowindow.open(map, marker);
        });
      };

      document.head.appendChild(script);
    };

    // Load the Google Maps script
    loadGoogleMapsScript();

    // Clean up function
    return () => {
      window.initMap = () => {};
      const scripts = document.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes('maps.googleapis.com/maps/api/js')) {
          scripts[i].remove();
          break;
        }
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Google Maps container */}
      <div ref={mapRef} className="w-full h-full"></div>

      {/* Placeholder with instructions */}
      <div className="absolute inset-0 flex items-center justify-center bg-secondary/30 text-center p-6">
        <div className="bg-white/90 p-6 rounded-lg shadow-lg max-w-sm">
          <p className="text-primary font-medium mb-2">Note: Google Maps API Key Required</p>
          <p className="text-sm text-muted-foreground">
            Replace &quot;YOUR_API_KEY&quot; in the GoogleMap component with your actual Google Maps
            API key to activate the map.
          </p>
          <p className="text-xs mt-2 text-muted-foreground/80">
            You can get an API key from the
            <a
              href="https://developers.google.com/maps/documentation/javascript/get-api-key"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary ml-1 hover:underline"
            >
              Google Cloud Console
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
GoogleMap.displayName = 'GoogleMap';

export { GoogleMap };
