import { LatLngExpression } from 'leaflet';
import { MapContainer as LeafletMapContainer, TileLayer } from 'react-leaflet';
import './MapContainer.css';

interface MapContainerProps {
  position: LatLngExpression;
}

export default function MapContainer({ position }: MapContainerProps) {
  return (
    <div className="map-container" data-cy="map-container">
      <LeafletMapContainer center={position} zoom={15}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </LeafletMapContainer>
    </div>
  );
}
