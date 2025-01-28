import React, { useState, useEffect, } from 'react';
import useNoticeCardStore from '../../store/cardStore';
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
import CardForm from '../../pages/cards/cardsForm';
import Pagination from '../../utils/Pagination';
import '../../styles/slides.scss'






const NotiecCardManagement = () => {
  const {
    noticecards,
    softDeleteNoticeCard,
    hardDeleteNoticeCard,
    restoreNoticeCard,
    getAllNoticeCards,
    updateNoticeCard,
    setTitle,
    setDescription,
    setImageUrl,
    title,
    description,
    imageUrl,
  } = useNoticeCardStore();
  //
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [selectedNoticeCardId, setSelectedNoticeCardsId] = useState<string | null>(null);
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
   const [sortBy, setSortBy] = useState<'title-asc' | 'title-desc' | 'date-asc' | 'date-desc'>('title-asc');

    const filteredNoticeCards = noticecards
    .filter((noticecard) => {
      // Filter by search term (no user input, static filter)
      return noticecard.title
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

    
  const paginatedNoticeCards = filteredNoticeCards.slice(startIndex, endIndex);

  useEffect(() => {
    getAllNoticeCards();
  }, [getAllNoticeCards]);

  const handleSelectRow = (id: string) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => setImageUrl(reader.result as string); // Set image as Base64 string
        reader.readAsDataURL(file);
      }
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
        noticecards
          .filter((noticecard) => noticecard.deletedAt === null || noticecard.deletedAt === undefined) // Only select ratess that are not deleted
          .map((noticecard) => noticecard._id) // Get the IDs of those ratess
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
        noticecards
          .filter((noticecard) => noticecard.deletedAt !== null && noticecard.deletedAt !== undefined) // Only select ratess that have deletedAt
          .map((noticecard) => noticecard._id) // Get the IDs of the ratess
      );
    } else {
      // Deselect all selected ratess with deletedAt
      setSelectedIds([]); // Deselect everything
    }
  };
  

  const buttonhandleSelectAll = (_event: React.MouseEvent<HTMLButtonElement>) => {
    // Logic for selecting or deselecting all items
    if (selectedIds.length === noticecards.length && noticecards.length > 0) {
      // Deselect all
      setSelectedIds([]);
    } else {
      // Select all
      setSelectedIds(noticecards.map((noticecard) => noticecard._id));
    }
  };


  const buttonhandleSelectAllDeleted = () => {
    const isAllSelected = selectedIds.length === noticecards.filter(noticecard => noticecard.deletedAt).length;
  
    if (isAllSelected) {
      // Deselect all selected ratess with deletedAt
      setSelectedIds([]);
    } else {
      // Select all ratess where deletedAt is not null or undefined
      setSelectedIds(
        noticecards
          .filter((noticecard) => noticecard.deletedAt !== null && noticecard.deletedAt !== undefined) // Only select ratess that have deletedAt
          .map((noticecard) => noticecard._id) // Get the IDs of the ratess
      );
    }
  };
  
  const handleOpenEditDialog = (id: string) => {
    const noticecard = noticecards.find((notcard) => notcard._id === id);
    if (noticecard) {
      setSelectedNoticeCardsId(id);
      setTitle(noticecard.title || '');
      setDescription(noticecard.description || '');
      setImageUrl(noticecard.imageUrl || '');
      setOpenEditDialog(true);
    }
  };
  
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedNoticeCardsId(null);
    setTitle('');
    setDescription('');
    setImageUrl('');
  };

  const handleUpdateNoticeCard = async () => {
      if (!selectedNoticeCardId) {
        alert('No noticecards selected');
        return;
      }
  
      const updatedData = {
        title,
        description,
        imageUrl,

      };
  
      try {
        await updateNoticeCard(selectedNoticeCardId, updatedData); // Call update logic
        await getAllNoticeCards(); // Refresh ratess list
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
        const exchangeRate = noticecards.find((notcard) => notcard._id === id);
        return exchangeRate?.deletedAt; // Only proceed with restore if deletedAt exists (soft deleted)
      });
  
      if (!canRestoreAll) {
        alert('Not all selected noticecards are soft-deleted. Cannot proceed with restore.');
        return;
      }
  
      // Perform restore for all soft-deleted ratess
      for (const id of selectedIds) {
        const exchangeRate = noticecards.find((notcard) => notcard._id === id);
        if (exchangeRate?.deletedAt) {
          await restoreNoticeCard(id); // Perform restore if deletedAt exists
        }
      }
  
      // Clear selected IDs and refresh ratess list
      setSelectedIds([]);
      await getAllNoticeCards(); // Refresh ratess list
      alert('Selected noticecards restored successfully!');
    } catch (error) {
      console.error('Error restoring noticecards:', error);
      alert('Failed to restore selected noticecards. Please try again.');
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
        await softDeleteNoticeCard(id); // Call soft delete API logic
      }    
  
      setSelectedIds([]); // Clear the selected IDs
      await getAllNoticeCards(); // Refresh the ratess list
      handleCloseSoftDeleteDialog(); // Close the soft delete dialog
      alert('Selected noticecards deleted successfully!');
    } catch (error) {
      console.error('Error deleting noticecards:', error);
      alert('Failed to delete selected noticecards. Please try again.');
    }
  };
  
   

  const handleBulkHardDelete = async () => {
    if (selectedIds.length === 0) return;

    try {
      // Check if all selected ratess are soft-deleted (i.e., have deletedAt)
      const canDeleteAll = selectedIds.every((id) => {
        const noticecard = noticecards.find((notcard) => notcard._id === id);
        return noticecard?.deletedAt; // Only proceed with hard delete if deletedAt exists
      });

      if (!canDeleteAll) {
        alert('Not all selected noticecards are soft-deleted. Cannot proceed with hard delete.');
        return;
      }

      // Perform hard delete for all soft-deleted ratess
      for (const id of selectedIds) {
        const noticecard = noticecards.find((notcard) => notcard._id === id);
        
        if (noticecard?.deletedAt) {
          await hardDeleteNoticeCard(id); // Perform hard delete for soft-deleted rates
        } else {
          console.log(`noticecards ${id} is not soft-deleted. Skipping hard delete.`);
        }
      }

      setSelectedIds([]); // Clear selected IDs
      await getAllNoticeCards(); // Refresh ratess list
      handleCloseHardDeleteDialog();
      alert('Selected noticecards hard deleted successfully!');
    } catch (error) {
      console.error('Error hard deleting noticecards:', error);
      alert('Failed to hard delete selected noticecards. Please try again.');
    }
  };


  // Check if all selected items are soft deleted for enabling the Bulk Hard Delete button
  const allSelectedAreSoftDeleted = selectedIds.every((id) => {
    const noticecard = filteredNoticeCards.find((notcard) => notcard._id === id);
    return noticecard?.deletedAt; // Must be soft-deleted
  });





  return (  
    <div className='noticecards-container'>
        


      

   <div className='noticecards-menu-buttons'  style={{width: '900px', margin: '0 auto', overflowX: 'auto'}}>
  
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

            <CardForm />
            
          </Box>
        </Box>
    </div>
      

    <div className="noticecards-table-container" style={{ width: '900px', margin: '0 auto', overflowX: 'auto' }}>
      <TableContainer component={Paper} sx={{ maxWidth: '900px', overflowX: 'auto' }}>
       <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#242424', color: 'white' }}>
            <TableCell sx={{ color: 'white', width: '120px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  checked={selectedIds.length === noticecards.filter(noticecard => noticecard.deletedAt === null || noticecard.deletedAt === undefined).length}
                  indeterminate={selectedIds.length > 0 && selectedIds.length < noticecards.filter(noticecard => noticecard.deletedAt === null || noticecard.deletedAt === undefined).length}
                  onChange={handleSelectAll}
                  sx={{
                    color: 'white',
                    marginRight: '10px',
                  }}
                />

            <Checkbox
                checked={selectedIds.length === noticecards.filter(noticecard => noticecard.deletedAt !== null && noticecard.deletedAt !== undefined).length}
                indeterminate={selectedIds.length > 0 && selectedIds.length < noticecards.filter(noticecard => noticecard.deletedAt !== null && noticecard.deletedAt !== undefined).length}
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

          <TableCell sx={{ color: 'white', width: '150px', whiteSpace: 'normal', wordWrap: 'break-word' }}>Title</TableCell>
          <TableCell sx={{ color: 'white', width: '150px', whiteSpace: 'normal', wordWrap: 'break-word' }}>Description</TableCell>
          <TableCell sx={{ color: 'white', width: '150px', padding: '10px' }}>Image</TableCell>
          <TableCell sx={{ color: 'white', width: '120px' }}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {paginatedNoticeCards && paginatedNoticeCards.length > 0 ? (
    paginatedNoticeCards.map((noticecard) => (
      <TableRow
        key={noticecard._id}
        sx={{
          backgroundColor: noticecard.deletedAt ? '#f8d7da' : 'transparent',
          color: noticecard.deletedAt ? '#721c24' : 'inherit',
        }}
      >
        <TableCell sx={{ padding: '10px' }}>
          <Checkbox
            checked={selectedIds.includes(noticecard._id)}
            onChange={() => handleSelectRow(noticecard._id)}
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
            {noticecard.title}
          </TableCell>

  
        <TableCell sx={{ color: 'black', width: '450px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
        {noticecard.description}
        </TableCell>

        <TableCell sx={{ width: '150px', padding: '10px' }}>
                 <a
                   href={noticecard.imageUrl as string}
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
                     src={noticecard.imageUrl as string}
                     alt={noticecard.title || 'Carousel Image'}
                     width="150"
                     height="150"
                     style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                   />
                 </a>
          </TableCell>
        <TableCell sx={{ width: '120px', padding: '10px' }}>
          <Button
            onClick={() => handleOpenEditDialog(noticecard._id)}
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





<div className="noticecards-table-card-container ">
<div className="checkbox-div">
  {/* Select All Checkbox */}
  <button
    onClick={buttonhandleSelectAll}
    className="select-all-button"
  >
    {selectedIds.length === noticecards.length && noticecards.length > 0 ? 'Deselect All' : 'Select All'}
  </button>

  <button
    onClick={buttonhandleSelectAllDeleted}
    className="select-all-deleted-button"
  >
    {selectedIds.length === noticecards.length && noticecards.length > 0 ? 'Deselect All' : 'Select All'}
  </button>
</div>



  {/* Card List */}
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
    {paginatedNoticeCards.map((NoticeCard) => (
      <Card
        key={NoticeCard._id}
        className={`noticecards-table-card ${NoticeCard.deletedAt ? 'deleted' : ''}`}
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
              checked={selectedIds.includes(NoticeCard._id)}
              onChange={() => handleSelectRow(NoticeCard._id)}
              style={{
                padding: '0', // Remove extra padding
                margin: '0',  // Ensure no margin around the checkbox
              }}
            />
            
            {/* Edit Button on the right */}
            <Button
              onClick={() => handleOpenEditDialog(NoticeCard._id)}
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              className="noticecards-table-edit-button"
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
              {NoticeCard.title}
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
              {NoticeCard.description}
            </Typography>
          </div>

          {/* Image Label */}
          <div style={{ marginBottom: '8px' }}>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
              Image:
            </Typography>
            <a
                href={NoticeCard.imageUrl as string}
                target="_blank"
                rel="noopener noreferrer"
                >
            <img
              src={NoticeCard.imageUrl as string}
              alt={NoticeCard.title || 'Carousel Image'}
              className="noticecards-table-card-img"
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
          <Button onClick={handleUpdateNoticeCard} color="primary">
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
              count={filteredNoticeCards.length} // Total number of ratess
              onPageChange={handlePageChange} // Handle page change
              itemsPerPage={itemsPerPage} // Number of items per page
            />
          </Box>
    </div>
  );
};

export default NotiecCardManagement;

