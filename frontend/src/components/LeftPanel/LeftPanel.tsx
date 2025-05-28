import { YelpSearchResponse } from '../../api/yelp';
import logo from '../../assets/logo.png';
import './LeftPanel.css';
import { PlaceList } from './PlaceList';

interface LeftPanelProps {
  places?: YelpSearchResponse;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export default function LeftPanel(props: LeftPanelProps) {
  return (
    <div className="left-panel-container" data-cy="left-panel">
      <div className="header">
        <img src={logo} className="logo" alt="logo" data-cy="logo-icon" />
        <p>Lunch Time!</p>
      </div>
      <div className="content">
        <PlaceList {...props} />
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
