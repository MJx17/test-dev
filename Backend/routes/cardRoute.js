// routes/slideshowRoutes.js
const express = require('express');
const multer = require('multer');
const Card = require('../controller/cardController')
const { authenticateJWT } = require('../middleware/checkPermission');
const router = express.Router();

// Set up multer with memory storage and a file size limit of 50MB
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limit file size to 50MB
});

router.post('/create-card',  upload.single('imageUrl'), Card.createNoticeCard);
router.put('/card/:id', upload.single('imageUrl'),  Card.updateNoticeCard);
router.delete('/card/HardDel/:id',  Card.hardDeleteNoticeCard);
router.delete('/card/delete/:id',  Card.softDeleteNoticeCard);
router.put('/card/restore/:id',  Card.restoreNoticeCard);
router.get('/cards',  Card.getNoticeCards);
router.get('/card/deleted', Card.getAllNoticeCards);
router.get('/card/soft-deleted/:id',Card.getSoftDeletedNoticeCardById);  // Get soft-deleted Card by ID
router.get('/card/active/:id',  Card.getActiveNoticeCardById);  // Get active (non-deleted) Card by ID
router.delete('/cards/soft-delete-all', Card.softDeleteAllNoticeCards);
router.delete('/cards/hard-delete-all',Card.hardDeleteAllNoticeCards);


// router.post('/create-card', authenticateJWT(['superadmin']), upload.single('imageUrl'), Card.createNoticeCard);
// router.put('/card/:id',authenticateJWT(['superadmin']), upload.single('imageUrl'),  Card.updateNoticeCard);
// router.delete('/card/HardDel/:id', authenticateJWT(['superadmin']), Card.hardDeleteNoticeCard);
// router.delete('/card/delete/:id', authenticateJWT(['superadmin']), Card.softDeleteNoticeCard);
// router.put('/card/restore/:id', authenticateJWT(['superadmin']), Card.restoreNoticeCard);
// router.get('/cards',  Card.getNoticeCards);
// router.get('/card/deleted', Card.getAllNoticeCards);
// router.get('/card/soft-deleted/:id',Card.getSoftDeletedNoticeCardById);  // Get soft-deleted Card by ID
// router.get('/card/active/:id',  Card.getActiveNoticeCardById);  // Get active (non-deleted) Card by ID
// router.delete('/cards/soft-delete-all', Card.softDeleteAllNoticeCards);
// router.delete('/cards/hard-delete-all',Card.hardDeleteAllNoticeCards);

module.exports = router;
