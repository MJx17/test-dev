const NoticeCard = require('../models/NoticeCard');  // Assuming your NoticeCard model is in a separate file
const { uploadFileToR2 } = require('../utils/cloudflare');  // Assuming this is a utility to upload to your cloud storage
const {AuditLog} = require('../utils/auditlog');  // Assuming you have an AuditLog helper

exports.createNoticeCard = async (req, res) => {
    try {
      const { title, description } = req.body;
      const { file } = req; // Extract the uploaded single file
  
      // Validate the input fields
      if (!title || !description || !file) {
        return res.status(400).json({ error: 'Title, description, and an image are required.' }) ;
      }
  
      console.log('Checking for existing title...');
  
      // Check if a NoticeCard with the same title already exists
      const existingNoticeCard = await NoticeCard.findOne({ title });
      if (existingNoticeCard) {
        return res.status(409).json({ error: 'A NoticeCard with this title already exists. Please choose a different title.' });
      }
  
      console.log('No existing title found. Proceeding with file upload...');
  
      // Upload the image (assuming only one file is uploaded)
      const fileBuffer = file.buffer;
      const fileKey = `NoticeCard/${Date.now()}-${file.originalname}`;
  
      try {
        console.log(`Uploading file: ${file.originalname}`);
  
        // Upload the file to R2 storage
        const result = await uploadFileToR2(fileBuffer, process.env.R2_BUCKET_NAME, fileKey);
        console.log(`Uploaded ${file.originalname} successfully.`);
  
        // Construct the image URL
        const imageUrl = `${process.env.R2_DEV_URL}/${fileKey}`;
  
        // Create a new NoticeCard entry in the database using the NoticeCard model
        const noticeCard = new NoticeCard({
          title,
          description,
          imageUrl, // Store the single image URL
        });
  
        // Save the NoticeCard to the database
        await noticeCard.save();
        console.log('NoticeCard saved to database.');
  
        // Call the AuditLog helper function
        await AuditLog(
          'create',  // action: 'create'
          'NoticeCard',  // target: 'NoticeCard'
          noticeCard._id,  // targetId: newly created NoticeCard's ID
          req.user._id,  // userId: from the authenticated user
          null  // changes: optional, no changes to log for creation
        );
        console.log('Audit log saved.');
  
        // Respond with the newly created NoticeCard
        res.status(201).json(noticeCard);
      } catch (err) {
        // Error during file upload
        console.error(`Failed to upload ${file.originalname}:`, err);
        return res.status(500).json({ error: `Failed to upload ${file.originalname}: ${err.message}` });
      }
  
    } catch (error) {
      // General error during the function execution
      console.error('Error creating NoticeCard:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };
  




exports.updateNoticeCard = async (req, res) => {
    try {
      const { id } = req.params; 
      const { title, description } = req.body;
      const { file } = req;
  
      // Validate title and description
      if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required.' });
      }
  
      // Find the NoticeCard entry by ID
      const existingNoticeCard = await NoticeCard.findById(id);
      if (!existingNoticeCard) {
        return res.status(404).json({ error: 'NoticeCard not found.' });
      }
  
      // Prepare changes for audit log
      const changes = {};
      const previousValues = {
        title: existingNoticeCard.title,
        description: existingNoticeCard.description,
        imageUrl: existingNoticeCard.imageUrl,
      };
  
      // Check for title change
      if (existingNoticeCard.title !== title) {
        changes.title = { previous: existingNoticeCard.title, new: title };
      }
  
      // Check for description change
      if (existingNoticeCard.description !== description) {
        changes.description = { previous: existingNoticeCard.description, new: description };
      }
  
      // Handle file upload (imageUrl)
      if (file) {
        console.log('Start uploading the new file...');
        const fileBuffer = file.buffer;
        const fileKey = `NoticeCard/${Date.now()}-${file.originalname}`;
  
        try {
          console.log(`Uploading file: ${file.originalname}`);
  
          // Upload file to R2 storage (adjust based on your upload logic)
          const result = await uploadFileToR2(fileBuffer, process.env.R2_BUCKET_NAME, fileKey);
          console.log(`Uploaded ${file.originalname} successfully.`);
  
          const imageUrl = `${process.env.R2_DEV_URL}/${fileKey}`;
  
          // Check if the imageUrl is different from the current one
          if (existingNoticeCard.imageUrl !== imageUrl) {
            changes.imageUrl = { previous: existingNoticeCard.imageUrl, new: imageUrl };
          }
  
          existingNoticeCard.imageUrl = imageUrl; // Update NoticeCard with new image URL
        } catch (err) {
          console.error(`Failed to upload ${file.originalname}:`, err);
          return res.status(500).json({ error: `Failed to upload image: ${err.message}` });
        }
      }
  
      // Update NoticeCard title and description
      existingNoticeCard.title = title;
      existingNoticeCard.description = description;
  
      // Save the updated NoticeCard
      await existingNoticeCard.save();
      console.log('NoticeCard updated in the database.');
  
      // If there were changes, log them in the AuditLog
      if (Object.keys(changes).length > 0) {
        await AuditLog(
          'update',
          'NoticeCard',
          existingNoticeCard._id,
          req.user._id,
          changes
        );
        console.log('Audit log saved.');
      }
  
      // Respond with the updated NoticeCard and previous values
      const response = {
        newValues: {
          title: existingNoticeCard.title,
          description: existingNoticeCard.description,
          imageUrl: existingNoticeCard.imageUrl,
        },
        previousValues,
      };
  
      // If no changes were made, return a simple message with NoticeCard data
      if (Object.keys(changes).length === 0) {
        return res.status(200).json({ message: 'No changes made.', NoticeCard });
      }
  
      res.status(200).json(response);
  
    } catch (error) {
      console.error('Error updating NoticeCard:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };
  

exports.restoreNoticeCard = async (req, res) => {
    try {
      const { id } = req.params;  // Get the NoticeCard id from the route params
  
      // Find the NoticeCard by ID and check if it's soft deleted
      const existingNoticeCard = await NoticeCard.findById(id);
      if (!existingNoticeCard) {
        return res.status(404).json({ error: 'NoticeCard not found.' });
      }
  
      // Check if the NoticeCard is already restored (not soft deleted)
      if (!existingNoticeCard.deletedAt) {
        return res.status(400).json({ error: 'NoticeCard is not deleted.' });
      }
  
      // Restore the NoticeCard by setting `deletedAt` to null
      existingNoticeCard.deletedAt = null;
  
      // Save the restored NoticeCard
      await existingNoticeCard.save();
      console.log('NoticeCard restored.');
  
      // Call the AuditLog function (optional, you can track the restore action)
      await AuditLog(
        'restore',
        'NoticeCard',
        existingNoticeCard._id,
        req.user._id,
        { deletedAt: existingNoticeCard.deletedAt }
      );
  
      // Respond with the restored NoticeCard
      res.status(200).json({ message: 'NoticeCard restored.', existingNoticeCard });
    } catch (error) {
      console.error('Error restoring NoticeCard:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };
 

  exports.softDeleteNoticeCard = async (req, res) => {
    try {
      const { id } = req.params;  // Get the NoticeCard id from the route params
  
      // Find the NoticeCard by ID
      const existingNoticeCard = await NoticeCard.findById(id);
      if (!existingNoticeCard) {
        return res.status(404).json({ error: 'NoticeCard not found.' });
      }
  
      // Check if the NoticeCard is already soft-deleted
      if (existingNoticeCard.deletedAt !== null) {
        return res.status(400).json({ error: 'NoticeCard is already soft-deleted.' });
      }
  
      // Mark the NoticeCard as deleted by setting the `deletedAt` field
      existingNoticeCard.deletedAt = new Date();
  
      // Save the NoticeCard with the new `deletedAt` value
      await existingNoticeCard.save();
      console.log('NoticeCard soft deleted.');
  
      // Call the AuditLog function (optional, only if it's a fresh soft delete)
      await AuditLog(
        'soft_delete',
        'NoticeCard',
        existingNoticeCard._id,
        req.user._id,
        { deletedAt: existingNoticeCard.deletedAt }
      );
  
      // Respond with the updated NoticeCard
      res.status(200).json({ message: 'NoticeCard soft deleted.', existingNoticeCard });
    } catch (error) {
      console.error('Error soft deleting NoticeCard:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };
  
  

exports.hardDeleteNoticeCard = async (req, res) => {
    try {
      const { id } = req.params;  // Get the NoticeCard id from the route params
  
      // Find and permanently delete the NoticeCard by ID
      const result = await NoticeCard.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'NoticeCard not found.' });
      }
  
      console.log('NoticeCard permanently deleted.');
  
      // Call the AuditLog function (optional, you can track the hard delete action)
      await AuditLog(
        'hard_delete',
        'NoticeCard',
        id,
        req.user._id,
        null  // No need to store changes for hard delete
      );
  
      // Respond with a success message
      res.status(200).json({ message: 'NoticeCard permanently deleted.' });
    } catch (error) {
      console.error('Error hard deleting NoticeCard:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };


  exports.softDeleteAllNoticeCards = async (req, res) => {
    try {
      // Update all documents that are not already soft-deleted
      const result = await NoticeCard.updateMany(
        { deletedAt: { $eq: null } }, // Only soft delete documents where `deletedAt` is null
        { $set: { deletedAt: new Date() } } // Set `deletedAt` to the current date
      );
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'No active NoticeCards found to soft delete.' });
      }
  
      console.log(`Soft deleted ${result.modifiedCount} NoticeCards.`);
  
      // Log the action
      await AuditLog(
        'soft_delete_all',
        'NoticeCard',
        null,
        req.user._id,
        { softDeletedCount: result.modifiedCount }
      );
  
      // Respond with success message
      res.status(200).json({
        message: 'All NoticeCards soft deleted successfully.',
        softDeletedCount: result.modifiedCount,
      });
    } catch (error) {
      console.error('Error soft deleting all NoticeCards:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };

  
  exports.hardDeleteAllNoticeCards = async (req, res) => {
    try {
      // Permanently delete all documents in the NoticeCard collection
      const result = await NoticeCard.deleteMany({});
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'No NoticeCards found to delete.' });
      }
  
      console.log(`Permanently deleted ${result.deletedCount} NoticeCards.`);
  
      // Log the action
      await AuditLog(
        'hard_delete_all',
        'NoticeCard',
        null,
        req.user._id,
        { hardDeletedCount: result.deletedCount }
      );
  
      // Respond with success message
      res.status(200).json({
        message: 'All NoticeCards permanently deleted successfully.',
        hardDeletedCount: result.deletedCount,
      });
    } catch (error) {
      console.error('Error hard deleting all NoticeCards:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };
  
  

 exports.getNoticeCards = async (req, res) => {
    try {
      // Get all NoticeCards, but exclude those that are soft deleted
      const NoticeCards = await NoticeCard.find({ deletedAt: null });
      res.status(200).json(NoticeCards);
    } catch (error) {
      console.error('Error fetching NoticeCards:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  }; 

  exports.getAllNoticeCards = async (req, res) => {
    try {
      // Get all NoticeCards (including soft deleted ones)
      const NoticeCards = await NoticeCard.find();
      res.status(200).json(NoticeCards);
    } catch (error) {
      console.error('Error fetching NoticeCards:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };
  

  exports.getSoftDeletedNoticeCardById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the NoticeCard by ID where deletedAt is not null (soft-deleted)
      const deletedNoticeCard = await NoticeCard.findOne({ _id: id, deletedAt: { $ne: null } });
  
      if (!deletedNoticeCard) {
        return res.status(404).json({ error: 'Soft deleted NoticeCard not found.' });
      }
  
      // Respond with the found NoticeCard
      res.status(200).json(deletedNoticeCard);
    } catch (error) {
      console.error('Error fetching soft deleted NoticeCard by ID:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };
  


  exports.getActiveNoticeCardById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the NoticeCard by ID where deletedAt is null (not deleted)
      const activeNoticeCard = await NoticeCard.findOne({ _id: id, deletedAt: null });
  
      if (!activeNoticeCard) {
        return res
          .status(404)
          .json({ error: 'Active NoticeCard not found or has been deleted.' });
      }
  
      // Respond with the found NoticeCard
      res.status(200).json(activeNoticeCard);
    } catch (error) {
      console.error('Error fetching active NoticeCard by ID:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };