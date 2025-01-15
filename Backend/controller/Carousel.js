const Carousel = require('../models/carousel');  // Assuming your Carousel model is in a separate file
const { uploadFileToR2 } = require('../utils/cloudflare');  // Assuming this is a utility to upload to your cloud storage
const {AuditLog} = require('../utils/auditlog');  // Assuming you have an AuditLog helper

exports.createCarousel = async (req, res) => {
    try {
      const { title, description } = req.body;
      const { file } = req; // Extract the uploaded single file
  
      // Validate the input fields
      if (!title || !description || !file) {
        return res.status(400).json({ error: 'Title, description, and an image are required.' }) ;
      }
  
      console.log('Checking for existing title...');
  
      // Check if a carousel with the same title already exists
      const existingCarousel = await Carousel.findOne({ title });
      if (existingCarousel) {
        return res.status(409).json({ error: 'A carousel with this title already exists. Please choose a different title.' });
      }
  
      console.log('No existing title found. Proceeding with file upload...');
  
      // Upload the image (assuming only one file is uploaded)
      const fileBuffer = file.buffer;
      const fileKey = `Carousel/${Date.now()}-${file.originalname}`;
  
      try {
        console.log(`Uploading file: ${file.originalname}`);
  
        // Upload the file to R2 storage
        const result = await uploadFileToR2(fileBuffer, process.env.R2_BUCKET_NAME, fileKey);
        console.log(`Uploaded ${file.originalname} successfully.`);
  
        // Construct the image URL
        const imageUrl = `${process.env.R2_DEV_URL}/${fileKey}`;
  
        // Create a new carousel entry in the database using the Carousel model
        const newCarousel = new Carousel({
          title,
          description,
          imageUrl, // Store the single image URL
        });
  
        // Save the carousel to the database
        await newCarousel.save();
        console.log('Carousel saved to database.');
  
        // Call the AuditLog helper function
        await AuditLog(
          'create',  // action: 'create'
          'carousel',  // target: 'carousel'
          newCarousel._id,  // targetId: newly created carousel's ID
          req.user._id,  // userId: from the authenticated user
          null  // changes: optional, no changes to log for creation
        );
        console.log('Audit log saved.');
  
        // Respond with the newly created carousel
        res.status(201).json(newCarousel);
      } catch (err) {
        // Error during file upload
        console.error(`Failed to upload ${file.originalname}:`, err);
        return res.status(500).json({ error: `Failed to upload ${file.originalname}: ${err.message}` });
      }
  
    } catch (error) {
      // General error during the function execution
      console.error('Error creating carousel:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };
  



// exports.updateCarousel = async (req, res) => {
//     try {
//       const { id } = req.params; // Get the carousel id from the route params
//       const { title, description } = req.body;  // Get updated title and description from body
//       const { file } = req; // Extract the uploaded file (if any)
    
//       // Validate the input fields (title, description are required, file is optional)
//       if (!title || !description) {
//         return res.status(400).json({ error: 'Title and description are required.' });
//       }
    
//       // Find the carousel entry by ID
//       const carousel = await Carousel.findById(id);
//       if (!carousel) {
//         return res.status(404).json({ error: 'Carousel not found.' });
//       }
    
//       // Prepare an object to store changes for audit logging
//       const changes = {};
//       const previousValues = {
//         title: carousel.title,
//         description: carousel.description,
//         imageUrl: carousel.imageUrl,
//       };
    
//       // Check and store previous and new title
//       if (carousel.title !== title) {
//         changes.title = { previous: carousel.title, new: title };
//       }
    
//       // Check and store previous and new description
//       if (carousel.description !== description) {
//         changes.description = { previous: carousel.description, new: description };
//       }
    
//       // If a new file is provided, upload it and update the image URL
//       if (file) {
//         console.log('Start uploading the new file...');
          
//         const fileBuffer = file.buffer;
//         const fileKey = `Carousel/${Date.now()}-${file.originalname}`;
    
//         try {
//           console.log(`Uploading file: ${file.originalname}`);
    
//           // Upload the file to R2 storage
//           const result = await uploadFileToR2(fileBuffer, process.env.R2_BUCKET_NAME, fileKey);
//           console.log(`Uploaded ${file.originalname} successfully.`);
    
//           // Construct the new image URL
//           const imageUrl = `${process.env.R2_DEV_URL}/${fileKey}`;
    
//           // Check if the image URL has changed and store the change
//           if (carousel.imageUrl !== imageUrl) {
//             changes.imageUrl = { previous: carousel.imageUrl, new: imageUrl };
//           }
    
//           // Update the carousel entry with the new image URL
//           carousel.imageUrl = imageUrl;
//         } catch (err) {
//           console.error(`Failed to upload ${file.originalname}:`, err);
//           return res.status(500).json({ error: `Failed to upload ${file.originalname}: ${err.message}` });
//         }
//       }
    
//       // Update the carousel entry with new title and description
//       carousel.title = title;
//       carousel.description = description;
    
//       // Save the updated carousel entry
//       await carousel.save();
//       console.log('Carousel updated in the database.');
    
//       // If there are changes, log them in the AuditLog
//       if (Object.keys(changes).length > 0) {
//         await AuditLog(
//           'update',  // action: 'update'
//           'carousel',  // target: 'carousel'
//           carousel._id,  // targetId: updated carousel's ID
//           req.user._id,  // userId: from the authenticated user
//           changes  // changes: contains the previous and new values
//         );
//         console.log('Audit log saved.');
//       }
    
//       // Respond with the updated carousel and previous values if any changes were made
//       const response = {
//         newValues: {
//           title: carousel.title,
//           description: carousel.description,
//           imageUrl: carousel.imageUrl,
//         },
//         previousValues,
//       };
  
//       // If no changes, skip the previous values
//       if (Object.keys(changes).length === 0) {
//         return res.status(200).json({ message: 'No changes made.', carousel });
//       }
  
//       res.status(200).json(response);
        
//     } catch (error) {
//       console.error('Error updating carousel:', error);
//       res.status(500).json({ error: 'Internal Server Error', message: error.message });
//     }
//   };
  

exports.updateCarousel = async (req, res) => {
    try {
      const { id } = req.params; 
      const { title, description } = req.body;
      const { file } = req;
  
      // Validate title and description
      if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required.' });
      }
  
      // Find the carousel entry by ID
      const carousel = await Carousel.findById(id);
      if (!carousel) {
        return res.status(404).json({ error: 'Carousel not found.' });
      }
  
      // Prepare changes for audit log
      const changes = {};
      const previousValues = {
        title: carousel.title,
        description: carousel.description,
        imageUrl: carousel.imageUrl,
      };
  
      // Check for title change
      if (carousel.title !== title) {
        changes.title = { previous: carousel.title, new: title };
      }
  
      // Check for description change
      if (carousel.description !== description) {
        changes.description = { previous: carousel.description, new: description };
      }
  
      // Handle file upload (imageUrl)
      if (file) {
        console.log('Start uploading the new file...');
        const fileBuffer = file.buffer;
        const fileKey = `Carousel/${Date.now()}-${file.originalname}`;
  
        try {
          console.log(`Uploading file: ${file.originalname}`);
  
          // Upload file to R2 storage (adjust based on your upload logic)
          const result = await uploadFileToR2(fileBuffer, process.env.R2_BUCKET_NAME, fileKey);
          console.log(`Uploaded ${file.originalname} successfully.`);
  
          const imageUrl = `${process.env.R2_DEV_URL}/${fileKey}`;
  
          // Check if the imageUrl is different from the current one
          if (carousel.imageUrl !== imageUrl) {
            changes.imageUrl = { previous: carousel.imageUrl, new: imageUrl };
          }
  
          carousel.imageUrl = imageUrl; // Update carousel with new image URL
        } catch (err) {
          console.error(`Failed to upload ${file.originalname}:`, err);
          return res.status(500).json({ error: `Failed to upload image: ${err.message}` });
        }
      }
  
      // Update carousel title and description
      carousel.title = title;
      carousel.description = description;
  
      // Save the updated carousel
      await carousel.save();
      console.log('Carousel updated in the database.');
  
      // If there were changes, log them in the AuditLog
      if (Object.keys(changes).length > 0) {
        await AuditLog(
          'update',
          'carousel',
          carousel._id,
          req.user._id,
          changes
        );
        console.log('Audit log saved.');
      }
  
      // Respond with the updated carousel and previous values
      const response = {
        newValues: {
          title: carousel.title,
          description: carousel.description,
          imageUrl: carousel.imageUrl,
        },
        previousValues,
      };
  
      // If no changes were made, return a simple message with carousel data
      if (Object.keys(changes).length === 0) {
        return res.status(200).json({ message: 'No changes made.', carousel });
      }
  
      res.status(200).json(response);
  
    } catch (error) {
      console.error('Error updating carousel:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };
  

exports.restoreCarousel = async (req, res) => {
    try {
      const { id } = req.params;  // Get the carousel id from the route params
  
      // Find the carousel by ID and check if it's soft deleted
      const carousel = await Carousel.findById(id);
      if (!carousel) {
        return res.status(404).json({ error: 'Carousel not found.' });
      }
  
      // Check if the carousel is already restored (not soft deleted)
      if (!carousel.deletedAt) {
        return res.status(400).json({ error: 'Carousel is not deleted.' });
      }
  
      // Restore the carousel by setting `deletedAt` to null
      carousel.deletedAt = null;
  
      // Save the restored carousel
      await carousel.save();
      console.log('Carousel restored.');
  
      // Call the AuditLog function (optional, you can track the restore action)
      await AuditLog(
        'restore',
        'carousel',
        carousel._id,
        req.user._id,
        { deletedAt: carousel.deletedAt }
      );
  
      // Respond with the restored carousel
      res.status(200).json({ message: 'Carousel restored.', carousel });
    } catch (error) {
      console.error('Error restoring carousel:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };
 

  exports.softDeleteCarousel = async (req, res) => {
    try {
      const { id } = req.params;  // Get the carousel id from the route params
  
      // Find the carousel by ID
      const carousel = await Carousel.findById(id);
      if (!carousel) {
        return res.status(404).json({ error: 'Carousel not found.' });
      }
  
      // Check if the carousel is already soft-deleted
      if (carousel.deletedAt !== null) {
        return res.status(400).json({ error: 'Carousel is already soft-deleted.' });
      }
  
      // Mark the carousel as deleted by setting the `deletedAt` field
      carousel.deletedAt = new Date();
  
      // Save the carousel with the new `deletedAt` value
      await carousel.save();
      console.log('Carousel soft deleted.');
  
      // Call the AuditLog function (optional, only if it's a fresh soft delete)
      await AuditLog(
        'soft_delete',
        'carousel',
        carousel._id,
        req.user._id,
        { deletedAt: carousel.deletedAt }
      );
  
      // Respond with the updated carousel
      res.status(200).json({ message: 'Carousel soft deleted.', carousel });
    } catch (error) {
      console.error('Error soft deleting carousel:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };
  
  

exports.hardDeleteCarousel = async (req, res) => {
    try {
      const { id } = req.params;  // Get the carousel id from the route params
  
      // Find and permanently delete the carousel by ID
      const result = await Carousel.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Carousel not found.' });
      }
  
      console.log('Carousel permanently deleted.');
  
      // Call the AuditLog function (optional, you can track the hard delete action)
      await AuditLog(
        'hard_delete',
        'carousel',
        id,
        req.user._id,
        null  // No need to store changes for hard delete
      );
  
      // Respond with a success message
      res.status(200).json({ message: 'Carousel permanently deleted.' });
    } catch (error) {
      console.error('Error hard deleting carousel:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };


  exports.softDeleteAllCarousels = async (req, res) => {
    try {
      // Update all documents that are not already soft-deleted
      const result = await Carousel.updateMany(
        { deletedAt: { $eq: null } }, // Only soft delete documents where `deletedAt` is null
        { $set: { deletedAt: new Date() } } // Set `deletedAt` to the current date
      );
  
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'No active carousels found to soft delete.' });
      }
  
      console.log(`Soft deleted ${result.modifiedCount} carousels.`);
  
      // Log the action
      await AuditLog(
        'soft_delete_all',
        'carousel',
        null,
        req.user._id,
        { softDeletedCount: result.modifiedCount }
      );
  
      // Respond with success message
      res.status(200).json({
        message: 'All carousels soft deleted successfully.',
        softDeletedCount: result.modifiedCount,
      });
    } catch (error) {
      console.error('Error soft deleting all carousels:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };

  
  exports.hardDeleteAllCarousels = async (req, res) => {
    try {
      // Permanently delete all documents in the Carousel collection
      const result = await Carousel.deleteMany({});
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'No carousels found to delete.' });
      }
  
      console.log(`Permanently deleted ${result.deletedCount} carousels.`);
  
      // Log the action
      await AuditLog(
        'hard_delete_all',
        'carousel',
        null,
        req.user._id,
        { hardDeletedCount: result.deletedCount }
      );
  
      // Respond with success message
      res.status(200).json({
        message: 'All carousels permanently deleted successfully.',
        hardDeletedCount: result.deletedCount,
      });
    } catch (error) {
      console.error('Error hard deleting all carousels:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };
  
  

 exports.getCarousels = async (req, res) => {
    try {
      // Get all carousels, but exclude those that are soft deleted
      const carousels = await Carousel.find({ deletedAt: null });
      res.status(200).json(carousels);
    } catch (error) {
      console.error('Error fetching carousels:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };

  exports.getAllCarousels = async (req, res) => {
    try {
      // Get all carousels (including soft deleted ones)
      const carousels = await Carousel.find();
      res.status(200).json(carousels);
    } catch (error) {
      console.error('Error fetching carousels:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };
  

  exports.getSoftDeletedCarouselById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the carousel by ID where deletedAt is not null (soft-deleted)
      const carousel = await Carousel.findOne({ _id: id, deletedAt: { $ne: null } });
  
      if (!carousel) {
        return res.status(404).json({ error: 'Soft deleted carousel not found.' });
      }
  
      // Respond with the found carousel
      res.status(200).json(carousel);
    } catch (error) {
      console.error('Error fetching soft deleted carousel by ID:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };
  


  exports.getActiveCarouselById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the carousel by ID where deletedAt is null (not deleted)
      const carousel = await Carousel.findOne({ _id: id, deletedAt: null });
  
      if (!carousel) {
        return res.status(404).json({ error: 'Active carousel not found or has been deleted.' });
      }
  
      // Respond with the found carousel
      res.status(200).json(carousel);
    } catch (error) {
      console.error('Error fetching active carousel by ID:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  };
  