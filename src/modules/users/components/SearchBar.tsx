// components/SearchBar.tsx
import { TextField, Button } from '@material-ui/core';
import { useState } from 'react';

type Props = {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
  onReset: () => void;
};

export const SearchBar = ({ searchTerm, onSearch, onReset }: Props) => {
  const [value, setValue] = useState(searchTerm);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(value);
  };

  const handleReset = () => {
    setValue('');
    onReset();
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex-grow mr-2">
        <TextField label="Search" variant="outlined" value={value} onChange={handleChange} fullWidth />
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>{' '}
        <Button variant="contained" color="default" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
};
