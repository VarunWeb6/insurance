import React, { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const ValidationForm = () => {
  const [formData, setFormData] = useState({
    surname: '',
    dateOfBirth: '',
    startDate: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h2 className="text-3xl font-bold mb-2 w-96">USER VALIDATION</h2>
      <p className="text-gray-600 mb-8 max-w-xl">
        FOR SECURITY PURPOSES, BEFORE ACCESSING YOUR POLICY DOCUMENTS, PLEASE CONFIRM THE FOLLOWING INFORMATION.
      </p>
      <div className="flex gap-10">
        <form onSubmit={handleSubmit} className="flex-2">
          <div className="mb-6">
            <label htmlFor="surname" className="block mb-2 text-indigo-800 font-medium">Policyholder Surname</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="dateOfBirth" className="block mb-2 text-indigo-800 font-medium">Policyholder Date Of Birth</label>
            <div className="relative">
              <input
                type="text"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="1/01/1998"
              />
              <FaCalendarAlt className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600" />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="startDate" className="block mb-2 text-indigo-800 font-medium">Start date</label>
            <div className="relative">
              <input
                type="text"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="2/01/2025"
              />
              <FaCalendarAlt className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600" />
            </div>
          </div>
          <button type="submit" className="bg-[#95c11f] text-white py-2 px-4 rounded cursor-pointer font-bold hover:bg-[#86af1b]">
            SUBMIT
          </button>
        </form>
        <div className="flex-1">
          <div className="bg-gray-100 border border-gray-200 p-4 mb-4">
            <p>Your reference: <strong>LY15 BYF</strong></p>
          </div>
          <div className="bg-gray-100 border border-gray-200 p-4 mb-4">
            <p>Policy: <strong>Third party only</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationForm;
