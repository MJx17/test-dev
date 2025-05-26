// SearchBox.tsx
import React from 'react';
import { TextField } from '@mui/material';
import { useSearchStore } from '../store/searchStore';

const SearchBox: React.FC = () => {
  const { searchTerm, setSearchTerm } = useSearchStore();

  return (
    <TextField
      label="Search"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      margin="normal"
    />
  );
};

export default SearchBox;
