import { LatLng } from '../../api/search';
import LeftPanel from '../../components/LeftPanel/LeftPanel';
import MapContainer from '../../components/MapContainer/MapContainer';
import { usePlacesSearch } from '../../hooks/usePlacesSearch';

import './HomePage.css';

const STARTING_LOCATION: LatLng = {
  lat: 35.66472178111948,
  lng: 139.73780370654634,
};

function HomePage() {
  const { data, isLoading, error, isError } = usePlacesSearch({ location: STARTING_LOCATION });

  return (
    <div className="home-page-container" data-cy="home-page">
      <LeftPanel places={data} isLoading={isLoading} isError={isError} error={error} />
      <MapContainer places={data} location={STARTING_LOCATION} />
    </div>
  );
}

export default HomePage;
