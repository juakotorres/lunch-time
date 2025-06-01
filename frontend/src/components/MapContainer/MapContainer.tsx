import { MapContainer as LeafletMapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

import './MapContainer.css';
import { LatLng } from '../../api/search';
import { PlaceSearchResponse } from '../../api/places';
import marker from '../../assets/marker.png';
import currentLocationImage from '../../assets/current-location.png';
import selectedLocationImage from '../../assets/selected-location.png';
import { useSelectedPlace } from '../../contexts/SelectedLocationContext';

const LocationMarker = L.icon({
  iconUrl: marker,
  iconSize: [40, 40],
  iconAnchor: [20, 0],
  popupAnchor: [0, 0],
});

const CurrentLocationMarker = L.icon({
  iconUrl: currentLocationImage,
  iconSize: [40, 40],
  iconAnchor: [20, 0],
  popupAnchor: [0, 0],
});

const SelectedLocationMarker = L.icon({
  iconUrl: selectedLocationImage,
  iconSize: [40, 40],
  iconAnchor: [20, 0],
  popupAnchor: [0, 0],
});

interface MapContainerProps {
  location: LatLng;
  placeSearchResponse?: PlaceSearchResponse;
}

export default function MapContainer({ location, placeSearchResponse }: MapContainerProps) {
  const { selectedPlace } = useSelectedPlace();

  return (
    <div className="map-container" data-cy="map-container">
      <LeafletMapContainer center={[location.lat, location.lng]} zoom={15}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[location.lat, location.lng]} icon={CurrentLocationMarker} />
        {!!placeSearchResponse?.places &&
          placeSearchResponse.places.map(({ id, displayName, location }) => (
            <Marker
              key={id}
              position={[location.latitude, location.longitude]}
              icon={selectedPlace?.id === id ? SelectedLocationMarker : LocationMarker}
            >
              <Popup>{displayName.text}</Popup>
            </Marker>
          ))}
      </LeafletMapContainer>
    </div>
  );
}
