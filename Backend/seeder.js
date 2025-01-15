// // seed.js
// require('dotenv').config(); // To load .env variables
// const mongoose = require('mongoose');
// const Role = require('./models/roles');
// const Permission = require('./models/permissions');

// // Define permissions
// const permissions = [
//   { name: 'createPost', description: 'Ability to create a post' },
//   { name: 'editPost', description: 'Ability to edit a post' },
//   { name: 'deletePost', description: 'Ability to delete a post' },
//   { name: 'viewPost', description: 'Ability to view a post' },
// ];

// // Define roles
// const roles = [
//   { name: 'SuperAdmin', permissions: ['createPost', 'editPost', 'deletePost', 'viewPost'] },
//   { name: 'Admin', permissions: ['createPost', 'editPost', 'viewPost'] },
//   { name: 'User', permissions: ['viewPost'] },
// ];

// // Connect to MongoDB
// const mongoURI = process.env.MONGO_URI;

// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(async () => {
//   console.log('Connected to MongoDB');

//   // Seed Permissions - Only insert if they don't already exist
//   for (const perm of permissions) {
//     const existingPerm = await Permission.findOne({ name: perm.name });
//     if (!existingPerm) {
//       await Permission.create(perm);
//       console.log(`Permission ${perm.name} created.`);
//     } else {
//       console.log(`Permission ${perm.name} already exists.`);
//     }
//   }

//   // Seed Roles - Only insert if they don't already exist
//   for (const role of roles) {
//     const existingRole = await Role.findOne({ name: role.name });
//     if (!existingRole) {
//       const permissionDocs = await Permission.find({ name: { $in: role.permissions } });
//       const permissionIds = permissionDocs.map((perm) => perm._id);
//       await Role.create({ name: role.name, permissions: permissionIds });
//       console.log(`Role ${role.name} created.`);
//     } else {
//       console.log(`Role ${role.name} already exists.`);
//     }
//   }

//   console.log('Seeding completed.');
//   process.exit();
// }).catch((error) => {
//   console.error('Error connecting to the database:', error);
//   process.exit(1);
// });


const mongoose = require('mongoose');
const Slideshow = require('./models/Slides');
const AuditLog = require('./models/auditLog');

async function migrateSlideshowAuditLogs() {
  try {
    // Fetch all Slideshow documents that do not have an audit log reference yet
    const slideshows = await Slideshow.find({ auditLogs: { $exists: false } });

    for (let slideshow of slideshows) {
      // Find the audit logs related to this slideshow (you might need to define how this is related)
      const auditLogs = await AuditLog.find({ targetId: slideshow._id });

      // Update the slideshow with the found audit logs
      slideshow.auditLogs = auditLogs.map(log => log._id);

      await slideshow.save();
      console.log(`Updated slideshow with ID: ${slideshow._id}`);
    }

    console.log('Migration completed!');
  } catch (error) {
    console.error('Error migrating audit logs:', error);
  }
}

// Run the migration
migrateSlideshowAuditLogs();
