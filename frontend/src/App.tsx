import { SearchProvider } from './contexts/SearchContext';
import { SelectedPlaceProvider } from './contexts/SelectedLocationContext';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <SearchProvider>
      <SelectedPlaceProvider>
        <HomePage />
      </SelectedPlaceProvider>
    </SearchProvider>
  );
}

export default App;
