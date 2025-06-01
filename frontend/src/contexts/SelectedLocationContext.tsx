import { createContext, useContext, useState, ReactNode } from 'react';
import { PlaceSearchResult } from '../api/places';

type SelectedPlaceContextType = {
  selectedPlace?: PlaceSearchResult;
  setSelectedPlace: (place?: PlaceSearchResult) => void;
};

const SelectedPlaceContext = createContext<SelectedPlaceContextType | undefined>(undefined);

export function SelectedPlaceProvider({ children }: { children: ReactNode }) {
  const [selectedPlace, setSelectedPlace] = useState<PlaceSearchResult>();

  return (
    <SelectedPlaceContext.Provider value={{ selectedPlace, setSelectedPlace }}>
      {children}
    </SelectedPlaceContext.Provider>
  );
}

export function useSelectedPlace() {
  const context = useContext(SelectedPlaceContext);
  if (!context) {
    throw new Error('useSelectedPlace must be used within a SelectedPlaceProvider');
  }
  return context;
}
