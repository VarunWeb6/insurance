import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('Submitting...');
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { email, password });
      setMessage('Registration successful!');
      setIsSubmitting(false);
      setEmail('');
      setPassword('');
      // Uncomment to redirect after successful registration
      navigate('/login');
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

      <div className="max-w-md mx-auto mt-8 p-6">
        {message && (
          <div className={`p-4 mb-4 rounded ${message === 'Registration successful!' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}
        <h2 className="text-xl mb-6">Register</h2>
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
            className={`px-6 py-2 rounded ${isSubmitting ? 'bg-green-500' : 'bg-blue-500'} text-white`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
