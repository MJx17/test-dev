import React, { useState, MouseEvent } from 'react';
import { Button, ToggleButton, ToggleButtonGroup, TextField, Autocomplete, Modal, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import "../styles/branch.scss";

// Define types for the props
interface Marker {
  id: number;
  branchName: string;
  category: string;
  position: [number, number];
}

interface FilterOption {
  key: string;  // Change key type to string
  label: string;
  id: number;
  category: string;
  position: [number, number];
}


interface MapFilterProps {
  category: string;
  setCategory: (category: string) => void;
  location: string;
  setLocation: (location: string) => void;
  search: string;
  setSearch: (search: string) => void;
  markers: Marker[];
}

const MapFilter: React.FC<MapFilterProps> = ({
  category,
  setCategory,
  location,
  setLocation,
  search,
  setSearch,
  markers,
}) => {
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>(false); // Filter visibility state
  const [tempCategory, setTempCategory] = useState<string>(category); // Temporary category state
  const [tempLocation, setTempLocation] = useState<string>(location); // Temporary location state

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleCategoryChange = (
    _event: MouseEvent<HTMLElement>, 
    newCategory: string | null
  ) => {
    if (newCategory !== null) {
      setTempCategory(newCategory);
    }
  };
  

  const handleLocationChange = (
   _event: MouseEvent<HTMLElement>, 
    newLocation: string | null
  ) => {
    if (newLocation !== null) {
      setTempLocation(newLocation);
    }
  };

  const handleApplyFilter = () => {
    setCategory(tempCategory);
    setLocation(tempLocation); // Apply location filter
    toggleFilterVisibility();
  };

  const handleCancelFilter = () => {
    setTempCategory(category);
    setTempLocation(location); // Reset location filter
    toggleFilterVisibility();
  };

  const handleClearFilters = () => {
    setTempCategory('all'); // Reset category to "All"
    setTempLocation('all'); // Reset location to "All"
  };

  const handleClearSearch = () => {
    setSearch('');
  };

  const getFilteredOptions = (inputValue: string): FilterOption[] => {
    const lowercasedInput = inputValue.toLowerCase();
    return markers
      .map((marker) => ({
        key: marker.id.toString(), // Convert id to string for the key
        label: marker.branchName || '', // Assuming address or another field for the label
        id: marker.id,
        category: marker.category,
        position: marker.position
      }))
      .filter((option) => option.label.toLowerCase().includes(lowercasedInput));
  };
  

  return (
    <div className="filter-container">
          <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Stack on smaller screens, row on larger
          alignItems: 'center',
          gap: 2, // Add spacing between elements
          width: '100%',
        }}
        className="search-map-container"
      >
        {/* Search Input */}
        <Autocomplete
          freeSolo
          options={getFilteredOptions(search)}
          getOptionLabel={(option: string | FilterOption) =>
            typeof option === 'string' ? option : option.label || ''
          }
          onInputChange={(_event, newInputValue) => {
            if (newInputValue.length >= 3) {
              setSearch(newInputValue);
            } else {
              setSearch('');
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search..."
              variant="outlined"
              sx={{
                flex: 1, // Take up remaining space in the row
                minWidth: '300px',
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <SearchIcon className="search--map-icon" />
                    {params.InputProps.startAdornment}
                  </>
                ),
                endAdornment: (
                  <>
                    {search && (
                      <ClearIcon
                        className="clear-icon"
                        onClick={handleClearSearch}
                        style={{ cursor: 'pointer' }}
                      />
                    )}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        {/* Filter Button */}
        <Button
          variant="contained"
          sx={{
            minWidth: '100px', // Ensure button has a fixed width
            padding: '10px 16px', // Better padding for larger screens
          }}
          onClick={toggleFilterVisibility}
        >
          Filter
        </Button>
      </Box>



      <Modal
        open={isFilterVisible}
        onClose={toggleFilterVisibility}
        aria-labelledby="filter-modal-title"
        aria-describedby="filter-modal-description"
      >
        <Box className="filter-options">
          <Button className="close-filter" onClick={toggleFilterVisibility}>
            &times;
          </Button>
          <ToggleButtonGroup
            value={tempCategory}
            exclusive
            onChange={handleCategoryChange}
            aria-label="category filter"
            className='category-filter'
          >
            <ToggleButton value="headquarters" aria-label="headquarters">
              Head Office
            </ToggleButton>
            <ToggleButton value="atm" aria-label="atm machine">
              ATM Machine
            </ToggleButton>
            <ToggleButton value="branch" aria-label="branch office">
              Branch Office
            </ToggleButton>
          </ToggleButtonGroup>

          <ToggleButtonGroup
            value={tempLocation}
            exclusive
            onChange={handleLocationChange}
            aria-label="location filter"
            className='location-filter'
          >
            <ToggleButton value="metro" aria-label="metro">
              Metro
            </ToggleButton>
            <ToggleButton value="provincial" aria-label="provincial">
              Provincial
            </ToggleButton>
          </ToggleButtonGroup>

          <div className="modal-buttons">
            <Button variant="outlined" onClick={handleCancelFilter}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleApplyFilter}>
              Apply
            </Button>
            <Button variant="outlined" onClick={handleClearFilters}>
              Clear
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MapFilter;
