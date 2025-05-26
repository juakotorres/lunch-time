import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" data-cy="logo-icon" />
        <p>Lunch Time!</p>
      </header>
      <footer>
        <a
          href="https://www.flaticon.com/free-icons/restaurant"
          title="restaurant icons"
          className="app-footer-link"
        >
          Restaurant icons created by Freepik - Flaticon
        </a>
      </footer>
    </div>
  );
}

export default App;
