const Policy = require('../models/policyModel');  // Change to use Policy model
const Admin = require('../models/adminModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateAdmin = require('../middleware/authMiddleware');

// Admin Registration
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: "Username, email, and password are required" });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({ username, email, password: hashedPassword });
        await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Server error', error: err.message || err });
    }
};

// Admin Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Server error', error: err.message || err });
    }
};

exports.addPolicyData = [authenticateAdmin, async (req, res) => {
    try {
        const { userName, userSurname, policyId, policyDescription, policyType, startDate, endDate, policyAmount, dob } = req.body;

        // Validate required fields
        if (!userName || !userSurname || !policyId || !policyDescription || !policyType || 
            !startDate || !endDate || !policyAmount || !dob) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create new policy using the Policy model
        const newPolicy = new Policy({
            userName,
            userSurname,
            policyId,
            policyDescription,
            policyType,
            startDate,
            endDate,
            policyAmount,
            dob
        });

        await newPolicy.save();
        res.status(201).json({ message: 'Policy data added successfully' });
    } catch (err) {
        console.error('Error adding policy data:', err);
        res.status(500).json({ message: 'Server error', error: err.message || err });
    }
}];

exports.updatePolicyData = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPolicyData = await Policy.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        if (!updatedPolicyData) {
            return res.status(404).json({ message: 'Policy data not found' });
        }

        res.status(200).json(updatedPolicyData);
    } catch (err) {
        console.error('Error updating policy data:', err);
        res.status(500).json({ message: 'Server error', error: err.message || err });
    }
};

exports.deletePolicyData = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPolicyData = await Policy.findByIdAndDelete(id);

        if (!deletedPolicyData) {
            return res.status(404).json({ message: 'Policy data not found' });
        }

        res.status(200).json({ message: 'Policy data deleted successfully' });
    } catch (err) {
        console.error('Error deleting policy data:', err);
        res.status(500).json({ message: 'Server error', error: err.message || err });
    }
};

exports.getPolicyData = async (req, res) => {
    try {
        const policyData = await Policy.find();
        res.status(200).json(policyData);
    } catch (err) {
        console.error('Error fetching policy data:', err);
        res.status(500).json({ message: 'Server error', error: err.message || err });
    }
};