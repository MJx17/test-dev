// routes/slideshowRoutes.js
const express = require('express');
const multer = require('multer');
const Carousel = require('../controller/Carousel')
const { authenticateJWT } = require('../middleware/checkPermission');
const router = express.Router();

// Set up multer with memory storage and a file size limit of 50MB
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50MB
});

// router.post('/create-carousel', authenticateJWT(['superadmin']), upload.single('imageUrl'), Carousel.createCarousel);
// router.put('/carousel/:id',authenticateJWT(['superadmin']), upload.single('imageUrl'),  Carousel.updateCarousel);
// router.delete('/carousel/HardDel/:id', authenticateJWT(['superadmin']), Carousel.hardDeleteCarousel);
// router.delete('/carousel/delete/:id', authenticateJWT(['superadmin']), Carousel.softDeleteCarousel);
// router.put('/carousel/restore/:id', authenticateJWT(['superadmin']), Carousel.restoreCarousel);
// router.get('/carousels',  Carousel.getCarousels);
// router.get('/carousel/deleted', Carousel.getAllCarousels);
// router.get('/carousel/soft-deleted/:id',Carousel.getSoftDeletedCarouselById);  // Get soft-deleted carousel by ID
// router.get('/carousel/active/:id',  Carousel.getActiveCarouselById);  // Get active (non-deleted) carousel by ID
// router.delete('/carousels/soft-delete-all', Carousel.softDeleteAllCarousels);
// router.delete('/carousels/hard-delete-all',Carousel.hardDeleteAllCarousels);


router.post('/create-carousel',  upload.single('imageUrl'), Carousel.createCarousel);
router.put('/carousel/:id', upload.single('imageUrl'),  Carousel.updateCarousel);
router.delete('/carousel/HardDel/:id',  Carousel.hardDeleteCarousel);
router.delete('/carousel/delete/:id',  Carousel.softDeleteCarousel);
router.put('/carousel/restore/:id',  Carousel.restoreCarousel);
router.get('/carousels',  Carousel.getCarousels);
router.get('/carousel/deleted', Carousel.getAllCarousels);
router.get('/carousel/soft-deleted/:id',Carousel.getSoftDeletedCarouselById);  // Get soft-deleted carousel by ID
router.get('/carousel/active/:id',  Carousel.getActiveCarouselById);  // Get active (non-deleted) carousel by ID
router.delete('/carousels/soft-delete-all', Carousel.softDeleteAllCarousels);
router.delete('/carousels/hard-delete-all',Carousel.hardDeleteAllCarousels);




// Create with multiple image slideshow
// router.post('/create-slideshow', authenticateJWT(['superadmin']), upload.array('images'), slideshowController.createSlideshow);

// router.post('/create-slideshow', authenticateJWT(['superadmin']),  upload.single('singleImage'), upload.array('images', 10),  slideshowController.createSlideshow);
// router.post('/single-slideshow', authenticateJWT(['superadmin']), upload.single('image'), slideshowController.createSingleImageSlideshow);

// Get all slideshows (excluding soft-deleted ones)
// router.get('/slideshows', slideshowController.getAllSlideshows);

// // Get a specific slideshow (including soft-deleted ones)
// router.get('/slideshows/:id', slideshowController.getSlideshowById);

// // Update a slideshow
// // router.put('/slideshows/:id', authenticateJWT(['superadmin']), slideshowController.updateSlideshow);
// router.put('/slideshow/:id',authenticateJWT(['superadmin']), upload.array('images', 10),  slideshowController.updateSlideshow);
// router.put('/single-slideshows/:id', authenticateJWT(['superadmin']), upload.array('images', 10), slideshowController.updateSingleImageSlideshow);

// // Soft delete a slideshow
// router.delete('/slideshows/soft/:id', authenticateJWT(['superadmin']), slideshowController.softDeleteSlideshow);

// // Restore a soft-deleted slideshow
// router.put('/slideshows/restore/:id', authenticateJWT(['superadmin']), slideshowController.restoreSlideshow);

// // Permanently delete a slideshow (hard delete)
// router.delete('/slideshows/:id', authenticateJWT(['superadmin']), slideshowController.deleteSlideshow);



module.exports = router;
