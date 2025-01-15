import React from 'react';
import { Button, Box } from '@mui/material';

interface SortBoxProps {
  sortOrder: 'asc' | 'desc';
  dateOrder: 'asc' | 'desc';
  onSortOrderChange: (order: 'asc' | 'desc') => void;
  onDateOrderChange: (order: 'asc' | 'desc') => void;
}

const SortBox: React.FC<SortBoxProps> = ({
  sortOrder,
  dateOrder,
  onSortOrderChange,
  onDateOrderChange,
}) => {
  return (
    <Box mb={2}>
      {/* Sort by Title (A-Z / Z-A) */}
      <Button variant="contained" onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}>
        Sort {sortOrder === 'asc' ? 'Z-A' : 'A-Z'}
      </Button>

      {/* Sort by Date (Oldest / Newest) */}
      <Button variant="contained" onClick={() => onDateOrderChange(dateOrder === 'asc' ? 'desc' : 'asc')} style={{ marginLeft: '10px' }}>
        Sort by Date ({dateOrder === 'asc' ? 'Oldest First' : 'Newest First'})
      </Button>
    </Box>
  );
};

export default SortBox;
