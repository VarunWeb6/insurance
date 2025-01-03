import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('Submitting...');
    
    try {
      const endpoint = isAdmin 
        ? 'http://localhost:5000/api/admin/login'
        : 'http://localhost:5000/api/auth/login';

      const response = await axios.post(endpoint, { email, password });
      
      // Store the token
      localStorage.setItem('token', response.data.token);
      
      setMessage('Login successful!');
      setIsSubmitting(false);
      setEmail('');
      setPassword('');
      
      // Redirect based on user type
      if (isAdmin) {
        navigate('/admin-dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setMessage(err.response ? err.response.data.message : 'Server error');
      setIsSubmitting(false);
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

      <div className="my-[2rem] border rounded border-[#DFDFDF] w-[90%] lg:w-[50%] mx-auto overflow-hidden">
        {message && (
          <div className={`p-4 mb-4 rounded ${message === 'Login successful!' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}
        <div className="text-xl mb-6 bg-[#F7F7F7] p-4 border-b">
          <p className="text-slate-700 font-sans">
            {isAdmin ? 'Admin Login' : 'User Login'}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4 mt-[2rem] lg:mt-[1rem] w-[80%] lg:w-[60%] mx-auto pb-[2rem]">
          <div className="flex justify-end mb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
                className="mr-2"
              />
              Admin Login
            </label>
          </div>
          <div>
            <label className="block mb-2">E-Mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Email"
              required
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
              required
            />
          </div>
          <button
            type="submit"
            className={`px-6 py-2 rounded ${isSubmitting ? 'bg-green-500' : 'bg-blue-500'} text-white w-full lg:w-[8vw]`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;