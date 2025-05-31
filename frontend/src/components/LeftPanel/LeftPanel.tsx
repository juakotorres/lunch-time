import { useState } from 'react';
import { PlaceSearchResponse } from '../../api/places';
import logo from '../../assets/logo.png';
import backArrow from '../../assets/back-arrow.png';
import './LeftPanel.css';
import PlaceDetails from './PlaceDetails/PlaceDetails';
import PlaceList from './PlaceList/PlaceList';

interface LeftPanelProps {
  placeSearchResponse?: PlaceSearchResponse;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export default function LeftPanel(props: LeftPanelProps) {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>();

  return (
    <div className="left-panel-container" data-cy="left-panel">
      <div className="header">
        {selectedPlaceId && (
          <img
            src={backArrow}
            className="back-arrow"
            alt="Back arrow"
            data-cy="back-arrow"
            onClick={() => setSelectedPlaceId(undefined)}
          />
        )}
        <img src={logo} className="logo" alt="Logo" data-cy="logo-icon" />
        <p>Lunch Time!</p>
      </div>
      <div className="content">
        {!selectedPlaceId && (
          <PlaceList {...props} onSelectedPlace={(id) => setSelectedPlaceId(id)} />
        )}
        {selectedPlaceId && <PlaceDetails placeId={selectedPlaceId} />}
      </div>
      <a
        href="https://www.flaticon.com/free-icons/restaurant"
        title="restaurant icons"
        className="footer-link"
      >
        Restaurant icons created by Freepik - Flaticon
      </a>
    </div>
  );
}
