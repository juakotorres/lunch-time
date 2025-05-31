import LeftPanel from '../../components/LeftPanel/LeftPanel';
import MapContainer from '../../components/MapContainer/MapContainer';
import { STARTING_LOCATION } from '../../constants/location';
import { usePlacesSearch } from '../../hooks/usePlacesSearch';

import './HomePage.css';

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
