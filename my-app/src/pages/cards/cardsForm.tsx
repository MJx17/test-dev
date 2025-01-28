import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import useCardStore from '../../store/cardStore'; // Assuming store path
import AddIcon from '@mui/icons-material/Add'
// Type for props


const CardForm: React.FC = () => {
  const { title, description, setTitle, setDescription, CreateNoticeCard } = useCardStore();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  // Handle opening and closing the dialog
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setImagePreview(null);
    setSelectedImage(null);
    setTitle('');
    setDescription('');
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedImage) {
      await CreateNoticeCard(selectedImage);
      handleClose(); // Close the dialog after successful submission
    }
  };

  return (
    <div style={{paddingBottom: '10px',}}>
<Button
  variant="contained"
  color="primary"
  onClick={handleOpen}
  style={{ height: '50px' }}
  startIcon={<AddIcon />} // Adds the icon to the left of the text
>
 Create
</Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Card</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="normal"
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <TextField
              margin="normal"
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <div style={{ marginTop: '16px' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                style={{ display: 'block', marginBottom: '10px' }}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: '100px', marginTop: '10px', borderRadius: '5px' }}
                />
              )}
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Create Card
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default CardForm;
