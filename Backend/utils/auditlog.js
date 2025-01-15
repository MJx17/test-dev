const AuditLogModel = require('../models/auditLog');

// Helper function to create an audit log
const AuditLog = async (action, target, targetId, userId, changes = null, previousValues = null) => {
  try {
    const log = new AuditLogModel({
      action,
      target,
      targetId,
      user: userId,
      changes: changes ? JSON.stringify(changes) : null, // Store updated values as a JSON string
      previousValues: previousValues ? JSON.stringify(previousValues) : null, // Store previous values as a JSON string
      timestamp: new Date(),
    });
    await log.save();
  } catch (error) {
    console.error('Error creating audit log:', error);
  }
};

module.exports = { AuditLog };
