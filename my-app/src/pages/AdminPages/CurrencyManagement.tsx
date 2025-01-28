import React, { useState, useEffect, } from 'react';
import {useExchangeRateStore} from '../../store/store';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Checkbox,
  Typography,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Card,
  CardContent,
  SelectChangeEvent 

} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CurrencyForm from '../../pages/rateForm';
import Pagination from '../../utils/Pagination';
import '../../styles/slides.scss'
import Flag from '../../utils/Flag';
import { countryOptions } from '../../utils/CurrencyOptions';





 

const CurrencyManagement = () => {
  const {
    exchangeRates,
    removeExchangeRate,
    hardDeleteRate,
    restoreRate,
    fetcAllExchangeRates,
    updateExchangeRate,
    value, 
    setValue,
    currency,
    setCurrency,
    selling_rate,
    setSellingRate,
  } = useExchangeRateStore();
  //
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [selectedRatesId, setSelectedRatesId] = useState<string | null>(null);
  const [openSoftDeleteDialog, setOpenSoftDeleteDialog] = React.useState<boolean>(false);
  const [openHardDeleteDialog, setOpenHardDeleteDialog] = React.useState<boolean>(false);
  const [deleteInput, setDeleteInput] = React.useState(''); 

  //Pagination
  const [page, setPage] = useState<number>(1);  
  const [itemsPerPage] = useState<number>(10);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  const handlePageChange = (newPage: number) => {
    setPage(newPage); // Update the current page
  }

  //Filter
  const [searchTerm, setSearchTerm] = useState<string>(''); // Search term
const [sortBy, setSortBy] = useState<'currency-asc' | 'currency-desc' | 'date-asc' | 'date-desc'>('currency-asc');

const filteredRates = exchangeRates
  .filter((ExchangeRate) => {
    // Filter by search term (no user input, static filter)
    return ExchangeRate.currency
      ? ExchangeRate.currency.toLocaleLowerCase().includes(searchTerm.toLowerCase()) // Ensure currency is a string before applying toLocaleLowerCase
      : false; // If currency is null, don't match
  })
  .sort((a, b) => {
    // Sort based on the `sortBy` criteria
    if (sortBy === 'currency-asc') {
      return a.currency && b.currency
        ? a.currency.localeCompare(b.currency) // A-Z (only if both currencies are valid strings)
        : 0; // If either currency is null, don't sort
    } else if (sortBy === 'currency-desc') {
      return a.currency && b.currency
        ? b.currency.localeCompare(a.currency) // Z-A (only if both currencies are valid strings)
        : 0; // If either currency is null, don't sort
    } else if (sortBy === 'date-asc') {
      return a.createdAt && b.createdAt
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() // Oldest first
        : 0; // If either createdAt is null or invalid, don't sort
    } else if (sortBy === 'date-desc') {
      return a.createdAt && b.createdAt
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() // Newest first
        : 0; // If either createdAt is null or invalid, don't sort
    }
    return 0; // Default to no sorting
  });

    

const handleSortChange = (e: SelectChangeEvent<string>) => {
  // Assert that e.target.value is one of the valid values
  setSortBy(e.target.value as "currency-asc" | "currency-desc" | "date-asc" | "date-desc");
};

    
  const paginatedRates = filteredRates.slice(startIndex, endIndex);

  useEffect(() => {
    fetcAllExchangeRates();
  }, [fetcAllExchangeRates]);

  const handleSelectRow = (id: string) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  // const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.checked) {
  //     setSelectedIds(ratess.map((rates) => rates._id));
  //   } else {
  //     setSelectedIds([]);
  //   }
  // };
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // Select ratess where deletedAt is null or undefined
      setSelectedIds(
        exchangeRates
          .filter((exchangeRate) => exchangeRate.deletedAt === null || exchangeRate.deletedAt === undefined) // Only select ratess that are not deleted
          .map((exchangeRate) => exchangeRate._id) // Get the IDs of those ratess
      );
    } else {
      // Deselect all selected ratess
      setSelectedIds([]); // Deselect everything
    }
  };
  


  const handleSelectAllDeleted = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // Select all ratess where deletedAt is not null or undefined
      setSelectedIds(
        exchangeRates
          .filter((exchangeRate) => exchangeRate.deletedAt !== null && exchangeRate.deletedAt !== undefined) // Only select ratess that have deletedAt
          .map((exchangeRate) => exchangeRate._id) // Get the IDs of the ratess
      );
    } else {
      // Deselect all selected ratess with deletedAt
      setSelectedIds([]); // Deselect everything
    }
  };
  

  const buttonhandleSelectAll = (_event: React.MouseEvent<HTMLButtonElement>) => {
    // Logic for selecting or deselecting all items
    if (selectedIds.length === exchangeRates.length && exchangeRates.length > 0) {
      // Deselect all
      setSelectedIds([]);
    } else {
      // Select all
      setSelectedIds(exchangeRates.map((exchangeRate) => exchangeRate._id));
    }
  };


  const buttonhandleSelectAllDeleted = () => {
    const isAllSelected = selectedIds.length === exchangeRates.filter(exchangeRate => exchangeRate.deletedAt).length;
  
    if (isAllSelected) {
      // Deselect all selected ratess with deletedAt
      setSelectedIds([]);
    } else {
      // Select all ratess where deletedAt is not null or undefined
      setSelectedIds(
        exchangeRates
          .filter((exchangeRate) => exchangeRate.deletedAt !== null && exchangeRate.deletedAt !== undefined) // Only select ratess that have deletedAt
          .map((exchangeRate) => exchangeRate._id) // Get the IDs of the ratess
      );
    }
  };
  
  
  const handleOpenEditDialog = (id: string) => {
    const exchangeRate = exchangeRates.find((rate) => rate._id === id);
    if (exchangeRate) {
      setSelectedRatesId(id);
      setCurrency(exchangeRate.currency || '');
      setValue(exchangeRate.value ?? 0); // Fallback to 0 if value is undefined or null
      setSellingRate(exchangeRate.selling_rate ?? 0); // Fallback to 0 if selling_rate is undefined or null
      setOpenEditDialog(true);
    }
  };

  
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedRatesId(null);
    setCurrency('');
    setValue(0);
    setSellingRate(0);
  };
  

  const handleUpdaterates = async () => {
      if (!selectedRatesId) {
        alert('No rate selected');
        return;
      }
  
      const updatedData = {
        currency,
        value,
        selling_rate,
        countryCode: countryOptions.find(option => option.currency === currency)?.countryCode || '',
      };
  
      try {
        await updateExchangeRate(selectedRatesId, updatedData); // Call update logic
        await fetcAllExchangeRates(); // Refresh ratess list
        alert('Rates updated successfully!');
      } catch (error) {
        console.error('Error updating rates:', error);
        alert('Failed to update rates. Please try again.');
      }
  
      handleCloseEditDialog();
    };


  const handleBulkRestore = async () => {
    if (selectedIds.length === 0) return;
  
    try {
      // Check if all selected ratess are soft-deleted (i.e., have deletedAt)
      const canRestoreAll = selectedIds.every((id) => {
        const exchangeRate = exchangeRates.find((rate) => rate._id === id);
        return exchangeRate?.deletedAt; // Only proceed with restore if deletedAt exists (soft deleted)
      });
  
      if (!canRestoreAll) {
        alert('Not all selected ratess are soft-deleted. Cannot proceed with restore.');
        return;
      }
  
      // Perform restore for all soft-deleted ratess
      for (const id of selectedIds) {
        const exchangeRate = exchangeRates.find((car) => car._id === id);
        if (exchangeRate?.deletedAt) {
          await restoreRate(id); // Perform restore if deletedAt exists
        }
      }
  
      // Clear selected IDs and refresh ratess list
      setSelectedIds([]);
      await fetcAllExchangeRates(); // Refresh ratess list
      alert('Selected ratess restored successfully!');
    } catch (error) {
      console.error('Error restoring ratess:', error);
      alert('Failed to restore selected ratess. Please try again.');
    }
  };

  const handleOpenSoftDeleteDialog = () => {
    if (selectedIds.length === 0) return;
    setOpenSoftDeleteDialog(true);
  };
  
  // Close Soft Delete Dialog
  const handleCloseSoftDeleteDialog = () => {
    setOpenSoftDeleteDialog(false);
    setDeleteInput(''); // Clear input after closing the dialog
  };
  
  // Open Hard Delete Dialog
  const handleOpenHardDeleteDialog = () => {
    if (selectedIds.length === 0) return;
    setOpenHardDeleteDialog(true);
  };
  
  // Close Hard Delete Dialog
  const handleCloseHardDeleteDialog = () => {
    setOpenHardDeleteDialog(false);
    setDeleteInput('');
  };
  
  

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
  
    try {
      // Perform soft delete for each selected rates
      for (const id of selectedIds) {
        await removeExchangeRate(id); // Call soft delete API logic
      }    
  
      setSelectedIds([]); // Clear the selected IDs
      await fetcAllExchangeRates(); // Refresh the ratess list
      handleCloseSoftDeleteDialog(); // Close the soft delete dialog
      alert('Selected ratess deleted successfully!');
    } catch (error) {
      console.error('Error deleting ratess:', error);
      alert('Failed to delete selected ratess. Please try again.');
    }
  };
  
   

  const handleBulkHardDelete = async () => {
    if (selectedIds.length === 0) return;

    try {
      // Check if all selected ratess are soft-deleted (i.e., have deletedAt)
      const canDeleteAll = selectedIds.every((id) => {
        const rates = exchangeRates.find((rate) => rate._id === id);
        return rates?.deletedAt; // Only proceed with hard delete if deletedAt exists
      });

      if (!canDeleteAll) {
        alert('Not all selected ratess are soft-deleted. Cannot proceed with hard delete.');
        return;
      }

      // Perform hard delete for all soft-deleted ratess
      for (const id of selectedIds) {
        const rates = exchangeRates.find((car) => car._id === id);
        
        if (rates?.deletedAt) {
          await hardDeleteRate(id); // Perform hard delete for soft-deleted rates
        } else {
          console.log(`rates ${id} is not soft-deleted. Skipping hard delete.`);
        }
      }

      setSelectedIds([]); // Clear selected IDs
      await fetcAllExchangeRates(); // Refresh ratess list
      handleCloseHardDeleteDialog();
      alert('Selected ratess hard deleted successfully!');
    } catch (error) {
      console.error('Error hard deleting ratess:', error);
      alert('Failed to hard delete selected ratess. Please try again.');
    }
  };


  // Check if all selected items are soft deleted for enabling the Bulk Hard Delete button
  const allSelectedAreSoftDeleted = selectedIds.every((id) => {
    const exchangeRate = filteredRates.find((rate) => rate._id === id);
    return exchangeRate?.deletedAt; // Must be soft-deleted
  });





  return (  
    <div className='rates-container'>
        


      

   <div className='rates-menu-buttons'  style={{width: '900px', margin: '0 auto', overflowX: 'auto'}}>
  
       <Box 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            gap={2} 
            padding="10px 0"
            flexWrap="wrap" // To allow wrapping in smaller screens
          >

      {/* Search TextField */}
          <TextField
            label="Search Currency"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 2, minWidth: '280px' }} // Flex value for proportional width
            InputProps={{
              sx: {
                height: '48px', // Ensure consistent height
                padding: '0em', // Remove extra padding
              },
            }}
          />

        <FormControl
          variant="outlined"
          style={{
            flex: 1, // Proportional width for the dropdown
            minWidth: '150px', // Minimum width for smaller screens
          }}
        >
          <InputLabel htmlFor="sortBy">Sort By</InputLabel>
          <Select
            id="sortBy"
            value={sortBy}
            onChange={handleSortChange}
            label="Sort By"
            MenuProps={{
              disableScrollLock: true, // Prevents the body scroll lock
              PaperProps: {
                style: {
                  maxHeight: 200, // Optional: Limit dropdown height
                  overflowY: 'auto', // Enable scrolling within the dropdown
                },
              },
            }}
            sx={{
              height: '48px', // Match height of TextField for symmetry
            }}
          >
            <MenuItem value="currency-asc">Currency (A-Z)</MenuItem>
            <MenuItem value="currency-desc">Currency (Z-A)</MenuItem>
            <MenuItem value="date-asc">Date (Oldest First)</MenuItem>
            <MenuItem value="date-desc">Date (Newest First)</MenuItem>
          </Select>
        </FormControl>

        <Box 
            display="flex" 
            justifyContent="flex-start" 
            alignItems="center" 
            gap="10px" 
            flexWrap="wrap" // This will allow the buttons to wrap on smaller screens
            padding='10px 0'
          >
            <Button
              variant="contained"
              color="warning"
              onClick={handleOpenSoftDeleteDialog}
              disabled={selectedIds.length === 0}
              style={{  marginRight: '10px', height: '50px' }}
            >
              Soft Delete 
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={handleOpenHardDeleteDialog}
              disabled={selectedIds.length === 0 || !allSelectedAreSoftDeleted}
              style={{  marginRight: '10px', height: '50px' }}
            >
              Hard Delete 
            </Button>


            <Button
              variant="contained"
              color="primary" // Changed to a different color
              onClick={handleBulkRestore}
              disabled={selectedIds.length === 0 || !allSelectedAreSoftDeleted} // Disable if not all are soft-deleted
              style={{  height: '50px'  }} // No margin right on the last button
            >
              Restore
            </Button>

            <CurrencyForm />
            
          </Box>
        </Box>
    </div>
      

    <div className="rates-table-container" style={{ width: '900px', margin: '0 auto', overflowX: 'auto' }}>
      <TableContainer component={Paper} sx={{ maxWidth: '900px', overflowX: 'auto' }}>
       <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#242424', color: 'white' }}>
            <TableCell sx={{ color: 'white', width: '120px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  checked={selectedIds.length === exchangeRates.filter(exchangeRate => exchangeRate.deletedAt === null || exchangeRate.deletedAt === undefined).length}
                  indeterminate={selectedIds.length > 0 && selectedIds.length < exchangeRates.filter(exchangeRate => exchangeRate.deletedAt === null || exchangeRate.deletedAt === undefined).length}
                  onChange={handleSelectAll}
                  sx={{
                    color: 'white',
                    marginRight: '10px',
                  }}
                />

            <Checkbox
                checked={selectedIds.length === exchangeRates.filter(exchangeRate => exchangeRate.deletedAt !== null && exchangeRate.deletedAt !== undefined).length}
                indeterminate={selectedIds.length > 0 && selectedIds.length < exchangeRates.filter(exchangeRate => exchangeRate.deletedAt !== null && exchangeRate.deletedAt !== undefined).length}
                onChange={handleSelectAllDeleted}
                sx={{
                  color: 'red',
                  '&.Mui-checked': {
                    color: 'red',
                  },
                }}
              />
            </div>
          </TableCell>

          <TableCell sx={{ color: 'white', width: '150px', whiteSpace: 'normal', wordWrap: 'break-word' }}>Currency</TableCell>
          <TableCell sx={{ color: 'white', width: '150px', whiteSpace: 'normal', wordWrap: 'break-word' }}>Description</TableCell>
          <TableCell sx={{ color: 'white', width: '150px', padding: '10px' }}>Image</TableCell>
          <TableCell sx={{ color: 'white', width: '120px' }}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {paginatedRates && paginatedRates.length > 0 ? (
    paginatedRates.map((exchangeRate) => (
      <TableRow
        key={exchangeRate._id}
        sx={{
          backgroundColor: exchangeRate.deletedAt ? '#f8d7da' : 'transparent',
          color: exchangeRate.deletedAt ? '#721c24' : 'inherit',
        }}
      >
        <TableCell sx={{ padding: '10px' }}>
          <Checkbox
            checked={selectedIds.includes(exchangeRate._id)}
            onChange={() => handleSelectRow(exchangeRate._id)}
          />
        </TableCell>
        <TableCell 
            sx={{ 
              color: 'black', 
              width: '400px', 
              whiteSpace: 'normal', 
              wordWrap: 'break-word' 
            }}
          >
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', // Adjust spacing between the flag and text
                padding: '4px 0' // Optional padding
              }}
            >
              <Flag
                countryCode={exchangeRate.countryCode}
                className="exchange-rate-flag"
              />
              <span style={{ lineHeight: '24px' }}>{exchangeRate.currency}</span>
            </div>
          </TableCell>

        <TableCell sx={{ color: 'black', width: '450px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {exchangeRate.value}
        </TableCell>

        <TableCell sx={{ color: 'black', width: '450px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {exchangeRate.selling_rate}
        </TableCell>

        <TableCell sx={{ width: '120px', padding: '10px' }}>
          <Button
            onClick={() => handleOpenEditDialog(exchangeRate._id)}
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
            style={{
              padding: '8px 16px',
              borderColor: '#1976d2',
              color: '#1976d2',
              backgroundColor: 'transparent',
              textTransform: 'none',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e3f2fd')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            Edit
          </Button>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={5} align="center">
        No Rates available.
      </TableCell>
    </TableRow>
  )}
</TableBody>
    </Table>
  </TableContainer>
</div>





<div className="rates-table-card-container">
<div className="checkbox-div">
  {/* Select All Checkbox */}
  <button
    onClick={buttonhandleSelectAll}
    className="select-all-button"
  >
    {selectedIds.length === exchangeRates.length && exchangeRates.length > 0 ? 'Deselect All' : 'Select All'}
  </button>

  <button
    onClick={buttonhandleSelectAllDeleted}
    className="select-all-deleted-button"
  >
    {selectedIds.length === exchangeRates.length && exchangeRates.length > 0 ? 'Deselect All' : 'Select All'}
  </button>
</div>



  {/* Card List */}
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {paginatedRates.map((exchangeRate) => (
      <Card
        key={exchangeRate._id}
        className={`rates-table-card ${exchangeRate.deletedAt ? 'deleted' : ''}`}
        style={{
          width: '100%', // Ensure card takes full width of container
          margin: '8px', // Add margin between cards
        }}
      >
        <CardContent>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between', // Space between checkbox and edit button
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            {/* Align the checkbox to the left */}
            <Checkbox
              checked={selectedIds.includes(exchangeRate._id)}
              onChange={() => handleSelectRow(exchangeRate._id)}
              style={{
                padding: '0', // Remove extra padding
                margin: '0',  // Ensure no margin around the checkbox
              }}
            />
            
            {/* Edit Button on the right */}
            <Button
              onClick={() => handleOpenEditDialog(exchangeRate._id)}
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              className="rates-table-edit-button"
              style={{
                marginLeft: '16px',
              }}
            >
              Edit
            </Button>
          </div>

        
          <div style={{ marginBottom: '8px' }}>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
              Currency:
            </Typography>
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', // Adjust spacing between the flag and text
                padding: '4px 0' // Optional padding
              }}
            >
              <Flag
                countryCode={exchangeRate.countryCode}
                className="exchange-rate-flag"
              />
              <span style={{ lineHeight: '24px' }}>{exchangeRate.currency}</span>
            </div>
          </div>

  
          <div style={{ marginBottom: '8px' }}>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
             Value
            </Typography>
            <Typography
              variant="body2"
              className="rates-value"
              style={{
                textAlign: 'justify',
                whiteSpace: 'normal',  // Allow text to wrap
                wordWrap: 'break-word', // Break long words to fit in the container
                overflowWrap: 'break-word', // Ensure text breaks if needed
                width: '100%', // Ensure typography takes full width of its container
              }}
            >
              {exchangeRate.value}
            </Typography>
          </div>

          <div style={{ marginBottom: '8px' }}>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
             Value
            </Typography>
            <Typography
              variant="body2"
              className="rates-selling_rate"
              style={{
                textAlign: 'justify',
                whiteSpace: 'normal',  // Allow text to wrap
                wordWrap: 'break-word', // Break long words to fit in the container
                overflowWrap: 'break-word', // Ensure text breaks if needed
                width: '100%', // Ensure typography takes full width of its container
              }}
            >
              {exchangeRate.selling_rate}
            </Typography>
          </div>


          
         
        </CardContent>
      </Card>
    ))}
  </div>
</div>




      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Rates</DialogTitle>
        <DialogContent>
          
        <Select
        labelId="currency-label"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        label="Currency"
        sx={{width: '100%'}}
      >
        {countryOptions.map((option) => (
          <MenuItem key={option.currency} value={option.currency}>
            <Box display="flex" alignItems="center">
              <Flag countryCode={option.countryCode} />
              <span>({option.currency})</span>
            </Box>
          </MenuItem>
        ))}
      </Select>

          <TextField
            label="Value"
            value={value}
            onChange={(e) => setValue(Number(e.target.value) || 0)}  // Convert string to number
            fullWidth
            margin="normal"
          />

          <TextField
            label="Selling Rate"
            value={selling_rate}
            onChange={(e) => setSellingRate(Number(e.target.value) || 0)}  // Convert string to number
            fullWidth
            margin="normal"
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleUpdaterates} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
        
      {/* Soft Delete Dialog */}
          <Dialog open={openSoftDeleteDialog} onClose={handleCloseSoftDeleteDialog}>
            <DialogTitle>Soft Delete rates</DialogTitle>
            <DialogContent>
              <TextField
                label="Type 'delete' to confirm"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseSoftDeleteDialog}>Cancel</Button>
              <Button
                onClick={handleBulkDelete}
                color="error"
                variant="contained"
                disabled={deleteInput !== 'delete'}
              >
                Soft Delete
              </Button>
            </DialogActions>
          </Dialog>

          {/* Hard Delete Dialog */}
          <Dialog open={openHardDeleteDialog} onClose={handleCloseHardDeleteDialog}>
            <DialogTitle>Hard Delete rates</DialogTitle>
            <DialogContent>
              <TextField
                label="Type 'delete' to confirm"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                fullWidth
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseHardDeleteDialog}>Cancel</Button>
              <Button
                onClick={handleBulkHardDelete}
                color="error"
                variant="contained"
                disabled={deleteInput !== 'delete'}
              >
                Hard Delete
              </Button>
            </DialogActions>
          </Dialog>
          <Box display="flex" justifyContent="center" marginTop="20px">
            <Pagination
              page={page}
              count={filteredRates.length} // Total number of ratess
              onPageChange={handlePageChange} // Handle page change
              itemsPerPage={itemsPerPage} // Number of items per page
            />
          </Box>
    </div>
  );
};

export default CurrencyManagement;

