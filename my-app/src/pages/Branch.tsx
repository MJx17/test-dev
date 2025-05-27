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

import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HomeIcon from '@mui/icons-material/Home';

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
  daysOpen: string;
  telephone: string;
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
    {
      id: 1,
      category: 'headquarters',
      position: [14.583146, 120.987986],
      image: 'https://www.philtrustbank.com/sites/default/files/styles/medium/public/head_office.jpg?itok=xjUcH2EO',
      address: 'Philtrust Bank Building, United Nations Avenue corner San Marcelino St., Manila',
      branchName: 'Philtrust Bank Main Office',
      bankHours: '9:00 AM to 5:00 PM',
      daysOpen: 'Monday to Friday',
      telephone: '02-8523-4111',
      location: 'metro'
    },
    {
      id: 2,
      category: 'atm',
      position: [14.601981, 120.984673],
      image: '/files/quipo.JPG',
      address: ' Arlegui Building, Quezon Boulevard corner Arlegui Street, Quiapo, Manila, 1001 Metro Manila',
      branchName: 'Philtrust ATM Quiapo',
      bankHours: '24/7',
      daysOpen: 'Open every day',
      telephone: '02-8523-4111',
      location: 'metro'
    },
    {
      id: 3,
      category: 'branch',
      position: [14.555184, 121.023346],
      image: '/files/makati.JPG',
      address: 'Philtrust Bank Makati Branch, Makati Avenue corner Dela Rosa Street, Makati City, Metro Manila',
      branchName: 'Philtrust Makati Branch',
      bankHours: '9:00 AM to 5:00 PM',
      daysOpen: 'Monday to Friday',
      telephone: '02-8844-5660',
      location: 'metro'
    },
    {
      id: 4,
      category: 'atm',
      position: [14.650672, 121.102426],
      image: '/files/marikina.jpg',
      address: 'SM City Marikina, Marcos Highway corner Shoe Avenue, Marikina City, Metro Manila',
      branchName: 'Philtrust ATM Marikina',
      bankHours: '24/7',
      daysOpen: 'Open every day',
      telephone: '02-8523-4111',
      location: 'metro'
    },
    {
      id: 5,
      category: 'branch',
      position: [13.936694, 121.613520],
      image: '/files/Batangas.jpg',
      address: 'Philtrust Bank Batangas Branch, P. Burgos Street corner Rizal Avenue, Batangas City, Batangas',
      branchName: 'Philtrust Batangas Branch',
      bankHours: '9:00 AM to 5:00 PM',
      daysOpen: 'Monday to Friday',
      telephone: '043-984-2231',
      location: 'provincial'
    },
    {
      id: 6,
      category: 'branch',
      position: [10.315699, 123.885437],
      image: '/files/cebu.jpg',
      address: 'Philtrust Bank Cebu Branch, Osmeña Blvd corner Colon Street, Cebu City, Cebu',
      branchName: 'Philtrust Cebu Branch',
      bankHours: '9:00 AM to 5:00 PM',
      daysOpen: 'Monday to Friday',
      telephone: '032-255-8901',
      location: 'provincial'
    },
    {
      id: 7,
      category: 'atm',
      position: [14.676041, 121.043700],
      image: '/files/q-ave.JPG',
      address: 'Katipunan Avenue corner Aurora Blvd, Quezon City, Metro Manila',
      branchName: 'Philtrust ATM Katipunan',
      bankHours: '24/7',
      daysOpen: 'Open every day',
      telephone: '02-8523-4111',
      location: 'metro'
    },
    {
      id: 8,
      category: 'branch',
      position: [16.402333, 120.596007],
      image: '/files/Cabanatuan1.jpg',
      address: 'Philtrust Bank Baguio Branch, Session Road corner Lower Mabini Street, Baguio City, Benguet',
      branchName: 'Philtrust Baguio Branch',
      bankHours: '9:00 AM to 5:00 PM',
      daysOpen: 'Monday to Friday',
      telephone: '074-442-1234',
      location: 'provincial'
    },
    {
      id: 9,
      category: 'atm',
      position: [14.426252, 121.026016],
      image: '/files/bulacan.JPG',
      address: 'SM City Bicutan, Doña Soledad Avenue, Parañaque City, Metro Manila',
      branchName: 'Philtrust ATM Bicutan',
      bankHours: '24/7',
      daysOpen: 'Open every day',
      telephone: '02-8523-4111',
      location: 'metro'
    },
    {
      id: 10,
      category: 'branch',
      position: [8.476079, 124.645691],
      image: '/files/angeles.jpg',
      address: 'Philtrust Bank Cagayan de Oro Branch, Tiano Brothers Street corner Hayes Street, Cagayan de Oro City, Misamis Oriental',
      branchName: 'Philtrust CDO Branch',
      bankHours: '9:00 AM to 5:00 PM',
      daysOpen: 'Monday to Friday',
      telephone: '088-856-7890',
      location: 'provincial'
    }
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
              <div className='card-content-wrapper'>
                <div className="card-content">
                  <p><HomeIcon fontSize="small" /> {marker.branchName}</p>
                  <p><LocationOnIcon fontSize="small" /> {marker.address}</p>


                  <p><AccessTimeIcon fontSize="small" /> {marker.bankHours}</p>


                  <p><CalendarTodayIcon fontSize="small" /> {marker.daysOpen}</p>


                  <p><PhoneIcon fontSize="small" /> {marker.telephone}</p>

                </div>
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
          <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: '1999' }}>
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
