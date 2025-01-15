import React, { useState, useEffect, } from 'react';
import useCarouselStore from '../store/Slide';
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
  IconButton,
  Box,
  Checkbox,
  Grid,
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
import SlideForm from '../pages/SlidesForm';
import Pagination from '../utils/Pagination';
import DeleteIcon from '@mui/icons-material/Delete';

import '../styles/slides.scss'

 

const CarouselDisplay = () => {
  const {
    carousels,
    getCarousels,
    softDeleteCarousel,
    updateCarousel,
    setTitle,
    setDescription,
    setImageUrl,
    title,
    description,
    imageUrl,
  } = useCarouselStore();
  //
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [selectedCarouselId, setSelectedCarouselId] = useState<string | null>(null);
  const [openSoftDeleteDialog, setOpenSoftDeleteDialog] = React.useState<boolean>(false);
  const [deleteInput, setDeleteInput] = React.useState(''); 

  //Pagination
  const [page, setPage] = useState<number>(1);  
  const [itemsPerPage] = useState<number>(5);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  const handlePageChange = (newPage: number) => {
    setPage(newPage); // Update the current page
  }

  //Filter
  const [searchTerm, setSearchTerm] = useState<string>(''); // Search term
    const [sortBy, setSortBy] = useState<'title-asc' | 'title-desc' | 'date-asc' | 'date-desc'>('title-asc');

    const filteredCarousels = carousels
    .filter((carousel) => {
      // Filter by search term (no user input, static filter)
      return carousel.title
        ?.toLocaleLowerCase()
        .includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      // Sort based on the `sortBy` criteria
      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title); // A-Z
      } else if (sortBy === 'title-desc') {
        return b.title.localeCompare(a.title); // Z-A
      } else if (sortBy === 'date-asc') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(); // Oldest first
      } else if (sortBy === 'date-desc') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Newest first
      }
      return 0; // Default to no sorting
    });
  
