const express = require('express');
const router = express.Router();

const resourceController = require('../controller/resource');

//Get all resources
router.get('/resources', resourceController.getAllResources);

// Create a new resource
router.post('/resource', resourceController.createResource);

// Update a resource
router.put('/:resourceId', resourceController.updateResource);

// Delete a resource
router.delete('/:resourceId', resourceController.deleteResource);

// router.post('/resource', authorize(), createResource); // Creating resource
// router.put('/resource/:resourceId', authorize(), updateResource); // Updating resource
// router.delete('/resource/:resourceId', authorize(), deleteResource); // Deleting resource
// router.get('/resources', authorize(), getAllResources); // Fetching all resources

module.exports = router;
