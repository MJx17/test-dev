import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface ReusablePaginationProps {
  page: number;
  count: number;
  onPageChange: (newPage: number) => void;
  itemsPerPage?: number; // Default to 10 if not provided
}

const ReusablePagination: React.FC<ReusablePaginationProps> = ({
  page,
  count,
  onPageChange,
  itemsPerPage = 5,
}) => {
  const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    onPageChange(newPage);
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="center">
      <Pagination
        count={Math.ceil(count / itemsPerPage)}  // Total pages based on items per page
        page={page}  // Current page
        onChange={handlePageChange}  // Handler to update page
        color="primary"
        siblingCount={1} // Number of sibling pages to show
        boundaryCount={2} // Boundary pages (e.g., first, last)
      />
    </Stack>
  );
};

export default ReusablePagination;
