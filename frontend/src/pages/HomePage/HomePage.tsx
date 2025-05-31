import LeftPanel from '../../components/LeftPanel/LeftPanel';
import MapContainer from '../../components/MapContainer/MapContainer';
import { STARTING_LOCATION } from '../../constants/location';
import { useSearch } from '../../contexts/SearchContext';
import { usePlacesSearch } from '../../hooks/usePlacesSearch';

import './HomePage.css';

function HomePage() {
  const { searchQuery } = useSearch();
  const { data, isLoading, error, isError } = usePlacesSearch({
    location: STARTING_LOCATION,
    query: searchQuery,
  });

  return (
    <div className="home-page-container" data-cy="home-page">
      <LeftPanel placeSearchResponse={data} isLoading={isLoading} isError={isError} error={error} />
      <MapContainer placeSearchResponse={data} location={STARTING_LOCATION} />
    </div>
  );
}

export default HomePage;
