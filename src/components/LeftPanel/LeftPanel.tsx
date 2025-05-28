import logo from '../../logo.png';
import './LeftPanel.css';

export default function LeftPanel() {
  return (
    <div className="left-panel-container" data-cy="left-panel">
      <div className="header">
        <img src={logo} className="logo" alt="logo" data-cy="logo-icon" />
        <p>Lunch Time!</p>
      </div>
      <div className="content"></div>
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
