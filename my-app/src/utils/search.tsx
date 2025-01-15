import React from 'react';
import { TextField } from '@mui/material';

interface SearchBoxProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <TextField
      label="Search"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      margin="normal"
    />
  );
};

export default SearchBox;
