import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      console.log('Login successful:', response.data.message);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data.message : 'Server error');
    }
  };

  return (
    <div>
      <nav className="flex justify-between p-4">
        <div className="text-gray-700">TempCover</div>
        <div>
          <button onClick={() => navigate('/login')} className="text-gray-700">Login</button>
          <button onClick={() => navigate('/register')} className="text-gray-700 ml-4">Register</button>
        </div>
      </nav>

      <div className="max-w-md mx-auto mt-8 p-6">
        <h2 className="text-xl mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">E-Mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Email"
            />
          </div>
          <div>
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;