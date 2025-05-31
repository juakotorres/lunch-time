import { useEffect, useState } from 'react';
import { useSearch } from '../../../contexts/SearchContext';
import './SearchInput.css';

export default function SearchInput() {
  const { setSearchQuery } = useSearch();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300);

    // Cleanup and debounce if the timeout is finished earlier.
    return () => clearTimeout(handler);
  }, [inputValue, setSearchQuery]);

  return (
    <input
      placeholder="Search..."
      className="search-input"
      data-cy="search-input"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}
