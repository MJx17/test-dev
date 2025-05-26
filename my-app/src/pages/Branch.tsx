import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.fullscreen/Control.FullScreen.css';
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet.fullscreen';
import L from 'leaflet';
import 'leaflet.markercluster';
// import MarkerClusterGroup from 'react-leaflet-cluster';
import MapFilter from '../utils/mapFilter';
import { BuildingMarkerIcon, CreditCardMarkerIcon, LibraryMarkerIcon, EyeIcon } from '../utils/marker';
import '../styles/branch.scss';

// Type declarations
interface MarkerData {
  id: number;
  category: string;
  position: [number, number];
  image: string;
  address: string;
  branchName: string;
  bankHours: string;
  location: string;
}


const MapComponent: React.FC = () => {
  const [category, setCategory] = useState<string>('all');
  const [location, setLocation] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [showClusters, setShowClusters] = useState<boolean>(true);

  const position: [number, number] = [14.583146, 120.987986];
  const zoomLevel: number = 3;

  const markersRef = useRef<{ [key: number]: L.Marker }>({});
  const mapRef = useRef<L.Map | null>(null);
  const clusterGroupRef = useRef<L.MarkerClusterGroup | null>(null);
  const fullscreenControlRef = useRef<L.Control.Fullscreen | null>(null);

  const markers: MarkerData[] = [
    { id: 1, category: 'headquarters', position: [14.583146, 120.987986], image: '1.jpg', address: '123 Main St', branchName: 'HQ Main Office', bankHours: '9AM - 5PM', location: 'metro' },
    { id: 2, category: 'atm', position: [13.410530, 122.561920], image: '2.jpg', address: '456 Elm St', branchName: 'ATM Elm St', bankHours: '24/7', location: 'metro' },
    { id: 3, category: 'branch', position: [10.315700, 123.885437], image: '3.png', address: '789 Oak St', branchName: 'Library Branch Oak St', bankHours: '10AM - 6PM', location: 'provincial' },
    { id: 4, category: 'atm', position: [14.599512, 121.022222], image: '4.jpg', address: '1111 EDSA', branchName: 'ATM EDSA', bankHours: '24/7', location: 'metro' },
    { id: 5, category: 'branch', position: [16.402433, 120.593333], image: '5.jpg', address: '2345 Session Rd', branchName: 'Session Rd Branch', bankHours: '9AM - 5PM', location: 'provincial' },
    { id: 6, category: 'headquarters', position: [10.692222, 122.537500], image: '6.jpg', address: '3456 Iloilo Ave', branchName: 'Iloilo HQ Office', bankHours: '9AM - 5PM', location: 'metro' },
    { id: 7, category: 'atm', position: [12.879444, 121.045556], image: '7.jpg', address: '5678 Commonwealth Ave', branchName: 'ATM Commonwealth', bankHours: '24/7', location: 'metro' },
    { id: 8, category: 'branch', position: [15.583333, 120.966667], image: '8.jpg', address: '6789 MacArthur Hwy', branchName: 'MacArthur Hwy Branch', bankHours: '9AM - 5PM', location: 'provincial' },
    { id: 9, category: 'atm', position: [11.250000, 124.633333], image: '9.jpg', address: '8901 Real St', branchName: 'ATM Real St', bankHours: '24/7', location: 'metro' },
    { id: 10, category: 'branch', position: [18.533333, 121.633333], image: '10.jpg', address: '9012 Maharlika Hwy', branchName: 'Maharlika Branch', bankHours: '9AM - 5PM', location: 'provincial' }, 
  
  ];

  const filteredMarkers = markers.filter(marker => {
    const categoryMatch = category === 'all' || marker.category === category;
    const locationMatch = location === 'all' || marker.location === location;
    const searchLowercased = search.toLowerCase();
    const searchMatch =
      (marker.address?.toLowerCase().includes(searchLowercased) || '') ||
      (marker.branchName?.toLowerCase().includes(searchLowercased) || '') ||
      (marker.bankHours?.toLowerCase().includes(searchLowercased) || '') ||
      (marker.location?.toLowerCase().includes(searchLowercased) || '');

    return categoryMatch && searchMatch && locationMatch;
  });

  const MapUpdater: React.FC = () => {
    const map = useMap();

    useEffect(() => {
      mapRef.current = map;

      if (!fullscreenControlRef.current) {
        fullscreenControlRef.current = L.control.fullscreen({ position: 'topleft' }).addTo(map);
      }

      const markersGroup = L.featureGroup();
      const markersCluster = L.markerClusterGroup();

      markersGroup.clearLayers();
      markersCluster.clearLayers();

      filteredMarkers.forEach((marker) => {
        const icon = marker.category === 'headquarters' ? LibraryMarkerIcon
          : marker.category === 'atm' ? CreditCardMarkerIcon
          : BuildingMarkerIcon;

        const leafletMarker = L.marker(marker.position, { icon }).addTo(markersGroup);

        leafletMarker.on('click', () => {
          setSelectedMarker(marker);
          map.setView(marker.position, 21); // Zoom in when marker is clicked
        });

        markersRef.current[marker.id] = leafletMarker;
      });

      if (showClusters) {
        markersCluster.addLayer(markersGroup);
        map.addLayer(markersCluster);
        clusterGroupRef.current = markersCluster;
      } else {
        map.addLayer(markersGroup);
        clusterGroupRef.current = null;
      }

      return () => {
        map.removeLayer(markersGroup);
        if (clusterGroupRef.current) {
          map.removeLayer(clusterGroupRef.current);
        }
      };
    }, [filteredMarkers, map, showClusters, selectedMarker]);

    useEffect(() => {
      if (selectedMarker) {
        const marker = markersRef.current[selectedMarker.id];
        if (marker) {
          // We no longer automatically open a popup here
        }
      }
    }, [selectedMarker]);

    return null;
  };

  return (
    <div className="map-wrapper">
      <div className="map-filter-container">
        <MapFilter
          category={category}
          setCategory={setCategory}
          search={search}
          setSearch={setSearch}
          markers={markers}
          location={location}
          setLocation={setLocation}
        />
      </div>
      <div>
        <div className="scrollable-cards-container">
          {filteredMarkers.map((marker) => (
            <div
              key={marker.id}
              className={`card-filter ${selectedMarker?.id === marker.id ? 'selected' : ''}`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent event propagation to avoid issues
                setSelectedMarker(marker);
                mapRef.current?.setView(marker.position, 14);
                const leafletMarker = markersRef.current[marker.id];
                if (leafletMarker) {
                  leafletMarker.openPopup(); // Trigger popup on card click
                }
              }}
            >
              <div className="card-content">
                <p><strong>Location:</strong> {marker.location}</p>
                <p><strong>Facility Name:</strong> {marker.branchName}</p>
                <p><strong>Operating Hours:</strong> {marker.bankHours}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="map-container">
        <MapContainer center={position} zoom={zoomLevel} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapUpdater />
          <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1 }}>
            <button
              onClick={() => setShowClusters(prev => !prev)}
              className='eye-button'
            >
              <EyeIcon size={20} color="#000" />
            </button>
          </div>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;
