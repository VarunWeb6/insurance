import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import Header from '../components/Header/Header';
import Logo from '../components/Logo/Logo';
import ValidationForm from '../components/ValidationForm/ValidationForm';

function Home() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogout = () => {
    // Perform logout logic (e.g., clearing tokens, user data, etc.)
    console.log("User logged out");
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <div className="min-h-screen bg-white">
      <Header handleLogout={handleLogout} /> {/* Pass the handleLogout function to the Header component */}
      <main className="max-w-7xl mx-auto p-5">
        <div className="flex justify-between items-start mb-10">
          <Logo />
          <div className="text-right">
            <h1 className="text-4xl font-bold text-[#234397] mb-2">SHORT TERM INSURANCE</h1>
            <p className="text-[#1e3c87] text-sm">We are the UK's largest temporary and short term insurance provider.</p>
          </div>
        </div>
        <ValidationForm />
      </main>
    </div>
  );
}

export default Home;
