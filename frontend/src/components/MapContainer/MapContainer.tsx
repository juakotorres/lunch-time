import { MapContainer as LeafletMapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

import './MapContainer.css';
import { LatLng } from '../../api/search';
import { YelpSearchResponse } from '../../api/yelp';
import marker from '../../assets/marker.png';

const LocationMarker = L.icon({
  iconUrl: marker,
  iconSize: [40, 40],
  iconAnchor: [20, 0],
  popupAnchor: [0, 0],
});

interface MapContainerProps {
  location: LatLng;
  places?: YelpSearchResponse;
}

export default function MapContainer({ location, places }: MapContainerProps) {
  return (
    <div className="map-container" data-cy="map-container">
      <LeafletMapContainer center={[location.lat, location.lng]} zoom={15}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {places &&
          places.businesses.map((business) => (
            <Marker
              key={business.id}
              position={[business.coordinates.latitude, business.coordinates.longitude]}
              icon={LocationMarker}
            >
              <Popup>{business.name}</Popup>
            </Marker>
          ))}
      </LeafletMapContainer>
    </div>
  );
}
