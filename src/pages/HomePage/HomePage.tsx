import { LatLngExpression } from 'leaflet';

import LeftPanel from '../../components/LeftPanel/LeftPanel';
import MapContainer from '../../components/MapContainer/MapContainer';

import './HomePage.css';

const STARTING_POSITION: LatLngExpression = [35.66472178111948, 139.73780370654634];

function HomePage() {
  return (
    <div className="home-page-container" data-cy="home-page">
      <LeftPanel />
      <MapContainer position={STARTING_POSITION} />
    </div>
  );
}

export default HomePage;