const handleSortChange = (e: SelectChangeEvent<string>) => {
  // Assert that e.target.value is one of the valid values
  setSortBy(e.target.value as "title-asc" | "title-desc" | "date-asc" | "date-desc");
};

    
  const paginatedCarousels = filteredCarousels.slice(startIndex, endIndex);

  useEffect(() => {
    getCarousels();
  }, [getCarousels]);

  const handleSelectRow = (id: string) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  // const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.checked) {
  //     setSelectedIds(carousels.map((carousel) => carousel._id));
  //   } else {
  //     setSelectedIds([]);
  //   }
  // };
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // Select carousels where deletedAt is null or undefined
      setSelectedIds(
        carousels
          .filter((carousel) => carousel.deletedAt === null || carousel.deletedAt === undefined) // Only select carousels that are not deleted
          .map((carousel) => carousel._id) // Get the IDs of those carousels
      );
    } else {
      // Deselect all selected carousels
      setSelectedIds([]); // Deselect everything
    }
  };
  




  const buttonhandleSelectAll = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Logic for selecting or deselecting all items
    if (selectedIds.length === carousels.length && carousels.length > 0) {
      // Deselect all
      setSelectedIds([]);
    } else {
      // Select all
      setSelectedIds(carousels.map((carousel) => carousel._id));
    }
  };


  
  const handleOpenEditDialog = (id: string) => {
    const carousel = carousels.find((car) => car._id === id);
    if (carousel) {
      setSelectedCarouselId(id);
      setTitle(carousel.title || '');
      setDescription(carousel.description || '');
      setImageUrl(carousel.imageUrl || '');
      setOpenEditDialog(true);
    }
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedCarouselId(null);
    setTitle('');
    setDescription('');
    setImageUrl('');
  };

  const handleUpdateCarousel = async () => {
    if (!selectedCarouselId) {
      alert('No carousel selected');
      return;
    }

    const updatedData = {
      title,
      description,
      imageUrl,
    };

    try {
      await updateCarousel(selectedCarouselId, updatedData); // Call update logic
      await getCarousels(); // Refresh carousels list
      alert('Carousel updated successfully!');
    } catch (error) {
      console.error('Error updating carousel:', error);
      alert('Failed to update carousel. Please try again.');
    }

    handleCloseEditDialog();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageUrl(reader.result as string); // Set image as Base64 string
      reader.readAsDataURL(file);
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
  

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
  
    try {
      // Perform soft delete for each selected carousel
      for (const id of selectedIds) {
        await softDeleteCarousel(id); // Call soft delete API logic
      }
  
      setSelectedIds([]); // Clear the selected IDs
      await getCarousels(); // Refresh the carousels list
      handleCloseSoftDeleteDialog(); // Close the soft delete dialog
      alert('Selected carousels deleted successfully!');
    } catch (error) {
      console.error('Error deleting carousels:', error);
      alert('Failed to delete selected carousels. Please try again.');
    }
  };
  

  return (  
    <div className='carousel-menu'>
        <h1 style={{ lineHeight: "1" }}>Carousel Management</h1>


   <div className='carousel-menu-buttons'>
  
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
            label="Search Title"
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
            <MenuItem value="title-asc">Title (A-Z)</MenuItem>
            <MenuItem value="title-desc">Title (Z-A)</MenuItem>
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
          style={{ marginBottom: '10px', marginRight: '10px', height: '50px' }}
          startIcon={<DeleteIcon />} // Add the trash icon here
        >
          Delete
        </Button>
            <SlideForm />
            
          </Box>
        </Box>
    </div>
      

    <div className="slides-table-container" style={{ width: '100%', overflowX: 'auto' }}>
      <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
       <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#242424', color: 'white' }}>
            <TableCell sx={{ color: 'white', width: '120px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  checked={selectedIds.length === carousels.filter(carousel => carousel.deletedAt === null || carousel.deletedAt === undefined).length}
                  indeterminate={selectedIds.length > 0 && selectedIds.length < carousels.filter(carousel => carousel.deletedAt === null || carousel.deletedAt === undefined).length}
                  onChange={handleSelectAll}
                  sx={{
                    color: 'white',
                    marginRight: '10px',
                  }}
                />     
            </div>
          </TableCell>

          <TableCell sx={{ color: 'white', width: '400px', whiteSpace: 'normal', wordWrap: 'break-word' }}>Title</TableCell>
          <TableCell sx={{ color: 'white', width: '450px', whiteSpace: 'normal', wordWrap: 'break-word' }}>Description</TableCell>
          <TableCell sx={{ color: 'white', width: '150px', padding: '10px' }}>Image</TableCell>
          <TableCell sx={{ color: 'white', width: '120px' }}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
  {paginatedCarousels && paginatedCarousels.length > 0 ? (
    paginatedCarousels.map((carousel) => (
      <TableRow
        key={carousel._id}
        sx={{
          backgroundColor: carousel.deletedAt ? '#f8d7da' : 'transparent',
          color: carousel.deletedAt ? '#721c24' : 'inherit',
        }}
      >
        <TableCell sx={{ padding: '10px' }}>
          <Checkbox
            checked={selectedIds.includes(carousel._id)}
            onChange={() => handleSelectRow(carousel._id)}
          />
        </TableCell>
        <TableCell sx={{ color: 'black', width: '400px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {carousel.title}
        </TableCell>
        <TableCell sx={{ color: 'black', width: '450px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {carousel.description}
        </TableCell>

        <TableCell sx={{ width: '150px', padding: '10px' }}>
          <a
            href={carousel.imageUrl as string}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              width: '150px',
              height: '150px',
              overflow: 'hidden',
              borderRadius: '8px',
            }}
          >
            <img
              src={carousel.imageUrl as string}
              alt={carousel.title || 'Carousel Image'}
              width="150"
              height="150"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </a>
        </TableCell>
        <TableCell sx={{ width: '120px', padding: '10px' }}>
          <Button
            onClick={() => handleOpenEditDialog(carousel._id)}
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
        No carousels available.
      </TableCell>
    </TableRow>
  )}
</TableBody>
    </Table>
  </TableContainer>
</div>




<div className="slides-table-card-container">
<div className="checkbox-div">
  {/* Select All Checkbox */}
  <button
    onClick={buttonhandleSelectAll}
    className="select-all-button"
  >
    {selectedIds.length === carousels.length && carousels.length > 0 ? 'Deselect All' : 'Select All'}
  </button>


</div>


  {/* Card List */}
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {paginatedCarousels.map((carousel) => (
      <Card
        key={carousel._id}
        className={`slides-table-card ${carousel.deletedAt ? 'deleted' : ''}`}
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
              checked={selectedIds.includes(carousel._id)}
              onChange={() => handleSelectRow(carousel._id)}
              style={{
                padding: '0', // Remove extra padding
                margin: '0',  // Ensure no margin around the checkbox
              }}
            />
            
            {/* Edit Button on the right */}
            <Button
              onClick={() => handleOpenEditDialog(carousel._id)}
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              className="slides-table-edit-button"
              style={{
                marginLeft: '16px',
              }}
            >
              Edit
            </Button>
          </div>

          {/* Title Label */}
          <div style={{ marginBottom: '8px' }}>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
              Title:
            </Typography>
            <Typography
              variant="body2"
              className="carousel-title"
              style={{
                textAlign: 'justify',
                whiteSpace: 'normal',  // Allow text to wrap
                wordWrap: 'break-word', // Break long words to fit in the container
                overflowWrap: 'break-word', // Ensure text breaks if needed
                width: '100%', // Ensure typography takes full width of its container
              }}
            >
              {carousel.title}
            </Typography>
          </div>

          {/* Description Label */}
          <div style={{ marginBottom: '8px' }}>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
              Description:
            </Typography>
            <Typography
              variant="body2"
              className="carousel-description"
              style={{
                textAlign: 'justify',
                whiteSpace: 'normal',  // Allow text to wrap
                wordWrap: 'break-word', // Break long words to fit in the container
                overflowWrap: 'break-word', // Ensure text breaks if needed
                width: '100%', // Ensure typography takes full width of its container
              }}
            >
              {carousel.description}
            </Typography>
          </div>

          {/* Image Label */}
          <div style={{ marginBottom: '8px' }}>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
              Image:
            </Typography>
            <a
                href={carousel.imageUrl as string}
                target="_blank"
                rel="noopener noreferrer"
                >
            <img
              src={carousel.imageUrl as string}
              alt={carousel.title || 'Carousel Image'}
              className="slides-table-card-img"
              style={{
                objectFit: 'cover',
                width: '100%',
                maxHeight: '200px',
              }}
            />
            </a>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
</div>


      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Carousel</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            margin="normal"
          />
          <input type="file" onChange={handleFileUpload} accept="image/*" style={{ marginTop: '15px' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleUpdateCarousel} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

        
      {/* Soft Delete Dialog */}
          <Dialog open={openSoftDeleteDialog} onClose={handleCloseSoftDeleteDialog}>
            <DialogTitle>Delete Carousel</DialogTitle>
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
               Delete
              </Button>
            </DialogActions>
          </Dialog>

       
          <Box display="flex" justifyContent="center" marginTop="20px">
            <Pagination
              page={page}
              count={filteredCarousels.length} // Total number of carousels
              onPageChange={handlePageChange} // Handle page change
              itemsPerPage={itemsPerPage} // Number of items per page
            />
          </Box>
    </div>
  );
};

export default CarouselDisplay;

