import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [policies, setPolicies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    userName: '',
    userSurname: '',
    policyId: '',
    policyDescription: '',
    policyType: '',
    startDate: '',
    endDate: '',
    policyAmount: '',
    dob: ''
  });

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchPolicies();
  }, [token, navigate]);

  const fetchPolicies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/get-policy', {
        headers: { Authorization: token }
      });
      setPolicies(response.data);
    } catch (error) {
      setError(error.response?.data?.message || 'Error fetching policies');
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (editingPolicy) {
        await axios.put(
          `http://localhost:5000/api/admin/update-policy/${editingPolicy._id}`,
          formData,
          { headers: { Authorization: token } }
        );
      } else {
        await axios.post(
          'http://localhost:5000/api/admin/add-policy',
          formData,
          { headers: { Authorization: token } }
        );
      }
      fetchPolicies();
      setShowForm(false);
      setEditingPolicy(null);
      setFormData({
        userName: '',
        userSurname: '',
        policyId: '',
        policyDescription: '',
        policyType: '',
        startDate: '',
        endDate: '',
        policyAmount: '',
        dob: ''
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Error saving policy');
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const handleEdit = (policy) => {
    setEditingPolicy(policy);
    setFormData({
      userName: policy.userName,
      userSurname: policy.userSurname,
      policyId: policy.policyId,
      policyDescription: policy.policyDescription,
      policyType: policy.policyType,
      startDate: new Date(policy.startDate).toISOString().split('T')[0],
      endDate: new Date(policy.endDate).toISOString().split('T')[0],
      policyAmount: policy.policyAmount,
      dob: policy.dob ? new Date(policy.dob).toISOString().split('T')[0] : ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this policy?')) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/delete-policy/${id}`, {
          headers: { Authorization: token }
        });
        fetchPolicies();
      } catch (error) {
        setError(error.response?.data?.message || 'Error deleting policy');
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };


  return (
    <div className="p-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button onClick={() => navigate('/')} className='text-xl font-regular'> Home</button>
        <div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingPolicy(null);
              setFormData({
                userName: '',
                userSurname: '',
                policyId: '',
                policyDescription: '',
                policyType: '',
                startDate: '',
                endDate: '',
                policyAmount: '',
                dob: ''
              });
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Add New Policy
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingPolicy ? 'Edit Policy' : 'Add New Policy'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">User Name</label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">User Surname</label>
                <input
                  type="text"
                  name="userSurname"
                  value={formData.userSurname}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Policy ID</label>
                <input
                  type="text"
                  name="policyId"
                  value={formData.policyId}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Policy Type</label>
                <select
                  name="policyType"
                  value={formData.policyType}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Health">Health</option>
                  <option value="Life">Life</option>
                  <option value="Car">Car</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block mb-1">Policy Description</label>
                <textarea
                  name="policyDescription"
                  value={formData.policyDescription}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Policy Amount</label>
                <input
                  type="number"
                  name="policyAmount"
                  value={formData.policyAmount}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingPolicy(null);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {editingPolicy ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Policy ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Start Date</th>
              <th className="border p-2">End Date</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy._id}>
                <td className="border p-2">{policy.policyId}</td>
                <td className="border p-2">{`${policy.userName} ${policy.userSurname}`}</td>
                <td className="border p-2">{policy.policyType}</td>
                <td className="border p-2">${policy.policyAmount}</td>
                <td className="border p-2">{new Date(policy.startDate).toLocaleDateString()}</td>
                <td className="border p-2">{new Date(policy.endDate).toLocaleDateString()}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(policy)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(policy._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;