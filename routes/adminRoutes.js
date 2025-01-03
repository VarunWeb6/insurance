const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const verifyToken = require('../middleware/authMiddleware');

// Admin routes
router.post('/register', adminController.register);
router.post('/login', adminController.login);

// Policy data routes - Secure the routes with verifyToken middleware
router.post('/add-policy', verifyToken, adminController.addPolicyData);  
router.put('/update-policy/:id', verifyToken, adminController.updatePolicyData);
router.delete('/delete-policy/:id', verifyToken, adminController.deletePolicyData);
router.get('/get-policy', verifyToken, adminController.getPolicyData);

module.exports = router;
