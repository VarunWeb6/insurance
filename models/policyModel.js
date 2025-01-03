const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    userSurname: {
        type: String,
        required: true,
    },
    policyId: {
        type: String,
        required: true,
        unique: true, // Ensure policy ID is unique
    },
    policyDescription: {
        type: String,
        required: true,
    },
    policyType: {
        type: String, // E.g., Health, Life, Car
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    policyAmount: {
        type: Number,
        required: true,
    },
    dob: {
        type: Date,
        required: true, // Assuming DOB is a required field
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Policy', policySchema);
